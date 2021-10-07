const moreResults = (modelName, ...populateFields) => async (req, res, next) => {
    let currentQuery;

    // Copia de req.query
    const reqQuery = { ...req.query };

    //Fields para excluir da consulta
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(p => delete reqQuery[p]);

    // Cria uma query string
    let queryStr = JSON.stringify(reqQuery);

    // Cria operators($gt, $gte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Encontre o recurso no banco de dados
    currentQuery = modelName.find(JSON.parse(queryStr));

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        currentQuery = currentQuery.select(fields);
    }

    // ordenar
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        currentQuery = currentQuery.sort(sortBy);
    } else {
        currentQuery = currentQuery.sort('title');
    }

    // paginação
    const page = parseInt(req.query.page, 10) || 1;
    const limitPerPage = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limitPerPage; // 0, 10, 20, 30 ...
    const endIndex = page * limitPerPage; // 10, 20, 30, 40 ...
    const total = await modelName.countDocuments();


    currentQuery = currentQuery.skip(startIndex).limit(limitPerPage);


    // populate
    if (populateFields) {
        populateFields
            .map(p => currentQuery = currentQuery.populate(p));
    }


    // Execute Query    
    const result = await currentQuery;


    // Resultado da Paginação
    const paginationResults = {};

    if (endIndex < total) {
        paginationResults.next = {
            page: page + 1,
            limit: limitPerPage
        };
    }

    if (startIndex > 0) {
        paginationResults.prev = {
            page: page - 1,
            limit: limitPerPage
        }
    }


    res.moreResults = {
        success: true,
        count: result.length,
        paginationResults,
        data: result
    };
    next();

};


module.exports = moreResults;
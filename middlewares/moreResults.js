const moreResults = (modelName, ...populateFields) => async (req, res, next) => {
    let currentQuery;

    // Copia de req.query
    const reqQuery = { ...req.query };

    //Fields para ecluir da consulta
    const removeFields = ['select', 'sort', 'page', 'limit', 'price'];
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


    const result = await currentQuery;



    res.moreResults = {
        success: true,
        count: result.length,
        message: 'Working',
        data: result
    };
    next();

};


module.exports = moreResults;
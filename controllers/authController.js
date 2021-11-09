const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        let u = await User.findOne({ email: req.body.email });
        if (!u) {
            let user = await User.create(req.body);
            if (user) {
                res.status(200).send({
                    success: true,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        _id: user._id
                    }
                });
            }
        }
        else {
            res.status(403).send({
                message: 'Email já registrado'
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: "Erro interno do servidor",
            error: err
        });
    }
}

exports.login = (req, res) => {
    // let user = await User.findOne({ email: req.body.email });
    // const auth_err = (req.body.password == '' || req.body.password == null || !user);
    const auth_err = (req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null);

    if (!auth_err) {
        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err)
                return res.status(500).send({ message: 'Erro interno do servidor' })
            else if (!user)
                return res.status(404).send({ message: 'Email não encontrado' });
            else
                user.comparePassword(req.body.password, (matchErr, isMatch) => {
                    if (isMatch) {
                        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
                            { expiresIn: process.env.JWT_EXPIRE });
                        res.send({ first_name: user.first_name, token: token });
                    }
                    else
                        return res.status(401).send({ message: 'Senha inválido' });
                });
        });

    }
    else
        res.status(404).send({ message: 'Email ou senha inválido' });
}

exports.check_token = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'Token não encontrado' })
    }
    jwt.verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
            if (err || !decoded) {
                return res.status(401).send({ message: 'Token inválido. Erro de autenticação' })
            }
            next();
        });
}

exports.user_data = async (req, res) => {
    try {
        const token = req.get('Authorization');
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            const id = decoded.id;
            const user = await User.findById(id).lean();

            if (!user) {
                res.status(500).send({ message: 'Erro ao tentar obter dados do usuário' });
            }
            let token = jwt.sign({ id: user._id },
                process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
            delete user.password;
            res.send({ ...user, token });
        });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno do servidor', error: error });
    }
}
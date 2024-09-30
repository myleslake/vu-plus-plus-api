const getUsers = (req, res) => {
    res.send('Hello From Users Controller!');
};

const createUser = (req, res) => {
    articleRepository.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(500).send(error));
};

export default {
    getUsers,
    createUser
};


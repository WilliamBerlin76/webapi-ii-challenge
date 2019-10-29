const router = require('express').Router();

const Posts = require('./db');

router.get('/', (req, res) => {

    const query = req.query;

    Posts.find(query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving the posts',
            });
        });
});

module.exports = router;
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

router.post('/', (req, res) => {
    const thing = req.body;
    Posts.insert(thing)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error creating new post'
            })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the post by id'
            })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
        .then(posts => {
            res.status(200).json({message: `post with the id ${id} was deleted`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error deleting the post by id'
            })
        })
})

module.exports = router;
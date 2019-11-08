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
    if( !thing.title || !thing.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
    Posts.insert(thing)
        .then(posts => {
            res.status(201).json(thing)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(posts => {
            posts.length === 0 ? res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(posts => {
            posts.length === 0 ? res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            Posts.remove(id)
                .then(posts => {
                    res.status(203).json({message: `post with the id ${id} was deleted`})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: "The post could not be removed"
                    })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Posts.findById(id)
        .then(posts => {
            if (posts.length === 0 ){
                return res.status(404).json({ message: "The post with the specified ID does not exist." }) 
            } else if (!body.title || !body.contents){
                return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else {
            Posts.update(id, body)
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: `Error updating the post by id ${id}`})
            })
            }
        })
   
});

///////////////////////////////////////////////////Requests involving comments below////////////////////////////////////////////////////

router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    Posts.findById(postId)
        .then(posts => {
            posts.length === 0 ? res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            Posts.findPostComments(postId)
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: "The comments information could not be retrieved."})
            })
        })
        .catch(err => {
            console.log(err)
            res.statusMessage(500).json({ error: "The comments information could not be retrieved." })
        })
});

router.post('/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comment = req.body;
    if (!comment.text){
        return res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    Posts.insertComment(comment)
        .then(comments => {
            !comments ? res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            res.status(201).json(comments)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})

module.exports = router;
const express = require('express');

const server = express();

const postsRouter = require('./data/postRouter');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to the API</h1>
    `);
});

server.use('/api/posts', postsRouter);

server.listen(7000, () => {
    console.log('\n === Server Running on http://localhost:7000 ===\n')
})
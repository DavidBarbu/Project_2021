const express = require("express");
const bodyParser = require("body-parser");

const handleGreeting = require('./controlers/greeting');
const { port } = require('./config/express');
const authorizationMiddleware = require('./middlewares/authorization');
const loginHandler = require("./controlers/login");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("./controlers/users");
const { getAllPosts, getPostById, createPost, updatePost, deletePost, addTagToPost} = require("./controlers/posts");
const app = express();
app.use(bodyParser.json());

app.post("/login", loginHandler);

app.get("/hello", authorizationMiddleware, handleGreeting);

app.get("/hello/:name?", authorizationMiddleware, handleGreeting);

app.get('/users', getAllUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/user/:id", deleteUser);

app.post("/users/:id/posts", createPost);

app.get('/posts', getAllPosts);
app.get("/posts/:id", getPostById);

app.post("/posts/:postId/tags/:tagId", addTagToPost);

app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost);

app.listen(port, () => {
    console.log("A pornit serveru' la ", port);
});
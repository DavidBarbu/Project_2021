const express = require("express");
const bodyParser = require("body-parser");

const { port } = require('./config/express');

const authorizationMiddleware = require('./middlewares/authorization');

const { graphqlHTTP} = require('express-graphql');

const schema = require('./graphql');

const app = express();

app.use('/graphql', authorizationMiddleware,graphqlHTTP({
    schema,
}));

app.listen(port, () => {
    console.log("A pornit serveru' la ", port);
});
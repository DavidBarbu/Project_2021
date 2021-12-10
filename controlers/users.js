const db = require("../models");


module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.User.findAll();
        res.send(allUsers);
    } catch (error) {
        console.error("smth went wrong");
        res.send({
            error: "smth went wrong boy",
        });
    };
}

module.exports.getUserById = (req, res) => {

}

module.exports.createUser = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
    } = req.body
    try {
        const newUser = await db.User.create({
            email,
            firstName,
            lastName,
            createdAt: new Date(),
            updatedAt: new Date(),

        });
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.send({
            error: "smth went wrong",
        });
    }


}

module.exports.updateUser = (req, res) => {

}

module.exports.deleteUser = (req, res) => {

}
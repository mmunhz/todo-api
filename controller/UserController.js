const { UserDAO, User } = require("../model/User")

module.exports = class UserController {

    static async getAll(req, res) {
        try {
            const users = await UserDAO.getInstance().getAll()

            res.status(200).json({
                message: "Users successfully retrieved.",
                items: users
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    static async insert(req, res) {
        const { username, email, password } = req.body
        const user = new User(username, email, password)

        try {
            const response = await UserDAO.getInstance().insert(user)

            res.status(201).json({
                message: "User succesfully created.",
                inserted: response
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }
}

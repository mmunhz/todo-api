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

    static async getOneById(req, res) {
        const id = req.params.id

        // validations??

        try {
            const response = await UserDAO.getInstance().getOneById(id)
            if (response) {
                res.status(200).json({
                    message: "User successfuly retrieved",
                    item: response
                })
            } else {
                res.status(404).json({
                    message: "User not found."
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed"
            })
            throw error
        }
    }

    static async removeOneById(req, res) {
        const id = req.body.id

        try {
            const response = await UserDAO.getInstance().removeOneById(id)
            res.status(200).json({
                message: "User deleted successfully.",
                deletedCount: response
            })
        } catch (error) {
            res.status(5005).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    static async updateOne(req, res) {
        const json = req.body
        try {
            const response = await UserDAO.getInstance().updateOne(json)
            res.status(200).json({
                message: "User updated successfully.",
                modifiedCount: response
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

}

const { UserDAO } = require("../model/User")

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
}

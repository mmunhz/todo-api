// User Routes
const router = require("express").Router()

const UserController = require("../controller/UserController")

router.get('/', UserController.getAll)
router.post('/add', UserController.insert)

module.exports = router

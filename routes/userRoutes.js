// User Routes
const router = require("express").Router()

const UserController = require("../controller/UserController")

router.get('/', UserController.getAll)
router.get('/:id', UserController.getOneById)
router.post('/add', UserController.insert)
router.delete('/remove', UserController.removeOneById)
router.patch('/edit', UserController.updateOne)

module.exports = router

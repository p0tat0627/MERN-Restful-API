const express = require('express')
const router = express.Router()
const {
  getHome,
  setHome,
  updateHome,
  deleteHome,
} = require('../controllers/homeController')


router.route('/').get(getHome).post(setHome)
router.route('/:id').delete(deleteHome).put(updateHome)

module.exports = router
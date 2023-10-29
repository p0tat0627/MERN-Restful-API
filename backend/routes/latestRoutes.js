const express = require('express');
const router = express.Router();
const { getLatest, uploadLatest, updateLatest, deleteLatest } = require('../controllers/latestController');

router.route('/upload').post(uploadLatest);
router.route('/').get(getLatest);
router.route('/:id').delete(deleteLatest).put(updateLatest)

module.exports = router;

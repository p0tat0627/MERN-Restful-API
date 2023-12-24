const express = require('express');
const router = express.Router();
const { getAlbum, uploadAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController');

router.route('/upload').post(uploadAlbum);
router.route('/').get(getAlbum);
router.route('/:id').delete(deleteAlbum).put(updateAlbum)

module.exports = router;

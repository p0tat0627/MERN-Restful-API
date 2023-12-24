const express = require('express');
const router = express.Router();
const { getGallery, uploadGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');

router.route('/upload').post(uploadGallery);
router.route('/').get(getGallery);
router.route('/:id').delete(deleteGallery).put(updateGallery)

module.exports = router;
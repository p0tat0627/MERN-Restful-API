const asyncHandler = require("express-async-handler");
const Gallery = require("../models/galleryModel");

// fetch all the gallery images
const getGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find();

  res.status(200).json(gallery);
});


// upload all the gallery images at once
const uploadGallery = asyncHandler(async (req, res) => {
  if (!req.body.imgUrls) {
    res.status(400);
    throw new Error("Gallery images are required!");
  }

  const gallery = await Gallery.create({
    imgUrls: req.body.imgUrls,
  });

  res.status(200).json(gallery);
});

// update all the images from the gallery
const updateGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(400);
    throw new Error("gallery contents not found");
  }

  const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGallery);
});

// delete all the images from the gallery
const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(400);
    throw new Error("Gallery images not found");
  }

  await gallery.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  uploadGallery,
  getGallery,
  updateGallery,
  deleteGallery
};

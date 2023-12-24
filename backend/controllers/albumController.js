const asyncHandler = require("express-async-handler");
const Album = require("../models/albumModel");

const getAlbum = asyncHandler(async (req, res) => {
  const album = await Album.find();

  res.status(200).json(album);
});

const uploadAlbum = asyncHandler(async (req, res) => {
  if (!req.body.audioUrls || !req.body.audioFileNames || !req.body.imgUrl) {
    res.status(400);
    throw new Error("Audio files and image are required!");
  }

  const album = await Album.create({
    audioUrls: req.body.audioUrls,
    audioFileNames: req.body.audioFileNames,
    imgUrl: req.body.imgUrl
  });

  res.status(200).json(album);
});

const updateAlbum = asyncHandler(async (req, res) => {
  const album = await Latest.findById(req.params.id);

  if (!album) {
    res.status(400);
    throw new Error("album contents not found");
  }

  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAlbum);
});

const deleteAlbum = asyncHandler(async (req, res) => {
  const latest = await Latest.findById(req.params.id);

  if (!latest) {
    res.status(400);
    throw new Error("Latest text not found");
  }

  await latest.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  uploadAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum
};

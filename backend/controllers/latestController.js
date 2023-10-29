const asyncHandler = require("express-async-handler");
const Latest = require("../models/latestModel");

const getLatest = asyncHandler(async (req, res) => {
  const latest = await Latest.find();

  res.status(200).json(latest);
});

const uploadLatest = asyncHandler(async (req, res) => {
  if (!req.body.imgUrl || !req.body.text) {
    res.status(400);
    throw new Error("Images and texts are required");
  }

  const latest = await Latest.create({
    text: req.body.text,
    imgUrl: req.body.imgUrl
  });

  res.status(200).json(latest);
});

const updateLatest = asyncHandler(async (req, res) => {
  const latest = await Latest.findById(req.params.id);

  if (!latest) {
    res.status(400);
    throw new Error("latest content not found");
  }

  const updatedLatest = await Latest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLatest);
});

const deleteLatest = asyncHandler(async (req, res) => {
  const latest = await Latest.findById(req.params.id);

  if (!latest) {
    res.status(400);
    throw new Error("Latest text not found");
  }

  await latest.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  uploadLatest,
  getLatest,
  updateLatest,
  deleteLatest
};

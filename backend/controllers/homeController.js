const asyncHandler = require('express-async-handler')

const Home = require('../models/homeModel')


// @desc    Get home
// @route   GET /api/home
// @access  Private
const getHome = asyncHandler(async (req, res) => {
  const home = await Home.find()

  res.status(200).json(home)
})

// @desc    Set home
// @route   POST /api/home
// @access  Private
const setHome = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text')
  }

  const home = await Home.create({
    text: req.body.text
  })

  res.status(200).json(home)
})

// @desc    Update home
// @route   PUT /api/home/:id
// @access  Private
const updateHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id)

  if (!home) {
    res.status(400)
    throw new Error('Home text not found')
  }

  const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedHome)
})

// @desc    Delete home
// @route   DELETE /api/home/:id
// @access  Private
const deleteHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id)

  if (!home) {
    res.status(400)
    throw new Error('Home text not found')
  }

  await home.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getHome,
  setHome,
  updateHome,
  deleteHome,
}
const mongoose = require('mongoose');
mongoose.pluralize(null);

const gallerySchema = mongoose.Schema(
  {
    imgUrls: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Gallery', gallerySchema);
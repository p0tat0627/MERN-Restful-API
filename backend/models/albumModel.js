const mongoose = require('mongoose');
mongoose.pluralize(null);

const albumSchema = mongoose.Schema(
  {
    audioUrls: {
      type: [String],
      required: true,
    },
    audioFileNames: {
      type: [String],
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Album', albumSchema);
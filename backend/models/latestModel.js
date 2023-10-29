const mongoose = require('mongoose');
mongoose.pluralize(null);

const latestSchema = mongoose.Schema(
  {
    text: {
      type: String,
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

module.exports = mongoose.model('Latest', latestSchema);

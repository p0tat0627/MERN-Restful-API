const mongoose = require('mongoose')
mongoose.pluralize(null);

const homeSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    }
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Home', homeSchema)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://static3.srcdn.com/wordpress/wp-content/uploads/2021/03/the-office-steve-carell-social.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);

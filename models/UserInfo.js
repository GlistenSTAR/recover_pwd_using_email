const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChildrenSchema = require('./Children');

// Create Schema
const UserInfoSchema = new Schema({
  userid: {type: String,required: true},
  chnum: {type: Number},
  guadian_firstname:{type: String},
  guadian_lastname:{type: String},
  business_phone_number:{type: String},
  home_phone_number:{type: String},
  street:{type: String},
  zip:{type: String},
  city:{type: String},
  state:{type: String},
  house_number:{type: String},
  children: [ChildrenSchema]
});

module.exports = UserInfo = mongoose.model('userinfos', UserInfoSchema);;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const LttySchema = require('./Ltty');
// const GttySchema = require('./Gtty');

// Create Schema
const ChildrenSchema = new Schema({
  firstname: {
    type: String
  },
  middlename: {
    type: String
  },
  lastname: {
    type: String
  },
  sex:{
    type: String
  },
  birthday:{
    type: Date
  },
  zip: {
    type: String
  },
  street: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  house_number: {
    type: String
  },
  completion: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  // Lttys: [LttySchema],
  data: {type: Object}
});

module.exports = ChildrenSchema

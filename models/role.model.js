const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { StatusHelper } = require("../helpers");

const RoleSchema = new Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String, default: StatusHelper.ACTIVE }
});

module.exports = mongoose.model("Role", RoleSchema);

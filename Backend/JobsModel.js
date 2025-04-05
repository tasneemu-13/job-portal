const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
      title: String,
      skills: [String],
      company_name: String,
      salary: Number,
      extend_date: Date,
      job_url: String,
      company_profile_pic: String,
      job_type: String
},
    { timestamps : true

});
module.exports = mongoose.model("Job",Schema)
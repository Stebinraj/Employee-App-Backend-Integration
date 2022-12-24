const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

// module.exports = { EmployeeModel };
exports.EmployeeModel = EmployeeModel;
var mongoose = require('mongoose');

module.exports = mongoose.model('Expense', {
    EDate: Date,
    Category: String,
    EType: String,
    Amount: Number
});
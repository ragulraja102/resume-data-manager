const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    education: [{
        institution: String,
        degree: String,
        year: String
    }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }],
    skills: [String],
    summary: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);

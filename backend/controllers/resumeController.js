const Resume = require('../models/Resume');

// @desc    Get all resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (resume) {
        // Ensure user owns the resume or is admin/recruiter (simplified to owner for now)
        if (resume.user.toString() === req.user._id.toString() || req.user.role === 'admin') {
            res.json(resume);
        } else {
            res.status(401).json({ message: 'Not authorized to view this resume' });
        }
    } else {
        res.status(404).json({ message: 'Resume not found' });
    }
};

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    const { fullName, email, phone, address, education, experience, skills, summary } = req.body;

    const resume = new Resume({
        user: req.user._id,
        fullName,
        email,
        phone,
        address,
        education,
        experience,
        skills,
        summary
    });

    const createdResume = await resume.save();
    res.status(201).json(createdResume);
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    const resume = await Resume.findById(req.params.id);

    if (resume) {
        if (resume.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await resume.deleteOne();
        res.json({ message: 'Resume removed' });
    } else {
        res.status(404).json({ message: 'Resume not found' });
    }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    const { fullName, email, phone, address, education, experience, skills, summary } = req.body;
    const resume = await Resume.findById(req.params.id);

    if (resume) {
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        resume.fullName = fullName || resume.fullName;
        resume.email = email || resume.email;
        resume.phone = phone || resume.phone;
        resume.address = address || resume.address;
        resume.education = education || resume.education;
        resume.experience = experience || resume.experience;
        resume.skills = skills || resume.skills;
        resume.summary = summary || resume.summary;

        const updatedResume = await resume.save();
        res.json(updatedResume);
    } else {
        res.status(404).json({ message: 'Resume not found' });
    }
};

module.exports = { getResumes, createResume, getResumeById, deleteResume, updateResume };

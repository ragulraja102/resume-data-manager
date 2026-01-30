import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/AuthContext';

const ResumeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
        skills: '',
        education: [],
        experience: []
    });

    useEffect(() => {
        if (id) {
            const fetchResume = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await api.get(`/resumes/${id}`, config);
                setFormData({
                    ...data,
                    skills: data.skills.join(', '),
                    education: data.education || [],
                    experience: data.experience || []
                });
            };
            fetchResume();
        }
    }, [id, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEducationChange = (index, e) => {
        const newEducation = [...formData.education];
        newEducation[index][e.target.name] = e.target.value;
        setFormData({ ...formData, education: newEducation });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { institution: '', degree: '', year: '' }]
        });
    };

    const removeEducation = (index) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation });
    };

    const handleExperienceChange = (index, e) => {
        const newExperience = [...formData.experience];
        newExperience[index][e.target.name] = e.target.value;
        setFormData({ ...formData, experience: newExperience });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { company: '', role: '', duration: '', description: '' }]
        });
    };

    const removeExperience = (index) => {
        const newExperience = formData.experience.filter((_, i) => i !== index);
        setFormData({ ...formData, experience: newExperience });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const resumeData = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim())
        };

        try {
            if (id) {
                await api.put(`/resumes/${id}`, resumeData, config);
            } else {
                await api.post('/resumes', resumeData, config);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>{id ? 'Edit Resume' : 'Create Resume'}</h2>
            <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Professional Summary</label>
                    <textarea name="summary" className="form-control" rows="4" value={formData.summary} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input type="text" name="skills" className="form-control" value={formData.skills} onChange={handleChange} placeholder="Java, Python, React..." />
                </div>

                <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0 }}>Education</h3>
                        <button type="button" onClick={addEducation} className="btn" style={{ fontSize: '0.9rem', padding: '8px 15px', background: '#e0f7fa', color: '#006064' }}>+ Add Education</button>
                    </div>
                    {formData.education.map((edu, index) => (
                        <div key={index} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e9ecef' }}>
                            <div className="form-group">
                                <input type="text" name="institution" placeholder="Institution" className="form-control" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} style={{ marginBottom: '10px' }} />
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                                    <input type="text" name="degree" placeholder="Degree" className="form-control" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                                    <input type="text" name="year" placeholder="Year" className="form-control" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
                                </div>
                            </div>
                            <button type="button" onClick={() => removeEducation(index)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Remove</button>
                        </div>
                    ))}
                </div>

                <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0 }}>Experience</h3>
                        <button type="button" onClick={addExperience} className="btn" style={{ fontSize: '0.9rem', padding: '8px 15px', background: '#e0f7fa', color: '#006064' }}>+ Add Experience</button>
                    </div>
                    {formData.experience.map((exp, index) => (
                        <div key={index} style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #e9ecef' }}>
                            <div className="form-group">
                                <input type="text" name="company" placeholder="Company" className="form-control" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} style={{ marginBottom: '10px' }} />
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <input type="text" name="role" placeholder="Role" className="form-control" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} />
                                    <input type="text" name="duration" placeholder="Duration" className="form-control" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} />
                                </div>
                                <textarea name="description" placeholder="Description" className="form-control" rows="3" value={exp.description} onChange={(e) => handleExperienceChange(index, e)}></textarea>
                            </div>
                            <button type="button" onClick={() => removeExperience(index)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Remove</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>{id ? 'Update Resume' : 'Save Resume'}</button>
            </form>
        </div>
    );
};

export default ResumeForm;

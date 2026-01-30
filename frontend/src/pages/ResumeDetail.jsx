import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ResumeDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            try {
                const { data } = await axios.get(`http://localhost:5000/api/resumes/${id}`, config);
                setResume(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchResume();
    }, [id, user]);

    if (!resume) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className="card">
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>{resume.fullName}</h1>
                <p style={{ color: '#666' }}>{resume.email} | {resume.phone}</p>
                <p style={{ color: '#666' }}>{resume.address}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Professional Summary</h3>
                <p>{resume.summary}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {resume.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>

            {resume.experience && resume.experience.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Experience</h3>
                    {resume.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{exp.role} at {exp.company}</h4>
                            <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.9rem' }}>{exp.duration}</p>
                            <p style={{ margin: 0 }}>{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {resume.education && resume.education.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Education</h3>
                    {resume.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{edu.institution}</h4>
                            <p style={{ margin: 0 }}>{edu.degree}, {edu.year}</p>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '30px' }}>
                <Link to="/dashboard" className="btn" style={{ border: '1px solid #ccc' }}>Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default ResumeDetail;

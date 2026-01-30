import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchResumes = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            try {
                const { data } = await api.get('/resumes', config);
                setResumes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchResumes();
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            try {
                await api.delete(`/resumes/${id}`, config);
                setResumes(resumes.filter(resume => resume._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>My Resumes</h2>
                <Link to="/create-resume" className="btn btn-primary">+ Create New</Link>
            </div>

            {resumes.length === 0 ? (
                <div className="card">
                    <p>No resumes found. Create one to get started!</p>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="card resume-item">
                            <h3>{resume.fullName}</h3>
                            <p>{resume.email}</p>
                            <p>{resume.summary ? resume.summary.substring(0, 50) + '...' : ''}</p>
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <Link to={`/resume/${resume._id}`} className="btn" style={{ background: '#ecf0f1' }}>View</Link>
                                <Link to={`/edit-resume/${resume._id}`} className="btn" style={{ background: '#ecf0f1' }}>Edit</Link>
                                <button onClick={() => handleDelete(resume._id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;

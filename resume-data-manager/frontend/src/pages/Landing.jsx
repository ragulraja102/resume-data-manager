import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-hero">
            <h1>Resume Data Manager</h1>
            <p>
                Professional resume management for the modern era. Create, manage, and share your professional profile with ease.
            </p>
            <div>
                <Link to="/register" className="btn btn-primary" style={{ marginRight: '20px' }}>Get Started</Link>
                <Link to="/login" className="btn" style={{ background: 'transparent', border: '2px solid #ccc', color: '#666' }}>Login</Link>
            </div>
        </div>
    );
};

export default Landing;

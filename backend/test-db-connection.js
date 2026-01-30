const mongoose = require('mongoose');

const uri = "mongodb+srv://ragulraja102_db_user:t6HybItaPFYBHf87@resume-data-manager.3kol7iz.mongodb.net/resume_manager?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        console.log("Attempting to connect...");
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

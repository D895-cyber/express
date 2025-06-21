const express = require('express')
const mongoose =  require("mongoose")
const cors = require('cors');
const path = require('path');
const app = express();
const blogRouter = require('./routes/BlogRoutes')
const authRoutes = require('./routes/auth')

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'YOUR_RENDER_FRONTEND_URL' : 'http://localhost:3000',
    credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api',blogRouter)

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/blog-frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/blog-frontend/build', 'index.html'));
    });
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dev:dev123@cluster0.es90y1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("successfully");
}).catch((err)=>console.log(err))

// Server Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
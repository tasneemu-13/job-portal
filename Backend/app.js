const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ✅ Fix CORS configuration
app.use(cors({
    origin: 'https://job-portal-delta-steel.vercel.app',  // Update to Vercel URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// ✅ Fix route prefix
app.use("/api/v1", require("./routes"));  // Fixed missing `/`

module.exports = app;


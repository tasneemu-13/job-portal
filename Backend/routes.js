const express = require('express');
const router = express.Router();

const JobModel = require("./JobsModel");
const ContactModel = require("./contactModel");

// CREATE Job
router.post("/create", async (req, res) => {
    try {
        await JobModel.create(req.body);
        res.status(201).send({ msg: "Job created successfully" });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).send({ error: "Failed to create job", details: error.message });
    }
});

// GET All Jobs
router.get("/jobs", async (req, res) => {
    try {
        const jobs = await JobModel.find({});
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch jobs" });
    }
});

// CREATE Contact Message
router.post("/contact", async (req, res) => {
    try {
        await ContactModel.create(req.body);
        res.status(201).send({ msg: "Message sent successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to send message" });
    }
});


// DELETE Job (RESTful style)
router.delete("/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        await JobModel.findByIdAndDelete(jobId);
        res.status(200).send({ msg: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).send({ error: "Failed to delete job" });
    }
});

// DELETE Job (like the screenshot: using POST)
router.post("/delete-job/:jobId", async (req, res) => {
    try {
        const jobId = req.params.jobId;
        console.log("Came to delete:", jobId);
        await JobModel.findByIdAndDelete(jobId);
        res.status(200).send({ msg: "Job deleted successfully using POST" });
    } catch (error) {
        console.error("Error deleting job via POST:", error);
        res.status(500).send({ error: "Failed to delete job via POST" });
    }
});

module.exports = router;

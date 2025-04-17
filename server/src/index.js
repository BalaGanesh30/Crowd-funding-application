const express = require("express");
const path = require("path");
const connect = require("./config/connection");
const routers = require("./routers/routers");
const cors = require("cors");
const bodyParser = require("body-parser");
// const serverless = require("vercel-http"); // Needed for Vercel deployment

require("dotenv").config();

const app = express();
connect();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(
  "/campaign-uploads",
  express.static(path.join(__dirname, "../src/CampaignUploads"))
);
app.use("/uploads", express.static(path.join(__dirname, "../src/Uploads")));
app.use(
  "/campaign-files",
  express.static(path.join(__dirname, "../src/CampaignFiles"))
);

// API routes
app.use("/v1", routers);

// Test root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// For local dev only
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

// For Vercel deployment
// module.exports = serverless(app);

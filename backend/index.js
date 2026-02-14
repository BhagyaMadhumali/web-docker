const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/jobs", require("./routes/job"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/applications", require("./routes/applicant"));

// Debug env variables (optional)
console.log("ENV PORT:", process.env.PORT);
console.log("ENV MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");
console.log("ENV JWT_SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

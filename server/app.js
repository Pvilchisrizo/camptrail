const express = require("express");
const cors = require("cors");
const programRoutes = require("./routes/programRoutes");
const authRoutes = require("./routes/authRoutes");
const childRoutes = require("./routes/childRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const updateRoutes = require("./routes/updateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Camptrail API is running" });
});

app.use("/api/programs", programRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/updates", updateRoutes);

module.exports = app;

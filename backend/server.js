const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const atendeesRoutes = require("./routes/atendeesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/atendees", atendeesRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

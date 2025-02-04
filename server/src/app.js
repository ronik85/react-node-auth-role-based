import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

sequelize.sync()
    .then(() => console.log("Database synced"))
    .catch((err) => console.error("Error syncing database:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;

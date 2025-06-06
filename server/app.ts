import express, { Application } from "express";
import cors from "cors";
import apiAccountRoutes from "./routes/accountRoutes";
import articleRoutes from "./routes/articleRoutes";
import authenRoutes from "./routes/authenRoutes";
import surveyRoutes from "./routes/surveyRoutes";
import programRoutes from "./routes/programRoutes";
import authenticateToken from "./middleware/authenMiddleware";
import courseRoutes from "./routes/courseRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
})); // Enable CORS with credentials

// Article Routes
app.use("/api/articles", articleRoutes);

// Auth Routes
app.use("/api/auth", authenRoutes);

// Public Course Routes
app.use("/api/courses", courseRoutes)

// Survey Routes
app.use("/api/surveys", surveyRoutes);

// Program Routes
app.use("/api/programs", programRoutes);

// JWT Middleware for all other routes
app.use(authenticateToken);

// Protected Routes
app.use("/api/account", apiAccountRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
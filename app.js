import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const PORT = 5000; // Change this back to a proper backend port

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/authAPP")
  .then(() => console.log(" Connected to database"))
  .catch((err) => console.log(" MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    token:{type:String},
    task: { type: String },
    completed: { type: Boolean, default: false },
  });
  
const Todo = mongoose.model("Todo", todoSchema);


// Signup Route
app.post("/signup", async (req, res) => {
    console.log ("hi this is signup end point",req.body)

  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user exists")
     return res.status(201).json({ message: "User already exists" });

      // return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ username, email, password: hashedPassword });


    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});


app.post("/signin", async (req, res) => {
    console.log(req.body,"hi this is sign in endpoint")
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      // Generate token
      const token = jwt.sign({ userId: user._id }, "yourSecretKey", { expiresIn: "1h" });
      // const user= await
      // user.insertOne(token:token)
      // const newTodo = new Todo({userId:user._id,token:token});
      // console.log(newTodo)
      // await newTodo.save();
      // await user.save();
  
      res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/todos/add", async (req, res) => {
    try {
      const { userId, task } = req.body;
      if (!userId || !task) return res.status(400).json({ message: "Missing required fields" });
  
      const newTodo = new Todo({ userId, task });
      await newTodo.save();
  
      res.status(201).json(newTodo); // Send saved todo back
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/todos/:id", async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/todos", (req, res) => {
    console.log("hi this is todo end point");
    res.send("in todo");
  });
  
  app.get("/todos/:userId", async (req, res) => {
    console.log(req.params);
    try {
        const { userId } = req.params;
        const todos = await Todo.find({ userId });

        if (todos.length > 0) {
            res.json(todos); // ✅ Send response only once
        } else {
            res.status(404).json({ message: "No todos found" }); // ✅ Proper response when no todos exist
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
;
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


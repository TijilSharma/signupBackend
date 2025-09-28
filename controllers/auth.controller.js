    import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupController = async (req, res)=>{
    try {
        console.log("Received body:", req.body);
      const {username, email, password, confirmPassword} = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET,);

      res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

export const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist exists" });
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (match===false) {
            return res.status(400).json({ message: "Wrong Password" });
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ message: "User login successfully",user: existingUser._id, token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

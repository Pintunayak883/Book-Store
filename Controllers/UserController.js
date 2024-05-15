import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

class UserController {
  static async register(req, res) {
    // If no existing users, proceed to register the admin user
    const { username, email, password, role } = req.body;
    try {
      // Check if there are any existing users
      const existingUsers = await User.find({ email });

      // If there are existing users, return an error
      if (existingUsers.length > 0) {
        return res.status(200).json({ message: "User already Registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: `${newUser.username} registered successfully` });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid Password or email" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ message: `Welcome back ${user.username}`, user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async addAddress(req, res) {
    const { id } = req.params;
    const { address } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(id);

      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Add the address to the user
      user.address = address;

      // Save the updated user
      await user.save();

      res.status(200).json({
        message: `Address added successfully for ${user.username}`,
        user,
      });
    } catch (error) {
      console.error("Error adding address:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAddress(req, res) {
    const { id } = req.params;

    try {
      // Find the user by ID
      const user = await User.findById(id);

      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the address of the user
      res.status(200).json({ address: user.address });
    } catch (error) {
      console.error("Error fetching address:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;

import express from "express";
import UserController from "../Controllers/UserController.js";
import OrderController from "../Controllers/OrderController.js";
const UserRouter = express.Router();

// Route for user registration
UserRouter.post("/register", UserController.register);

// Route for user login
UserRouter.post("/login", UserController.login);

// Route for add address
UserRouter.put("/address/:id", UserController.addAddress);

// Route for get address
UserRouter.get("/address/:id", UserController.getAddress);

UserRouter.post("/order", OrderController.Order);
UserRouter.get("/getorder", OrderController.GetAllOrders);

export default UserRouter;

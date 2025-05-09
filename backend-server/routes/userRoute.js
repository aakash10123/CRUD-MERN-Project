import express from "express"
import { allUser, createUser, deleteUser, getUserByID, updateUser } from "../controller/userController.js"

const route = express.Router()

route.post("/user", createUser)  //create user
route.get("/users", allUser)  // get all users
route.get("/userbyid/:id", getUserByID)  // find users based on id
route.put("/updatebyid/:id", updateUser) // update the user
route.delete("/deleteuser/:id", deleteUser)   // delete the user

export default route
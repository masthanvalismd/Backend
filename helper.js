import { client } from "./index.js";
import bcrypt from "bcrypt";


export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10) //bcrypt.gen(no. of rounds)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword);
    return hashedPassword;
  }
  
  console.log(genPassword("pasword@123"));
  
  export async function createUser(name,hashedPassword) {
    return await client
      .db("stackoverflow")
      .collection("login")
      .insertOne({ name: name, password: hashedPassword });
  }
  
  export async function getUserByName(name) {
    return await client
      .db("stackoverflow")
      .collection("login")
      .findOne({ name:name });
  }
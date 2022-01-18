import express from "express";
// import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/stackoverflow",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);
app.get("/", (req, res) => {
res.send("login page")

});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({message: 'Login successfull',user:user})
      } else {
        res.send({message: 'password does not match'})
      }
    } else {
      res.send({message:"user not registered"});
    }
  })
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully registered" });
        }
      });
    }
  });
});

app.listen(9000, () => console.log("listening on port 9000"));

const { ObjectId } = require("mongodb");
const mongo = require("./connect.cjs");
// --- GET all data
module.exports.getData = async (req, res, next) => {
  let data = await mongo.db.collection("Users").find().toArray();
  res.send(data);
};

// get the data by Id
module.exports.getId = async (req, res, next) => {
  const id = req.params.id;
  // let data = await mongo.db.collection("Users").findOne({ _id: ObjectId(id)});
  // const data = await mongo.db
  //   .collection("Users")
  //   .findOne({ _id: ObjectId(id) });
  // const {id}=req.body

  let data = await mongo.db.collection("Users").findOne({ id: id });
  // console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

//post the data
module.exports.postData = async (req, res, next) => {
  const { name, providerid } = req.body;
  const user = await mongo.db.collection("Users").findOne({ name: name });

  if (user) {
    var data = await mongo.db.collection("Users").insertOne(req.body);
    return res.send(data);
  } else {
    //  res.status(401).send("invalid credential")

    var data = await mongo.db.collection("Users").insertOne(req.body);
    return res.send(data);
  }
};

module.exports.updateData = async (req, res, next) => {
  const id = req.params.id;
  const user = await mongo.db.collection("Users").findOne({ id: id });
  console.log(req.body);
  if (user) {
    var data = await mongo.db
      .collection("Users")
      .updateOne(
        { name: req.body.name },
        { id: req.body.id },
        { providerid: req.body.providerid }
      );
    return res.send(data);
  } else {
    console.log("not updated");
  }
};

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// const app = express();
// app.use(cors());
// app.use(express.json());

// const MONGODB_URL = "mongodb://127.0.0.1:27017";
// async function createConnection() {
//   const client = new MongoClient(MONGODB_URL);
//   await client.connect();
//   console.log("Mongodb Connected");
//   return client;
// }
// export const client = await createConnection();

// app.get("/get", function (req, res) {
//   res.send("Welcome To login page😊");
// });

// app.post("/post", async function (req, res) {
//   const { name, providerid } = req.body;
//   const user = await client
//     .db("Musicdetails")
//     .collection("Users")
//     .findOne({ name: name });
//   if (user) {
//     const pass = user.providerid;
//     if (pass === providerid) {
//       res.send({ msg: "Login Successfully" });
//     } else {
//       res.status(401).send("Incorrect Password");
//     }
//   } else {
//     //  res.status(401).send("invalid credential")

//     const user = await client
//       .db("Musicdetails")
//       .collection("Users")
//       .insertOne(req.body);
//     res.send({ msg: "Signup Successfully" });
//   }
// });

// app.listen(4000, () => {
//   console.log(`Server started`);
// });

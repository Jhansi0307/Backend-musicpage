const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Shopifystores data---------------------------//>

// --- GET all data
module.exports.getShopifyData = async (req, res, next) => {
  let data = await mongo.db.collection("Shopify").find().toArray();
  res.send(data);
};

// get the data by Id
module.exports.getShopifyId = async (req, res, next) => {
  const id = req.params.id;
  // let data = await mongo.db.collection("Users").findOne({ _id: ObjectId(id)});
  // const data = await mongo.db
  //   .collection("Users")
  //   .findOne({ _id: ObjectId(id) });
  // const {id}=req.body

  let data = await mongo.db
    .collection("Shopify")
    .findOne({ _id: ObjectId(id) });
  // console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

//post the data
module.exports.postShopifyData = async (req, res, next) => {
  const { name } = req.body;
  const user = await mongo.db.collection("Shopify").findOne({ name: name });

  if (user) {
    var data = await mongo.db.collection("Shopify").insertOne(req.body);
    return res.send(data);
  } else {
    //  res.status(401).send("invalid credential")

    var data = await mongo.db.collection("Shopify").insertOne(req.body);
    return res.send(data);
  }
};

module.exports.updateShopifyData = async (req, res, next) => {
  try {
    var response = await mongo.db
      .collection("Shopify")
      .findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { ...req.body } },
        { returnNewDocument: true }
      );

    res.send(response);
  } catch (err) {
    console.error(err);

    res.status(500).send(err);
  }
};



module.exports.searchedData = async (req, res, next) => {
  const id = req.params.name;

  let data = await mongo.db
    .collection("Shopify")
    .find({ name: req.params.name })
    .toArray();
  console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};


//---------------------------------------Getting Shopoifystores data---------------------------//>

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

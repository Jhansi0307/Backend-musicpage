const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Shopifystores data---------------------------//>

// --- GET all data
module.exports.home = async (req, res, next) => {
  res.send("Welcome");
};

module.exports.getShopifyData = async (req, res, next) => {
  const Count1 = await mongo.db.collection("Shopify").find().count();
  const limit1 = req.params.limit;
  const skip1 = req.params.skip;
  console.log(limit1, skip1);
  const authpro = await mongo.db
    .collection("Shopify")
    .find()
    .limit(parseInt(limit1))
    .skip(parseInt(skip1))
    .toArray();
  const data = {
    count: Count1,
    value: authpro,
  };
  console.log(data);
  res.send(data);
  // let data = await mongo.db.collection("Shopify").find().toArray();
  // res.send(data);
};

// get the data by Id
module.exports.getShopifyId = async (req, res, next) => {
  const id = req.params.id;
  let data = await mongo.db
    .collection("Shopify")
    .findOne({ _id: ObjectId(id) });

  res.send(data);
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
  const id = req.body.name;
  const regex = new RegExp([id].join(""), "i");
  try {
    let data = await mongo.db
      .collection("Shopify")
      .find({ name: { $regex: regex } })
      .toArray();
    console.log(data);
    // console.log(id);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
  // console.log(data);

  // res.send(data);
};

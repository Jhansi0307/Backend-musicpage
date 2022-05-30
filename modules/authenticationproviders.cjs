const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Shopifystores data---------------------------//>

// --- GET all data
module.exports.getauthenticationData = async (req, res, next) => {
  let data = await mongo.db.collection("Authentication").find().toArray();
  res.send(data);
};

// get the data by I
module.exports.getAuthentId = async (req, res, next) => {
  const id = req.params.id;
  // let data = await mongo.db.collection("Users").findOne({ _id: ObjectId(id)});
  // const data = await mongo.db
  //   .collection("Users")
  //   .findOne({ _id: ObjectId(id) });
  // const {id}=req.body

  let data = await mongo.db
    .collection("Authentication")
    .findOne({ _id: ObjectId(id) });
  // console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

//post the data
module.exports.postAuthentData = async (req, res, next) => {
  const { name } = req.body;
  const user = await mongo.db
    .collection("Authentication")
    .findOne({ name: name });

  if (user) {
    var data = await mongo.db.collection("Authentication").insertOne(req.body);
    return res.send(data);
  } else {
    //  res.status(401).send("invalid credential")

    var data = await mongo.db.collection("Authentication").insertOne(req.body);
    return res.send(data);
  }
};

module.exports.updateAuthentData = async (req, res, next) => {
  try {
    var response = await mongo.db
      .collection("Authentication")
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

module.exports.searchAuthent= async (req, res, next) => {
  const id = req.params.name;

  let data = await mongo.db
    .collection("Authentication")
    .find({ name: req.params.name })
    .toArray();
  console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

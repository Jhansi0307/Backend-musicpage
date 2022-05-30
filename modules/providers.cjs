const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Providers data---------------------------//>

// --- GET all data
module.exports.getData = async (req, res, next) => {
  let data = await mongo.db.collection("Users").find().toArray();
  res.send(data);
};

// get the data by Id
module.exports.getId = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  // let data = await mongo.db.collection("Users").findOne({ _id: ObjectId(id)});
  // const data = await mongo.db
  //   .collection("Users")
  //   .findOne({ _id: ObjectId(id) });
  // const {_id}=req.body

  let data = await mongo.db.collection("Users").findOne({ _id: ObjectId(id) });
  // console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

//post the data
module.exports.postData = async (req, res, next) => {
  const { name } = req.body;
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
  try {
    var response = await mongo.db
      .collection("Users")
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
module.exports.providerSearch = async (req, res, next) => {
  const id = req.params.name;

  let data = await mongo.db
    .collection("Users")

    .find({ name: req.params.name })
    .toArray();
  console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Providers data---------------------------//>

// --- GET all data
module.exports.allData = async (req, res, next) => {
  let data = await mongo.db.collection("Application").find().toArray();
  res.send(data);
};

// get the data by Id
module.exports.GetId = async (req, res, next) => {
  const id = req.params.id;

  let data = await mongo.db
    .collection("Application")
    .findOne({ _id: ObjectId(id) });
  // console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

//post the data
module.exports.postingData = async (req, res, next) => {
  const { name } = req.body;
  const user = await mongo.db.collection("Application").findOne({ name: name });

  if (user) {
    var data = await mongo.db.collection("Application").insertOne(req.body);
    return res.send(data);
  } else {
    //  res.status(401).send("invalid credential")

    var data = await mongo.db.collection("Application").insertOne(req.body);
    return res.send(data);
  }
};

module.exports.updatingData = async (req, res, next) => {
  try {
    var response = await mongo.db
      .collection("Application")
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
module.exports.searchData = async (req, res, next) => {
  const id = req.params.name;

  let data = await mongo.db
    .collection("Application")
    .find({ name: req.params.name })
    .toArray();
  console.log(data);
  // console.log(id);
  res.send(data);
  // console.log(data);

  // res.send(data);
};

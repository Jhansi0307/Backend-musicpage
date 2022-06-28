const { ObjectId } = require("mongodb");
const mongo = require("../connect.cjs");

//---------------------------------------Getting Providers data---------------------------//>

// --- GET all data
module.exports.getData = async (req, res, next) => {
  // let data = await mongo.db.collection("Users").find().toArray();
  const Count1 = await mongo.db.collection("Users").find().count();
  const limit1 = req.params.limit;
  const skip1 = req.params.skip;
  console.log(limit1, skip1);
  const authpro = await mongo.db
    .collection("Users")
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
  // module.exports.getData = async (request, response)=> {
  //
  //   console.log(Count1);
  //   const limit1 = request.params.limit;
  //   const skip1 = request.params.skip;
  //   const authpro = await mongo.db.collection("Users").find().limit(parseInt(limit1)).skip(parseInt(skip1)).toArray();
  // response.send(authpro);
  //
  // console.log(authpro);
  // response.send(authpro);

  //   // console.log(request.params.limit2)
  //   // console.log(request.params.skip2)
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
  const id = req.body.name;
  const regex = new RegExp([id].join(""), "i");
  try {
    let data = await mongo.db
      .collection("Users")
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

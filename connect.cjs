const { MongoClient } = require("mongodb");

module.exports = {
  db: null,
  async connect() {
    try {
      let con = await MongoClient.connect("mongodb+srv://root:root@cluster0.xvho7.mongodb.net/?retryWrites=true&w=majority");
      this.db = con.db('Musicdetails');
      console.log("---MongoDB Connected---");
    } catch (err) {
      console.log(err);
    }
  },
};
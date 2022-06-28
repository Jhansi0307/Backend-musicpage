const express = require("express");
const cors = require("cors");
const mongo = require("./connect.cjs");

const {
  postData,
  getData,
  getId,
  updateData,
  providerSearch,
} = require("./modules/providers.cjs");

const {
  getShopifyData,
  getShopifyId,
  postShopifyData,
  updateShopifyData,
  searchedData,
  home,
} = require("./modules/shopify.cjs");
const {
  allData,
  GetId,
  postingData,
  updatingData,
  searchData,
} = require("./modules/applications.cjs");
const {
  getauthenticationData,
  getAuthentId,
  postAuthentData,
  updateAuthentData,
  searchAuthent,
} = require("./modules/authenticationproviders.cjs");
const app = express();
app.use(cors());
app.use(express.json());
mongo.connect();
//endpoints for providers
app.get("/get/:limit/:skip", getData);
app.get("/get/:id", getId);
app.post("/post", postData);
app.put("/put/:id", updateData);
app.post("/searchprovider", providerSearch);

//endpoints for shopifystores
app.get("/", home);
app.get("/getshopify/:limit/:skip", getShopifyData);
app.get("/getshopify/:id", getShopifyId);
app.post("/postshopify", postShopifyData);
app.put("/update/:id", updateShopifyData);
app.post("/searched", searchedData);

//endpoints for authentications

app.get("/getauthent/:limit/:skip", getauthenticationData);
app.get("/getauthent/:id", getAuthentId);
app.post("/postauthent", postAuthentData);
app.put("/updateauthent/:id", updateAuthentData);
app.post("/searcheauthent", searchAuthent);

//endpoints for applications

app.get("/getapp/:limit/:skip", allData);
app.get("/getapp/:id", GetId);
app.post("/postapp", postingData);
app.put("/updateapp/:id", updatingData);
app.post("/getname", searchData);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});

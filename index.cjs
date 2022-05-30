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

app.post("/post", postData);
app.get("/get", getData);
app.get("/get/:id", getId);
app.put("/put/:id", updateData);
app.get("/searchprovider/:name", providerSearch);

//endpoints for shopifystores

app.get("/getshopify", getShopifyData);
app.get("/getshopify/:id", getShopifyId);
app.post("/postshopify", postShopifyData);
app.put("/update/:id", updateShopifyData);
app.get("/searched/:name", searchedData);

//endpoints for authentications

app.get("/getauthent", getauthenticationData);
app.get("/getauthent/:id", getAuthentId);
app.post("/postauthent", postAuthentData);
app.put("/updateauthent/:id", updateAuthentData);
app.get("/searcheauthent/:name", searchAuthent);

//endpoints for applications

app.get("/getapp", allData);
app.get("/getapp/:id", GetId);
app.post("/postapp", postingData);
app.put("/updateapp/:id", updatingData);
app.get("/getname/:name", searchData);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started : 8000");
});

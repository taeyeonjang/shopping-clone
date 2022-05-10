const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const path = require("path");


app.use("/sss", (req, res) => {
  res.json({"asdlkfjasdkf":'asdfasdf'})
})

app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('mongoDB connected'))
  .catch((err) => console.log(err))


app.use(cors())



app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
//ㅁㄴㅇㄹㅁㄴㅇㄹ app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5100

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});
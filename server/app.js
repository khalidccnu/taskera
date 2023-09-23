// modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const imageKit = require("imagekit");
const morgan = require("morgan");

// init
const app = express();
const port = process.env.PORT || 5000;
const uploadMulter = multer();

// control cors
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  optionSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// imagekit authentication
const imagekit = new imageKit({
  publicKey: process.env.IK_PL_KEY,
  privateKey: process.env.IK_PV_KEY,
  urlEndpoint: `https://ik.imagekit.io/` + process.env.IK_ID,
});

// upload to imagekit
const uploadToIK = async (req, res) => {
  if (req.files) {
    const documentsLinks = await Promise.all(
      req.files.map((file) => {
        return imagekit
          .upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: `taskera/documents`,
          })
          .then((response) => response.filePath);
      })
    );

    res.send(documentsLinks);
  } else {
    let fieldName = req.file.fieldname.replace("Photo", "");

    switch (fieldName) {
      case "user":
        fieldName = "users";
        break;
      default:
        fieldName = "";
    }

    imagekit
      .upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `taskera/${fieldName}`,
      })
      .then((response) => res.send(response))
      .catch((error) => res.send(error));
  }
};

// upload user photo
app.post("/users/upload", uploadMulter.single("userPhoto"), uploadToIK);

// upload documents
app.post("/documents/upload", uploadMulter.array("documents"), uploadToIK);

// check api running or not
app.get("/", (req, res) => {
  res.send("Taskera is running...");
});

app.listen(port, () => {
  console.log(`Taskera API is running on port: ${port}`);
});

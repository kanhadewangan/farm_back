import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// app.post('/post',upload.single('file'),(req,res)=>{

//   if(upload)
//   {
//     console.log("succefully uploaded")
//   }
//   else{
//     res.send(req.file);
//     console.log(req.file)

//   }

// })

app.post("/api/farmer/signup", async (req, res) => {
  const { email, password, address } = req.body;
  const prisma = new PrismaClient();
  let farmer = await prisma.farmer.create({
    data: {
      email,
      password,
      address,
    },
    select: {
      email: true,
    },
  });
  const verify = jwt.sign(farmer, "hello");
  res.json({ farmer, verify });
});

app.post("/api/product", upload.array("image"), async (req, res) => {
  {
    const { title, price, description, type } = req.body;
    const prisma = new PrismaClient();

    let product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        type,
      },
      select: {
        title: true,
        price: true,
      },
    });
    res.json({ product });
  }
});

app.get("/api/product", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    let product = await prisma.product.findMany({});
    res.json({ product });
  } catch (error) {
    res.json({ status: 404, message: "user not found" });
    console.log(error);
  }
});

app.get("/api/farmer", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    let farmer = await prisma.farmer.findMany({
      where: { email: req.body.email },
    });
    res.json({ farmer });
  } catch (error) {
    res.json({ status: 404, message: "user not found" });
  }
});

app.post("/api/buyer/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const prisma = new PrismaClient();
  let buyer = await prisma.buyer.create({
    data: {
      email,
      password,
      name,
    },
    select: {
      email: true,
    },
  });
  const verify = jwt.sign(buyer, "hello");
  res.json({ buyer, verify });
  console.log(verify);
});

app.get("/api/buyer", async (req, res) => {
  const prisma = new PrismaClient();
  console.log;
  try {
    let buyer = await prisma.buyer.findMany({
      // where: { email: req.body.email, password: req.body.password }
    });
    res.json({ buyer });
  } catch (error) {
    res.json({ status: 404, message: "user not found" });
  }
});

app.get("/api/all",async(req,res)=>{
  const prisma = new PrismaClient();
  let product = await prisma.product.findMany({})
  res.json({product})
})

app.listen(3000, () => {
  console.log("server started");
});

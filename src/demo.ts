import express from "express";
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 1000000 }, // 1MB
});

app.post('/api/farmer/upload-image', upload.single('image'), async (req, res) => {
  try {
    const { email, password, address } = req.body;
    const image = req.file;

    if (image) {
        const farmer = await prisma.farmer.create({
          data: {
            email,
            password,
            address,
            image: {
              create: {
                url: image.path,
                filename: image.originalname,
              },
            },
          },
        });
        res.json({ message: 'Image uploaded successfully' });
      } else {
        res.status(400).json({ message: 'No image uploaded' });
      }

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});


app.listen(3000, () => {
  console.log("server started");
});
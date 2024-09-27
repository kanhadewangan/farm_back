"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const upload = multer({
    dest: './uploads/',
    limits: { fileSize: 1000000 }, // 1MB
});
app.post('/api/farmer/upload-image', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, address } = req.body;
        const image = req.file;
        if (image) {
            const farmer = yield prisma.farmer.create({
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
        }
        else {
            res.status(400).json({ message: 'No image uploaded' });
        }
        res.json({ message: 'Image uploaded successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
}));
app.listen(3000, () => {
    console.log("server started");
});

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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
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
app.post("/api/farmer/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, address } = req.body;
    const prisma = new client_1.PrismaClient();
    let farmer = yield prisma.farmer.create({
        data: {
            email,
            password,
            address,
        },
        select: {
            email: true,
        },
    });
    const verify = jsonwebtoken_1.default.sign(farmer, "hello");
    res.json({ farmer, verify });
}));
app.post("/api/product", upload.array("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const { title, price, description, type } = req.body;
        const prisma = new client_1.PrismaClient();
        let product = yield prisma.product.create({
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
}));
app.get("/api/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        let product = yield prisma.product.findMany({});
        res.json({ product });
    }
    catch (error) {
        res.json({ status: 404, message: "user not found" });
        console.log(error);
    }
}));
app.get("/api/farmer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient();
        let farmer = yield prisma.farmer.findMany({
            where: { email: req.body.email },
        });
        res.json({ farmer });
    }
    catch (error) {
        res.json({ status: 404, message: "user not found" });
    }
}));
app.post("/api/buyer/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const prisma = new client_1.PrismaClient();
    let buyer = yield prisma.buyer.create({
        data: {
            email,
            password,
            name,
        },
        select: {
            email: true,
        },
    });
    const verify = jsonwebtoken_1.default.sign(buyer, "hello");
    res.json({ buyer, verify });
    console.log(verify);
}));
app.get("/api/buyer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    console.log;
    try {
        let buyer = yield prisma.buyer.findMany({
        // where: { email: req.body.email, password: req.body.password }
        });
        res.json({ buyer });
    }
    catch (error) {
        res.json({ status: 404, message: "user not found" });
    }
}));
app.get("/api/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    let farmer = yield prisma.farmer.findMany({});
    let buyer = yield prisma.buyer.findMany({});
    res.json({ farmer, buyer });
}));
app.listen(3000, () => {
    console.log("server started");
});

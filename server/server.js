
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/productsRoute");

const shopProductsRouter = require('./routes/shop/productsRoutes');

mongoose
    .connect('mongodb+srv://abdallahalhasan2:OSJdJTvmWVhAEUpG@cluster0.fpgxc.mongodb.net/myDatabase?retryWrites=true&w=majority')
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth' , authRouter)

// admin
app.use('/api/admin/products' , adminProductsRouter)


// shop 
app.use('/api/shop/products' , shopProductsRouter)

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));


// OSJdJTvmWVhAEUpG
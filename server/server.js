
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/productsRoute");

const shopProductsRouter = require('./routes/shop/productsRoutes');
const shopCartRouter = require('./routes/shop/cartRoutes');
const shopAddressRouter = require('./routes/shop/AddressRoutes');
const shopSearchRouter = require('./routes/shop/SearchRoutes');
const shopReviewRouter = require('./routes/shop/ReviewsRoutes');
const commonFeatureRouter = require('./routes/common/FeaturesRoutes');
const adminClothesCategoriesRouter = require('./routes/admin/CategoriesRoute');

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
app.use('/api/admin/clothesCategories' , adminClothesCategoriesRouter)


// shop 
app.use('/api/shop/products' , shopProductsRouter)
app.use('/api/shop/cart' , shopCartRouter)
app.use('/api/shop/Address' , shopAddressRouter)

app.use('/api/shop/search' , shopSearchRouter)
app.use('/api/shop/review' , shopReviewRouter)
app.use('/api/common/feature' , commonFeatureRouter)

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));


// OSJdJTvmWVhAEUpG
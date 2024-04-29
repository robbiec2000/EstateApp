import express from "express"
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("server is running");
});


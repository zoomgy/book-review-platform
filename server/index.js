import e from "express";
const app = e();
import mongoose from "mongoose";
import userRouter from "./router/user.router.js";
import bookRouter from "./router/book.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

async function connectDatabase() {
  await mongoose.connect(
    "mongodb+srv://ayushsinghcs21:DNI7D9a6KNFf6Vty@cluster0.d43h7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connected");
}
connectDatabase();

app.use(cookieParser());
app.use(e.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(userRouter);
app.use(bookRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Started At Port :${process.env.PORT || 3000}`);
});

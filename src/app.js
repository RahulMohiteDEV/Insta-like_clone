const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

{/* require routee*/}
const authRouter = require("./routes/auth.route");
const postRouter = require('./routes/post.route')
const followRouter = require('./routes/follow.route')

/* using routes*/ 

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use('/api/user', followRouter);


module.exports = app
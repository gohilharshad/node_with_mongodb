const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3010;
const url = 'mongodb://127.0.0.1:27017/user_list'

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB");

    app.use(express.json());
    const userRouter = require('./router/user.router')
    app.use('/api/v1', userRouter);
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});
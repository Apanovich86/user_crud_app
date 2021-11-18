const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const userRouter = require('./routes/user.router');

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');
const app = express();


mongoose.connect(MONGO_CONNECT_URL);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

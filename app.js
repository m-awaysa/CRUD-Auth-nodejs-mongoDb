const express = require('express');
const connectDB = require('./DB/connection');
const app = express();
const indexRouter = require('./modules/index.route');
app.use(express.json());
connectDB();


app.use('/api/v1/users', indexRouter.userRouter);
app.get('*', (req, res) => {
    res.json({ message: "404" });
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`))


require('./conn');
const express = require('express');
const User = require('./models/signUp');
const app = express();
const bcrypt = require('bcryptjs');

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello');
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await User.findOne({ email });
        bcrypt.compare(password, newUser.password, (err, isMatch) => {
            if (isMatch) {
                res.status(200).send('LogIn Successfully..');
            } else {
                console.log('Passwords do not match');
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/signup", async (req, res) => {
    try {
        const new_user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        });
        new_user.password = new_user.generateHash(req.body.password);
        new_user.save();
        console.log(new_user);
        res.status(200).send(new_user);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

app.listen(5000, () => {
    console.log('your app is running on port 5000');
})
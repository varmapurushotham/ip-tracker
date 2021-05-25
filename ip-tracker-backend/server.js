const express = require('express');
const mongoose = require('mongoose');
const ipTrackerModel = require('./model/iptracker.model')
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://staybro:staybromongo@cluster0.xnkuw.mongodb.net/iptrackerDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.post('/api/sawo-login', (req, res) => {

    let userID = req.body.payLoadData.user_id
    let userToken = req.body.payLoadData.verification_token

    axios
        .post('https://api.sawolabs.com/api/v1/userverify/', { 'user_id': userID })
        .then(result => {
            console.log(`statusCode: 200`)
            console.log('Backend Response: ', result)
            var sawoApiToken = result.data.verification_token;
            if (userToken == sawoApiToken) {
                res.send(JSON.stringify('Authentication Successful'))
            }
        })
        .catch(error => {
            console.error('Error: ', error)
        })

})

app.post('/api/log-search-data/:ipAddr', (req, res, next) => {

    //Create an Obj
    const ipTrackerObj = new ipTrackerModel({
        ip_Addr: req.params.ipAddr
    })

    ipTrackerObj.save(function (err, ipTrackerObj) {
        if (err) {
            res.send({ status: 500, message: 'Unable to log Search Data in MongoDB' })
        } else {
            res.send({ status: 200, message: 'Logged search data successfully!!', results: ipTrackerObj })
        }
    })
})

app.listen(3000, () => { console.log('Server is running on port 3000...') })
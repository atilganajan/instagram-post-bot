const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');

const conn = require("./db/connect");

const postToInsta = require("./sendPost");

dotenv.config();
conn();

cron.schedule('*/55 * * * *', async () => {


try {
  const response = postToInsta();
  console.log("success")
} catch (error) {
    console.log(error)
}


 });  




const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
const express = require('express');
const app = express();
const port = 8000;
const db = require("./config/mongoose");

//Middleware
app.use(express.urlencoded({ extended: true })); //If extended is false, you can not post "nested object" { person: { name: 'bobby', age: '3' } } otherwise  { 'person[age]': '3', 'person[name]': 'bobby' }
app.use("/",require("./routes"));

app.listen(port, (err) => {
    if (err) console.log(`Error in running the server: ${err}`);
    else console.log(`Server is running on port: ${port}`);
});
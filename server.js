const express = require('express');
const app = express();
const port=3000;

app.use('/',express.static('public'));

const budget = {
    myBudget: [
{
    title: 'Eat out',
    budget: 25
},
{
    title: 'Rent',
    budget: 375
}
]};

app.use('/budget',(req,res) => {
    res.sendFile('C:\\dev\\personal-budget1\\quiz4.json');
});

app.get('/hello',(req,res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


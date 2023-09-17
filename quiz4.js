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
},
{
    title: 'Grocery',
    budget: 110
},
{
    title: 'Shopping',
    budget: 70
},
{
    title: 'Taxi',
    budget: 30
},
{
    title: 'Concert',
    budget: 200
},
{
    title: 'Movie',
    budget: 20
}
]};

app.get('/budget',(req,res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
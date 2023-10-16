const express = require('express');
const cors = require('cors');
const app = express();
const port=3000;
const data= require('./budget.json');
const mongoose=require('mongoose')
const dataModel=require('./models/budget_schema')
let url = 'mongodb://127.0.0.1:27017/personal_budget';
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('connected to database')
      //   let newData=[
      //     {title:'Rent',related_value:375,color:'#ff6384'},
      //     {title:'Grocery',related_value:110,color:'#36a2eb'},
      //     {title:'Shopping',related_value:70,color:'#fd6b19'},
      //     {title:'Taxi',related_value:50,color:'#9BA960'},
      //     {title:'Concert',related_value:200,color:'#964B00'},
      //     {title:'Movies',related_value:50,color:'#581845'}     
      // ];
      //   dataModel.insertMany(newData)
      //   .then((data)=>{
      //       console.log(data)
      //       //mongoose.connection.close()
      //   })
      //   .catch((connectionError)=>{
      //       console.log(connectionError)
      //   }) 
      // dataModel.find({})
      //               .then((data)=>{
      //                   console.log(data)
      //                   // mongoose.connection.close()
      //                   resdata=data;
      //               })
      //               .catch((connectionError)=>{
      //                   console.log(connectionError)
      //               })  
    })
    .catch((connectionError)=>{
        console.log(connectionError)
  })
  app.use(express.json());
  app.post('/budget', (req, res) => {
    const { title, related_value, color } = req.body;
    if (!title || !related_value || !color) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!/^#[0-9A-Fa-f]{6}$/g.test(color)) {
        return res.status(400).json({ error: 'Color must be in hexadecimal format with atleast 6 digits' });
    }

    const newData = new dataModel({
        title: title,
        related_value: related_value,
        color: color,
    });

    newData.save()
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.use('/',express.static('public'));
app.use(cors());
 app.get('/budget',(req,res) => {
  dataModel.find({})
  .then((data)=>{
      console.log(data)
     res.json(data);
  })
  .catch((connectionError)=>{
      console.log(connectionError)
  })
 });

// app.get('/budget', (req, res) => {
//     res.json(budget);
// });
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

const express = require('express')
const path = require('path');
const ejs = require("ejs");
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/todoapp?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const Train = require("./models/model_train")
const Login = require("./models/model_login")

const app = express();   // activate express app

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs'); 
app.use('/public', express.static('public')) 


app.get('/', function(요청, 응답) { 
  응답.render('index.ejs')
  //응답.sendFile('views/index.html', { root: __dirname }); 
})

app.get('/train', async function(요청, 응답) { 
  const train = await Train.find()
    응답.render('traintable.ejs', { 사용자: 요청.user, posts : train })
});

app.get('/train/:id', async function(요청, 응답) { 
  const _id = 요청.params.id
  const train = await Train.findById(_id)
    응답.render('traintable.ejs', { 사용자: 요청.user, posts : train })
});

app.post('/train', async function(요청, 응답){
  
  console.log(요청.body)
 
  var my_date = new Date()
  console.log(my_date)
  date = JSON.stringify(my_date).split("T")[0]
 
  console.log(date)
 
  var 저장할거 = {
    date: date,
    user: 요청.user,
    pushup: 요청.body.pushup, 
    stomach: 요청.body.stomach,
    squat: 요청.body.squat,
    arm: 요청.body.arm,
    uplift: 요청.body.uplift,
    upheel: 요청.body.upheel,
    kick_on_chair: 요청.body.kick_on_chair,
    spreading_thigh: 요청.body.spreading_thigh,
    date: date
   } 
  console.log(저장할거)
  var train = await Train.create(저장할거)
  if(!train) {
    응답.status(500).json({message: "DB Error"})
  }
  응답.redirect('/train');
})


app.delete('/deletetrain/:id', async function(요청, 응답){
  const id = 요청.params.id
  let _id = id 
  const result = await Train.findByIdAndRemove(_id)
  if(!result) {
    응답.status(500).json({message: "DB Error"})}
   else {
    응답.status(200).json({message: "data deleted"})}
})

app.get('/upload', function(요청, 응답) { 
  응답.render('upload.ejs')
  });

app.get('/login', function(요청,응답){
  console.log("login requested")
  응답.render('login.ejs') }
);

app.post('/login', function(요청, 응답){ 
    console.log(요청.body) 
    응답.redirect('/train')
  });

app.post('/register', async function(요청, 응답) {
  console.log(요청.body)
  try {
    const login = await Login.create(요청.body)
    응답.status(200).json(login);
  } catch (error) {
    console.log(error)
    응답.status(500).json({message: error.message})
  }
})

app.listen(5500, function() {
  console.log('listening on 5500')
}) 

const express = require('express')
const{ObjectId} = require('mongodb');
const path = require('path');
const ejs = require("ejs");
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose");
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
const cors = require("cors");

const Train = require("./models/trainModel")
const Login = require("./models/login")
const User = require("./models/userModel")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/todoapp?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs'); 
app.use('/public', express.static('public')) 


app.listen(process.env.PORT || 5000, function() {
    console.log('listening on 5500')
  }) 

app.get('/', function(요청, 응답) { 
  console.log(요청.body)
  응답.sendFile('index.html', { root: __dirname });
})

app.get("/getUsers", async (req, res) => {
  const results = await User.find();
  console.log(results)
    if (!results) {
      res.json("err");
    } else {
      res.json(results);
    }
  });

  app.post("/createUser", async (req, res) => {
    console.log(req.body)
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
  
    res.json(user);
  });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
//app.use는 미들웨어. 요청-응답 중간에 뭔가 실행되는 코드
app.use(session({secret : '비밀번호', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/login', function(요청,응답){
  console.log("login requested")
  응답.render('login.ejs') }
);

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){ 
    console.log(요청.body) 
    응답.redirect('/train')
  });

app.post('/login_react', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){ 
    console.log(요청.body) 
    응답.status(200).json({message: "You are Logged in"})
  });

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, async function (입력한아이디, 입력한비번, done) {
    console.log(입력한아이디, 입력한비번);
    const user = await Login.findOne({ id: 입력한아이디 }); 
    
    if (!user) return done(null, false, { message: '존재하지않는 아이디요' })

    입력한아이디 = user.id
    if (입력한비번 == user.pw) {
      console.log("result2")
      return done(null, user)

    } else {
      console.log("result3")
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser( async function (아이디, done) {
  console.log(아이디)
  const 결과 = Login.findOne({ id: 아이디 });

    if (!결과) return done(null, false, { message: '로그인안하셨는데요?' })
    else {
      return done(null, 아이디)
    }
  }) 

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

app.post('/register_react', async function(요청, 응답) {
  console.log(요청.body)
  try {
    const login = await Login.create(요청.body)
    응답.status(200).json(login);
  } catch (error) {
    console.log(error)
    응답.status(500).json({message: error.message})
  }
})

app.get('/mypage', 로그인했니, function (요청, 응답) {
  
  응답.render('mypage.ejs', { 사용자: 요청.user })
}) 
  
function 로그인했니(요청, 응답, next) { 
  console.log(요청.user)
  if (요청.user) { 
      next()   } 
    else { 
     응답.send('로그인안하셨는데요?') 
  } } 

app.get('/write', function(요청, 응답) { 
  응답.render('input_table.ejs')
});

app.get('/train', 로그인했니, async function(요청, 응답) { 
  const train = await Train.find()
    console.log(train)
    응답.render('train.ejs', { 사용자: 요청.user, posts : train })
});

app.get('/hometrain', async function(req, res) { 
  const results = await Train.find()
  if (!results) {
    res.json("err");
  } else {
    res.json(results);
  }
});

app.post('/train', 로그인했니, async function(요청, 응답){
  
  console.log(요청.body)
 
  var my_date = new Date()
  console.log(my_date)
  date = JSON.stringify(my_date).split("T")[0]
 
  console.log(date)
 
  var 저장할거 = {
    name: 요청.user,
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

app.post('/train_react', 로그인했니, async function(요청, 응답){
  
  console.log(요청.body)
 
  var my_date = new Date()
  console.log(my_date)
  date = JSON.stringify(my_date).split("T")[0]
 
  console.log(date)
 
  var 저장할거 = {
    name: 요청.user,
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
  응답.status(200).json({message: "Data Stored"});
})
app.delete('/deletetrain/:id', async function(req, res){
  const id = req.params.id
  let _id = id   
  const result = await Train.findByIdAndRemove(_id)
  if(!result) {
    res.status(500).json({message: "DB Error"})}
   else {
    res.status(200).json({message: "data deleted"})}
})

app.delete('/delete/:id', async function(req, res){
  const id = req.params.id
 let _id = id
  
 const train = await Train.findByIdAndRemove(_id)
 if(!train) {
   res.status(500).json({message: "DB Error"})}
 else {
   console.log("data deleted")
   res.redirect('/train')}
 })
const express=require("express");
const path=require("path");
const app=express();
const port = process.env.PORT || 2000;
const bcrypt= require('bcrypt')
const mongoose= require('mongoose')

//mongodb connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/user', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', function(){
    console.log('connection has been made')
}).on('error',function(error){
    console.log('connection error',error)
})
//login schema
const userSchema = new mongoose.Schema({
    usrname: String,
    psw: String,
  }); 

//student detail schema
const studentdata = new mongoose.Schema({
    name: String,
    age: Number,
    dob: Date,
    school: String,
    class: String,
    division: String,
    status: String
})

//compiling schema into model
var usermodel= mongoose.model('usermodel', userSchema);
var studentmodel= mongoose.model('studentmodel', studentdata);
app.use(express.json())
const users=[]  

app.use(express.urlencoded({extended: true}))

//express stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())


//pug stuff
app.set('view engine', 'pug')//set template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('login.pug',params);
})
app.get('/sign',(req,res)=>{
    const params={ }
    res.status(200).render('signup.pug',params);
})

app.get('/student',(req,res)=>{
    const params={ }
    res.status(200).render('view.pug',params);
})
app.get('/student/add',(req,res)=>{
    const params={ }
    res.status(200).render('add.pug',params);
})
app.get('/users',(req,res)=>{
    res.json(users)
})
app.post('/users', async (request,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword= await bcrypt.hash(request.body.psw, salt)
        console.log("hassedpassword",hashedPassword)
        console.log("name",request.body.usrname)
        request.body.psw = hashedPassword;
        console.log("hashed",request.body.psw)
        var user = new usermodel(request.body);
        console.log("model",user)
        user.save(function(err,doc){
            if (err) return console.error(err);
            return res.redirect('/')
        });
       
    }catch{
        res.status(200).send("error")
    }
})
app.post('/login', async (req,res)=>{ 
    try{
        const email= req.body.usrname;
        const password=req.body.psw
        const usermail= await usermodel.findOne({usrname: email});
        if(usermail.usrname==""){
            res.status(200).send("user not found")
        }
        console.log(usermail.psw)
        const match = await bcrypt.compare(password, usermail.psw);

        if(match) {
            //login
            res.status(200).render('home.pug') 
            console.log("logged in")
        }else{
            res.status(200).send("password not matching")
        }
    }
    catch(error){
        res.status(200).render('signup.pug')
    }
    
});
app.post('/add', async (req,res)=>{
    try{
        var student= new studentmodel(req.body)
        student.save(function(err,doc){
            if (err) return console.error(err);
            return res.redirect('/student')
        });
        


    }catch{
        res.status(200).send("err")
    }
})
//get the json format of saved data
app.get('/add', (req,res)=>{
    studentmodel.find({}, function(err,doc){
        if(err) console.log(err)
        res.send(doc)
    })
})  



app.listen(port, ()=>{
    console.log(`The application started on port ${port}`);
})
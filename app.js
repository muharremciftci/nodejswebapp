//log kütüphanesi
const morgan=require('morgan');
//server kurmak için
const express=require('express');


const mongoose=require('mongoose');

const Ders=require('./models/ders');



const dbURI='mongodb+srv://mciftci:Ciftci.1907@cluster1.cn3py.mongodb.net/blogDB?retryWrites=true&w=majority';

const app=express();

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views','htmls');


//morgan log tutmak için kullanılır
app.use(morgan('dev'));

app.get('/ders-ekle',(req,res)=>{
    const ders=new Ders({
        baslik:'Nodejs',
        icerik:'Nodejsileapp'
    });
    
    ders.save().then((result)=>{
        res.send(result);

    }).catch((err)=console.log(err))
})
// app.use((req,res,next)=>{
//     console.log(req.hostname,req.path,req.method);
//     next();
//         });

app.get('/',(req,res)=>{

    const dersler=[
        {baslik:'react dersler',icerik:'React icerik'},
        
        {baslik:'.net dersler',icerik:'.net icerik'}

    ]

res.render('index',{dersler})
})


app.get('/ders/ekle',(req,res)=>{
    res.render('ekle');
})


app.get('/hakkimizda',(req,res)=>{

    res.render('hakkimizda',{hakkimizda:'Benim hakkımda'})
    })
    

    app.use((req,res)=>{

        res.status(404).render('404');
        })
        


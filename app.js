//log kütüphanesi
const morgan=require('morgan');
//server kurmak için
const express=require('express');
//mongodbicin
const mongoose=require('mongoose');
//model erişimi için
const Ders=require('./models/ders');
//router
const dersRoutes=require('./routes/dersRoutes');





const dbURI='mongodb+srv://mciftci:Ciftci.1907@cluster1.cn3py.mongodb.net/blogDB?retryWrites=true&w=majority';

const app=express();

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


app.use(express.static('public'));
//verileri şifreli yollama
app.use(express.urlencoded({extended:true}));
app.use('/dersler',dersRoutes);

//view engine verileri yollamak için kullanır
app.set('view engine','ejs');
//view enginde dataların hagngi klasörde olduğunu söyler. //örnek htmls klasöründe sayfaları
app.set('views','htmls');


//morgan log tutmak için kullanılır
app.use(morgan('dev'));



//kaydet //böyle çağırırsak direk bu methoda gidip kayıt yapar otomatik modele bağlanır
app.get('/ders-ekle',(req,res)=>{
    const ders=new Ders({
        baslik:'muharrem',
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

//tümünü getir
app.get('/butun-dersler',(req,res)=>{
    Ders.find().then((result)=>{
        res.send(result);
    })
})


//id ye göre getir 
app.get('/tek-ders',(req,res)=>{
    Ders.findById('627c05bd5f13e53ac5e3e852').then((result)=>{
        res.send(result);
    })
})



//anasayfa
app.get('/',(req,res)=>{

    res.redirect('/dersler')
})


//ders ekleme sayfası
//aşağıdaki gibi yollanır ve ekle sayfası render edilir yani aslında renderle ekleye gönderme yapılır.
app.get('/ders/ekle',(req,res)=>{
    res.render('ekle');
})


//hakkimizda
app.get('/hakkimizda',(req,res)=>{

    res.render('hakkimizda',{hakkimizda:'Benim hakkımda'})
    })
    

//404 
    app.use((req,res)=>{

        res.status(404).render('404');
        })
        


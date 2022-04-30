const express=require('express');
const app=express();

app.listen(3000);

// app.get('/',(req,res)=>{
//     res.send('<p>Merhaba</p>');
// });

app.get('/index',(req,res)=>{

 res.sendFile('./htmls/index.html',{root:__dirname});

});


app.get ('/',(req,res)=>{

res.redirect('/index'); 

});

app.use((req,res)=>{

    res.status(404).sendFile('./htmls/404.html',{root:__dirname});

})
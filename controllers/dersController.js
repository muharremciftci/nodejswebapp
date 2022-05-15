const Ders=require('../models/ders');

//getir
const ders_index=(req,res)=>{
    Ders.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{dersler:result});
        
    })
    .catch((err)=>console.log(err))
}

//ekle
const dersEkle=(req,res)=>{
    const ders=new Ders(req.body);
    ders.save().then((result)=>{
        res.redirect('/dersler');
    })

    .catch((err)=>{
        console.log(err)
    })
}

//sil
const dersSil=(req,res)=>{

    const id=req.params.id;
    Ders.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/dersler'});
    }).catch((err)=>console.log(err))

}

//detay

const dersDetay=(req,res)=>{
    const id=req.params.id;

    Ders.findById(id).then((result)=>{
        res.render('detay',{ders:result})
    }).catch((err)=>console.log(err))
}

module.exports={
    ders_index,
    dersEkle,
    dersSil,
    dersDetay
}
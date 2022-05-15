const express=require('express');
const Ders=require('../models/ders');
const router=express.Router();
const dersController=require('../controllers/dersController');

//dersleri getir sırali
router.get('/',dersController.ders_index);
//post işlemi kaydetme
router.post('/',dersController.dersEkle);
//sil
router.delete('/:id',dersController.dersSil);
//detay
router.get('/:id',dersController.dersDetay);

module.exports=router;
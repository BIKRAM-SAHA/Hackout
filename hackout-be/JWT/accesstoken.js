const jwt = require('jsonwebtoken');
const secretKey = 'MamaLearnz';
const bcrypt = require('bcrypt');
module.exports=async(user,type_provided)=>{
    // var d = new Date();
    // d=d.getHours();
    const token=jwt.sign({email:user.email,password:user.password,id:user.pk_patient_id || user.pk_doctor_id,type:type_provided},secretKey,{ expiresIn: '1440m' })
    return token
 }
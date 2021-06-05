const mongoose = require ('mongoose');
const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username can not be blank:-)']
    } ,
    password:{
        type: String,
        required: [true, 'Password can not be blank:-)']
    } 

})
userschema.statics.findAndValidate = async function(username, password){
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser:false;
}

userschema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password= await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userschema);


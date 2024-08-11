const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const addUser = async(req, res) => {

  try{
      console.log(req.body);

      const {name, email, password, phone_no, profession }= req.body;

      if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ error: 'Only @gmail.com emails are allowed' });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ error: 'Email already exists' });
      }  

      if(email!==undefined && password !== undefined){

      const hashedPassword = await bcrypt.hash(password, 10); 
      
      const newUser = new User({name: name, email: email, password: hashedPassword, phone_no: phone_no, profession: profession});
      newUser.save();

      const user = {_id: newUser._id.toString(),email: email, password: hashedPassword}
      
      console.log(user);
      const payload = user;
      const token = jwt.sign(payload,process.env.TOKEN_SECRET)
      
      res.status(201).send({ token: token });      
      }

  }
  catch(err){
    res.status(500).json({ error: 'Something went wrong' });  
  }
}

const getSignin = async(req, res) =>{

    try{
    
    const { email, password } = req.body;
   
    if (email=='undefined' || password == 'undefined') {
      console.log('user is missing');
      return res.status(400).json({ error: 'User not found' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }  
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('password ',passwordMatch)
    if(!passwordMatch){
      return res.status(401).json({error: 'User not authorized'});
    }
    
    // Making our payload
    const loggedUser = { _id: user._id.toString(), email: user.email, password: user.password };

    const payload = loggedUser;
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    
    res.status(200).send({ token: token});
     
    }
    catch (err) { 
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports={
  addUser,getSignin
}
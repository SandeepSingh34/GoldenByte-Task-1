import express from 'express';
import jwt from "jsonwebtoken";
import { SignupModel } from '../connection/dbcon.js';
import bcrypt from 'bcryptjs';
//creating Route class instance
const route = express.Router();

const secretKey = 'ks99d8@lsl9k39s'; 




const GetDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;
  return currentDate
}

// Authentication endpoint
route.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)

  let r = await SignupModel.findOne({ email: email })

  if (!r) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, r.password);

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // Generate JWT token
  const token = jwt.sign({ userId: r.__id }, secretKey, { expiresIn: '1h' });
  let userType = r.userType
  res.json({ token: token, email: email, userType: userType });
});

route.post('/Signup', async (req, res) => {
  const { email, password, cnfPassword, UserType } = req.body;
  console.log(email, password, cnfPassword, UserType)

  const cnfPasswordHash = await bcrypt.hash(cnfPassword, 10);

  let EmailExist = await SignupModel.findOne({ email: email })

  if (EmailExist) {
    return res.status(401).json({ error: 'Email Already Exist' });
  }

  else {
    let r = await SignupModel({
      email: email,
      password: cnfPasswordHash,
      userType: UserType
    })
    r.save();

    const token = jwt.sign({ userId: r.__id }, secretKey, { expiresIn: '1h' });
    res.json({ token: token, email: email, userType: UserType });
  }

});




export default route
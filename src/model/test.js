import mongoose from '../config/DBHelpler.js';

// 定义 Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model('users', userSchema);

export default User;

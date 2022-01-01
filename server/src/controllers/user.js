const userModel = require("../models/user")
const bcrypt = require("bcryptjs");
class UserCtr {
  static async list(req, res) {
    try {
      const list = await userModel.find({}).select("-password")
      return res.send({success: true, data: list})
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const _id = req.params.id;
      if (!_id)
        return res.status(500).send({ success: false, message: "no id" });
      const user = await userModel.findById(_id).select('-password');
      if (!user)
        return res.status(500).send({ success: false, message: "not user" });
      return res.send({ success: true, data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      console.log('body', data)
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(data.password, salt);
      data.password = hashPass;
      const check = await userModel.findOne({phone: data.phone})
      console.log('check', check)
      if(check)
        return res.status(500).send({ success: false, message: "User exists" });
      const newUser = await userModel.create(data);
      if (!newUser)
        return res.status(500).send({ success: false, message: "create failed" });
      return res.send({ success: true, data: newUser});
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const data = req.body
      const _id = req.params.id
      if (!_id)
        return res.status(500).send({ success: false, message: "no id" })
      const update = await userModel.findByIdAndUpdate(_id, data, {new: true})
      res.send({success: true, data: update})
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const _id =  req.params.id
      if (!_id)
        return res.status(500).send({ success: false, message: "no id" });
      const user = userModel.findOneAndDelete({_id, role: 2})
      if(!user)
        return res.status(500).send({ success: false, message: "Deleted failed!" });
      res.send({success: true, message: "Delete completed!"})
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async ban(req, res) {
    try {
      const _id =  req.params.id
      const role = req.role
      const {flag} = req.body
      if(!flag)
        return res.status(500).send({ success: false, message: "no flag" });
      if (!_id)
        return res.status(500).send({ success: false, message: "no id" });
      const user = null
      if(role == 1){
        if(flag == "ban"){
          user = userModel.findOneAndUpdate({_id, role: {$in: [2]}}, {active: false})
        }
        else if(flag == "unban") {
          user = userModel.findOneAndUpdate({_id, role: {$in: [2]}}, {active: true})
        }
      }
      if(role == 0){
        if(flag == "ban"){
          user = userModel.findOneAndUpdate({_id, role: {$in: [1,2]}}, {active: false})
        }
        else if(flag == "unban") {
          user = userModel.findOneAndUpdate({_id, role: {$in: [1,2]}}, {active: true})
        }
      }
      if(!user)  return res.status(500).send({ success: false, message: "failed!" });
      res.send({success: true, message: "Completed!"})
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async checkToken(req, res) {
    try {
      const _id = req.user_id;
      if (!_id)
        return res.status(500).send({ success: false, message: "no id" });
      const user = await userModel.findById(_id).select('-password');
      if (!user)
        return res.status(500).send({ success: false, message: "not user" });
      return res.send({ success: true, data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

}

module.exports = UserCtr;

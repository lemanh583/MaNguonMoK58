const conversionModel = require("../models/conversions");
class Conversions {
  static async create(req, res) {
    try {
      const data = req.body;
      if (data.members.length == 0 || !data.type)
        return res
          .status(500)
          .send({ success: false, message: "Please check field" });
      if (data.members.length == 2) {
        let ex = await conversionModel.findOne({ members: data.members });
        let ex2 = await conversionModel
          .findOne({ members: data.members.reverse() })
        //   .populate({ path: "sender_id", select: "-password" })
        //   .populate({ path: "receiver_id", select: "-password" })
          .populate({ path: "last_message", populate: { path: "sender_id" } });
        // console.log('ex',ex)
        if (ex || ex2) {
          return res.status(200).send({ success: true, data: ex2, flag: 1 });
        }
      }
      const conv = await conversionModel.create(data);
      let result = await conversionModel.findById(conv._id)
                        // .populate({path: 'sender_id', select: '-password'})
                        // .populate({path: 'receiver_id', select: '-password'})
                        .populate({path: 'last_message', populate: {path: "sender_id"} })
      return res.send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async list(req, res) {
    try {
      const id = req.params.id; //id member
      if (!id)
        return res.status(500).send({ success: false, message: "No id" });
      const result = await conversionModel
                            .find({ members: { $in: [id] } })
                            .sort({updated_time: -1})
                            // .populate({ path: "sender_id", select: "-password" })
                            // .populate({ path: "receiver_id", select: "-password" })
                            .populate({ path: "last_message", populate: { path: "sender_id" } });

      return res.send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id; //id converison
      const data = req.body;
      if (!id)
        return res.status(500).send({ success: false, message: "no id" });
      const result = await conversionModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!result)
        return res
          .status(500)
          .send({ success: false, message: "no conversion" });
      return res.send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async get(req, res) {
    try {
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = Conversions;

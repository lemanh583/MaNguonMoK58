const conversionModel = require("../models/conversions")
class Conversions {
    static async create (req, res) {
        try {
            const data = req.body
            if(data.members.length == 0  || !data.type) 
                return res.status(500).send({success: false, message: "Please check field"})
            if(data.members.length == 2) {
                let ex = await conversionModel.findOne({members: data.members})
                let ex2 = await conversionModel.findOne({members: data.members.reverse()})
                // console.log('ex',ex)
                if(ex || ex2) {return res.status(200).send({success: true, data: ex2, flag: 1})}
            }
            const result = await conversionModel.create(data)
            return res.send({success: true, data: result})
        } catch (error) {
            return res.status(500).send({success: false, message: error.message})
        }
    }

    static async list (req, res) {
        try {
            const id = req.params.id //id member 
            if(!id)
                return res.status(500).send({success: false, message: "No id"})
            const result = await conversionModel.find({members: {$in: [id] }})
            return res.send({success: true, data: result})
        } catch (error) {
            return res.status(500).send({success: false, message: error.message})
        }
    }

    static async get (req, res) {
        try {
            
        } catch (error) {
            return res.status(500).send({success: false, message: error.message})
        }
    }
}

module.exports = Conversions
const mongoose = require('mongoose')
mongoose.connect(`mongodb://kdg:kingdomgame%40%4040@206.189.147.72:27017/kinginvest?authSource=admin`)

const {Type, Schema, model} = mongoose

const settingSchema = new Schema ({
    ordering : Number,
    content : String,
    type : String
})

const Settings = model('settings', settingSchema)

const socialSchema = new Schema ({
    ordering : Number,
    img_url : String,
    target_url : String,
    display : Boolean,
})

const Socials = model('socials', socialSchema)

module.exports = {
    Settings,
    Socials
}
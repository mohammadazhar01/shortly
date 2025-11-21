import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true},
    url: {type: String, required: true},
    clicks: { type: Number, default: 0},
    lastClicked: {type: Date},
    createdAt: {type: Date, default: Date.now}
});

const Link = mongoose.models.link || mongoose.model('links', linkSchema)

export default Link
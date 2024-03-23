import { Schema, model } from "mongoose";

const messagesCollection = 'messages'

const messageSchema = new Schema({
    user:{
        type: String,
        unique: true,
        required: true,
        index: true
    },
    message: String
    
})

export default model(messagesCollection, messageSchema);
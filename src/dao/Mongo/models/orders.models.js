import { Schema, model } from 'mongoose';

const orderCollection = 'orders'

const orderSchema = new Schema({  
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'productos'
    }],
    totalprice: Number,
    created: Date
    

})

const ordersModel = model(orderCollection, orderSchema)

export default ordersModel
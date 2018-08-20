const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaItem = new Schema ({
    name:{
        type: String
    },
    price:{
        type: Number
    },
    stock:{
        type: Number
    },
    tags:{
        type: String
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'User'
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const Item = mongoose.model('Item', schemaItem)

module.exports = Item
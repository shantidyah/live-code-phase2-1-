const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaUser = new Schema ({
    username:{
        type: String
    },
    password:{
        type: String
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const User = mongoose.model('User', schemaUser)

module.exports = User
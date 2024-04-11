const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionsSchema = new schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserInfo"
    },
    sessionID:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    amount: {
        type: Number,
        default: 0
    },
    currency:{
        type: String
    }
})

module.exports = mongoose.model("transactions", transactionsSchema);

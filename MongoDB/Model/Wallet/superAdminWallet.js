const mongoose=require('mongoose');


let walletSchema= new mongoose.Schema({
      balance: { type: Number, default: 0 },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      ref: "superAdmins",
    },
    { timestamps: true }
  );
  
  module.exports =mongoose.model("wallet", walletSchema);
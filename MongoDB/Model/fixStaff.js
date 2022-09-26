const mongoose = require('mongoose');

const fixStaffSchema = new mongoose.Schema({

    fixtureDetialls: {
        type: [{
            fixtureId: {type: mongoose.Schema.Types.ObjectId},
            status: {
                type: String,
                required: true,
                enum: ["open", "completed", "ongoing", "cancelled"],
                default: "open"
            }

        }]
    },
    staffId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "staff",
        required: true
    },
},
    { timestamps: true });

module.exports = mongoose.model("fixStaff", fixStaffSchema);
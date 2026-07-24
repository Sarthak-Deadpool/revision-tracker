const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required:true,
        },
        topic:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Topic",
            required:true,
        },
        revisionNumber:{
            type:Number,
            required:true,
        },
        scheduleDate:{
            type:Date,
            required:true,
        },
        completedAt:{
            type:Date,
             default: null,
        },
        rating:{
            type:String,
            enum: ["Easy", "Somewhat", "Forgot"],
            default:null,
        }
    },
    {
        timestamps:true,
    }
)

revisionSchema.index({
    user: 1,
    scheduledDate: 1,
});

revisionSchema.index({
    topic: 1,
    revisionNumber: 1,
});



const Revision = mongoose.model("Revision", revisionSchema);

module.exports = Revision;
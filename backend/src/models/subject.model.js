const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name:{
            type: String,
            required: [true, "Subject name is required"],
            trim:true,
            minlength: [2, "Subject length must be at least 2 characters"],
            maxlength: [50, "Subject name can not exceed 50 characters"]
        },
        color:{
            type:String,
            default:"#000000",
        },
        description:{
            type:String,
            maxlength: [200, "Description cannot exceed 200 characters"],
        }

    },
    {
        timestamps: true,
    }
)

subjectSchema.index(
    {
        user:1,
        name:1,
    },
    {
        unique:true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
)

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
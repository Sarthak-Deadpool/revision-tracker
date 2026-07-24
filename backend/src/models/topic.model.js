const mongoose =  require("mongoose");

const topicSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        name:{
            type: String,
            required: [true, "Topic name is required"],
            trim:true,
            minlength: [2, "Topic length must be at least 2 characters"],
            maxlength: [50, "Topic name can not exceed 50 characters"]
        },
        difficulty:{
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],

        },
        masteryLevel:{
            type:Number,
            default:0,
            min:0,
            max:100,
        },
        totalRevisions:{
            type:Number,
            default: 0,
        },
        lastRevisedAt:{
            type:Date,
            default:null,
        },
        notes:{
            type: String,
            maxlength:[1000, "Notes must not exceed 1000 character"],
            trim: true,
        },
        isArchived:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

topicSchema.index(
    {
        subject:1,
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


const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
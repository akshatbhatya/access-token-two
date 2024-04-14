import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true

    },
    views:{
        type:Number,
        default:0
    },
    thumbnail:{
        type:String,
        required:true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    videoFile:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model('video', videoSchema);

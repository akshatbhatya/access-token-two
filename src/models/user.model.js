import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    coverAvtar: {
      type: String,
    },
    avtar: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
      },
    ],
    password: {
      type: String,
      required: true,
    },
    refreshToken: { 
        type: String
     },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model('user', userSchema);

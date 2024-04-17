import { user } from '../models/user.model.js';
import ApiError from '../utils/apiError';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const authHandler = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization').replace('bearer ', '');

    // req.cookies?.refreshToken ||req.header("Authorization").replace("bearer ","");

    if (!token) {
      throw new ApiError(401, 'unotherized access');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const Ouruser = await user
      .findOne(decodedToken?._id)
      .select('-pasword -refreshToken');

    if (!Ouruser) {
      throw new ApiError(401, 'invalid access');
    }

    req.user = Ouruser;
    next();
  } catch (error) {
    throw new ApiError(400, error || 'invalid acces token');
  }
});

export default authHandler;
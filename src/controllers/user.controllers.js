import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { user } from '../models/user.model.js';
import fileUploder from '../utils/cloudinary.js';
import ApiResponse from '../utils/apiResponse.js';

const generateTokens = async (userId) => {
  try {
    const ourLogInUser = user.findById(userId);
    const generatedTokenAcesssToken = await ourLogInUser.generateAccessToken();
    const generatedTokenRefreshToken =
      await ourLogInUser.generateRefreshToken();

    ourLogInUser.refreshToken = generatedTokenRefreshToken;
    await ourLogInUser.save({ validateBeforeSave: false });

    return { generatedTokenAcesssToken, generatedTokenRefreshToken };
  } catch (error) {
    throw new ApiError(500, 'something Went Wrong In Genereated Tokens');
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password, avtar, coverAvtar } = req.body;

  // check all fields are empty or not '

  if (
    [userName, email, fullName, password].some(
      (fields) => fields?.trim() === ''
    )
  ) {
    throw new ApiError(400, 'all filds are required not be empty');
  }

  // check user exists or not

  const findUser = await user.findOne({
    $or: [{ userName }, { email }],
  });

  if (findUser) {
    throw new ApiError(400, 'user alredy exists');
  }

  // upload images

  const avtarImage = req?.files?.avtar[0]?.path;
  const coverAvtarImage = req?.files?.coverAvtar[0]?.path || '';

  //  upload files

  const uplodedAvtar = await fileUploder(avtarImage);
  const uplodedCoverAvtar = await fileUploder(coverAvtarImage);

  if (!uplodedAvtar) {
    throw new ApiError(400, 'avtar is required');
  }

  //  add data to mongo db

  const newUser = {
    userName: userName.toLowerCase(),
    email: email.toLowerCase(),
    avtar: uplodedAvtar.url,
    coverAvtar: uplodedCoverAvtar.url,
    fullName: fullName.toLowerCase(),
    password,
  };

  const createUser = await user.create(newUser);

  if (!createUser) {
    throw new ApiError(500, 'internal error user is not created ');
  }

  res.status(200).json(new ApiResponse(200, 'user created sucessfully'));
});

const login = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email) {
    throw new ApiError(400, 'username either email is required');
  }

  const currentUser = user.findOne({
    $or: [{ userName }, { email }],
  });

  if (!currentUser) {
    throw new ApiError(404, 'user not found');
  }

  const checkPassword = await currentUser.comparePassword(password);
  if (!checkPassword) {
    throw new ApiError(400, 'password is incorrect');
  }

  // generate tokens

  const { generatedTokenAcesssToken, generatedTokenRefreshToken } =
    await generateTokens(currentUser._id);

  const logedUser = await user
    .findById(currentUser._id)
    .select('-password -refreshToken');

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', generatedTokenAcesssToken, options)
    .cookie('refreshToken', generatedTokenRefreshToken, options)
    .json(
      new ApiResponse(200, 'user Loged In SucessFully ', {
        data: logedUser,
        generatedTokenAcesssToken,
        generatedTokenRefreshToken,
      })
    );
});

const logOut = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  const ourUser = req.user;
  user.findByIdAndUpdate(
    ourUser._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, 'user loged out'));
});
export { userRegister, login, logOut };

import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://root:root@drakaysa.xfoxrr4.mongodb.net/drakaysa?retryWrites=true&w=majority&appName=Drakaysa',
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default env; 
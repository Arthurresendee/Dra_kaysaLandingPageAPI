import mongoose from 'mongoose';
import env from './env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongodbUri);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB; 
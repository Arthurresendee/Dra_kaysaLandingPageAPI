import mongoose from 'mongoose';
import dotenv from 'dotenv';
import gridfs from '../utils/gridfs';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drakaysa');
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    // Inicializar GridFS
    gridfs.initGridFS();
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB; 
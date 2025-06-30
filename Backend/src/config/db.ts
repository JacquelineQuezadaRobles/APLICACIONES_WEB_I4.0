import mongoose from 'mongoose';

const connectDBMongo = async (): Promise<void> => {
  const mongoUri = "mongodb+srv://Jacqueline:C0ntr4s3n1@cluster0.tl1acgh.mongodb.net/";

  try {
    await mongoose.connect(mongoUri);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error en la conexión a MongoDB:", error);
  }
};

export default connectDBMongo;
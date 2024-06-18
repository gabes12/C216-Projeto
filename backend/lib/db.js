import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect("mongodb://host.docker.internal:27017/projeto_c216");
    console.log("MongoDB conectado com sucesso");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

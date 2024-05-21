import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    const a = 10;
    app.listen(config.port, () => {
      console.log(`my app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
import { Server } from "./server";
import { config } from "./config";
import { DBHandler } from "./utils/dbHandler";

process.on("uncaughtException", console.error);

(async () => {
  try {
    await DBHandler.connect(config.db.uri);
    const server: Server = new Server(config.server);

    server.app.on("close", async () => {
      console.log("Server closed");
      await DBHandler.disconnect();
    });
  } catch (error) {
    console.error(error);
  }
})();

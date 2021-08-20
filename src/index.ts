import app from "./app";
import { DataBase } from "./database";

const db: DataBase = new DataBase();

async function main() {
    await db.CreateDbConnection();
    await app.listen(app.get("port"));
    console.log("Server Listening on Port:", app.get("port"));
}

main();
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as url from "url";
import * as path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
    synchronize: false,
    logging: true,
    entities: [],
    migrations: [path.join(__dirname, "migration", "*.js")],
    subscribers: [],
});

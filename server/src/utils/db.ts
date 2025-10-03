import * as dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import * as models from "../models";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "shotstock_user",
    password: process.env.DB_PASS || "shotstock_pass",
    database: process.env.DB_NAME || "shotstock",
    entities: [
        models.AmmoType,
        models.AmmoTypeAlias,
        models.BulletType,
        models.CommercialCartridge,
        models.Manufacturer,
        models.Session,
        models.User,
    ],
    synchronize: true, // Dev only
    ssl: { rejectUnauthorized: false },
});

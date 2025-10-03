import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { AppDataSource } from "./utils/db";
import {
    AmmoType,
    AmmoTypeAlias,
    CommercialCartridge,
    Manufacturer,
} from "./models";
import { Context } from "./graphql/context";

dotenv.config();

async function startServer() {
    await AppDataSource.initialize()
        .then(() => console.log("Database connected."))
        .catch((err) => console.error("Database connection error:", err));

    const server = new ApolloServer<Context>({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: Number(process.env.API_PORT) || 4000 },
        context: async () => ({
            dataSource: AppDataSource,
            manufacturerRepository: AppDataSource.getRepository(Manufacturer),
            ammoTypeRepository: AppDataSource.getRepository(AmmoType),
            ammoTypeAliasRepository: AppDataSource.getRepository(AmmoTypeAlias),
            commercialCartridgeRepository:
                AppDataSource.getRepository(CommercialCartridge),
        }),
    });

    console.log(`Server running at ${url}`);
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

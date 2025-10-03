import { AppDataSource } from "../utils/db";
import * as models from "../models";

export const resolvers = {
    // TODO: Rename these because there will be other queries on these same models
    Query: {
        ammoTypes: async () => {
            return await AppDataSource.getRepository(models.AmmoType).find({
                relations: ["aliases", "cartridges"],
            });
        },
        commercialCartridges: async () => {
            return await AppDataSource.getRepository(models.CommercialCartridge)
                .createQueryBuilder("cartridge")
                .leftJoinAndSelect("cartridge.manufacturer", "manufacturer")
                .leftJoinAndSelect("cartridge.ammoType", "ammoType")
                .leftJoinAndSelect("cartridge.bulletType", "bulletType")
                .orderBy("manufacturer.name", "ASC")
                .addOrderBy("cartridge.productLine", "ASC")
                .getMany();
        },
    },
};

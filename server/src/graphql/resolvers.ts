import { AppDataSource } from "../utils/db";
import * as models from "../models";

interface FilterValues {
    manufacturer?: string;
    productLine?: string;
    ammoType?: string;
    bulletType?: string;
    bulletWeight?: number;
    caseMaterial?: string;
}

export const resolvers = {
    Query: {
        ammoTypes: async () => {
            return await AppDataSource.getRepository(models.AmmoType).find({
                relations: ["aliases", "cartridges"],
            });
        },
        commercialCartridges: async () => {
            const repo = AppDataSource.getRepository(
                models.CommercialCartridge
            );
            return repo.find({
                relations: ["ammoType", "manufacturer", "bulletType"],
                order: {
                    manufacturer: { name: "ASC" },
                    productLine: "ASC",
                },
            });
        },
        filteredCommercialCartridges: async (_: any, args: FilterValues) => {
            const repo = AppDataSource.getRepository(
                models.CommercialCartridge
            );
            let query = repo
                .createQueryBuilder("cartridge")
                .leftJoinAndSelect("cartridge.ammoType", "ammoType")
                .leftJoinAndSelect("cartridge.manufacturer", "manufacturer")
                .leftJoinAndSelect("cartridge.bulletType", "bulletType");

            if (args.manufacturer) {
                query = query.andWhere("manufacturer.name LIKE :manufacturer", {
                    manufacturer: `%${args.manufacturer}%`,
                });
            }

            if (args.productLine) {
                query = query.andWhere(
                    "cartridge.productLine LIKE :productLine",
                    { productLine: `%${args.productLine}%` }
                );
            }

            if (args.ammoType) {
                query = query.andWhere("ammoType.name = :ammoType", {
                    ammoType: args.ammoType,
                });
            }

            if (args.bulletType) {
                query = query.andWhere("bulletType.name = :bulletType", {
                    bulletType: args.bulletType,
                });
            }

            if (args.bulletWeight) {
                query = query.andWhere(
                    "cartridge.bulletWeight = :bulletWeight",
                    { bulletWeight: args.bulletWeight }
                );
            }

            if (args.caseMaterial) {
                query = query.andWhere(
                    "cartridge.caseMaterial = :caseMaterial",
                    { caseMaterial: args.caseMaterial }
                );
            }

            const results = await query.getMany();
            return results;
        },
    },
};

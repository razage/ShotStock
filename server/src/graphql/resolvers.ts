import { AppDataSource } from "../utils/db";
import * as models from "../models";
import { type FilterValues } from "../types/resolvers";

export const resolvers = {
    Query: {
        filterOptions: async () => {
            const manufacturers = await AppDataSource.createQueryBuilder(
                models.CommercialCartridge,
                "cartridge"
            )
                .leftJoin("cartridge.manufacturer", "manufacturer")
                .select("DISTINCT manufacturer.name", "name")
                .orderBy("manufacturer.name", "ASC")
                .getRawMany()
                .then((results) => results.map((r) => r.name));

            const ammoTypes = await AppDataSource.createQueryBuilder(
                models.CommercialCartridge,
                "cartridge"
            )
                .leftJoin("cartridge.ammoType", "ammoType")
                .select("DISTINCT ammoType.name", "name")
                .orderBy("ammoType.name", "ASC")
                .getRawMany()
                .then((results) => results.map((r) => r.name));

            const bulletTypes = await AppDataSource.createQueryBuilder(
                models.CommercialCartridge,
                "cartridge"
            )
                .leftJoin("cartridge.bulletType", "bulletType")
                .select("DISTINCT bulletType.name", "name")
                .orderBy("bulletType.name", "ASC")
                .getRawMany()
                .then((results) => results.map((r) => r.name));

            const output = { manufacturers, ammoTypes, bulletTypes };
            return output;
        },

        ammoTypes: async () => {
            return await AppDataSource.getRepository(models.AmmoType).find({
                relations: ["aliases", "cartridges"],
            });
        },

        bulletTypes: async () => {
            return await AppDataSource.getRepository(models.BulletType).find({
                order: {
                    name: "ASC",
                },
            });
        },

        commercialCartridges: async (_: any, args: any) => {
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

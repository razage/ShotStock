import { DataSource, Repository } from "typeorm";
import {
    Manufacturer,
    AmmoType,
    AmmoTypeAlias,
    CommercialCartridge,
} from "../models";

export interface Context {
    dataSource: DataSource;
    manufacturerRepository: Repository<Manufacturer>;
    ammoTypeRepository: Repository<AmmoType>;
    ammoTypeAliasRepository: Repository<AmmoTypeAlias>;
    commercialCartridgeRepository: Repository<CommercialCartridge>;
}

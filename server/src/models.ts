import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";

// All the tables need an id column. Why repeat myself?
abstract class BaseTable {
    @PrimaryGeneratedColumn()
    id!: number;
}

@Entity("manufacturers")
export class Manufacturer extends BaseTable {
    @Column("varchar", { length: 64, unique: true })
    name!: string;

    @OneToMany(
        () => CommercialCartridge,
        (commercialCartridge) => commercialCartridge.manufacturer
    )
    commercialCartridges?: CommercialCartridge[];
}

@Entity("ammo_types")
export class AmmoType extends BaseTable {
    @Column()
    name!: string;

    @OneToMany(() => AmmoTypeAlias, (ammoTypeAlias) => ammoTypeAlias.parent)
    aliases?: AmmoTypeAlias[];

    @OneToMany(() => CommercialCartridge, (cartridge) => cartridge.ammoType, {
        nullable: true,
    })
    cartridges?: CommercialCartridge[];
}

@Entity("ammo_type_aliases")
export class AmmoTypeAlias extends BaseTable {
    @ManyToOne(() => AmmoType, (ammoType) => ammoType.aliases, {
        nullable: false,
        onDelete: "CASCADE",
    })
    parent!: AmmoType;

    @Column()
    alias!: string;
}

@Entity("commercial_cartridges")
export class CommercialCartridge extends BaseTable {
    @Column("varchar", { length: 64, nullable: true })
    name?: string;

    @Column("varchar", { length: 64 })
    bulletType!: string;

    @Column("int")
    bulletWeight!: number;

    @Column("varchar", { length: 16 })
    caseMaterial!: string;

    @Column({ nullable: true })
    imageURL?: string;

    // Relationship columns
    @ManyToOne(() => AmmoType, (ammoType) => ammoType.cartridges, {
        nullable: false,
        onDelete: "CASCADE",
    })
    ammoType!: AmmoType;

    @ManyToOne(
        () => Manufacturer,
        (manufacturer) => manufacturer.commercialCartridges,
        {
            nullable: false,
            onDelete: "CASCADE",
        }
    )
    manufacturer!: Manufacturer;
}

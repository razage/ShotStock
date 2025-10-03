import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
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

@Entity("bullet_types")
export class BulletType extends BaseTable {
    @Column("varchar", { length: 32 })
    name!: string;

    @Column("varchar", { length: 32, nullable: true })
    short?: string;

    @OneToMany(
        () => CommercialCartridge,
        (commercialCartridge) => commercialCartridge.bulletType
    )
    productsWithBullet?: CommercialCartridge[];
}

@Entity("commercial_cartridges")
export class CommercialCartridge extends BaseTable {
    @Column("varchar", { length: 64, nullable: true })
    productLine?: string;

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

    @ManyToOne(() => BulletType, (bt) => bt.productsWithBullet, {
        nullable: false,
        onDelete: "CASCADE",
    })
    bulletType!: BulletType;
}

// Authentication and Login System
@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { unique: true })
    email!: string;

    @Column({
        type: "enum",
        enum: ["user", "mod", "admin"],
        default: "user",
    })
    role!: "user" | "mod" | "admin";

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    lastLogin!: Date | null;
}

@Entity("sessions")
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    user_id!: string;

    @Column({ type: "timestamp" })
    expiresAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;
}

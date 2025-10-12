import { gql } from "graphql-tag";

export const typeDefs = gql`
    type Manufacturer {
        id: ID!
        name: String!
        commercialCartridges: [CommercialCartridge!]
    }

    type AmmoType {
        id: ID!
        name: String!
        aliases: [AmmoTypeAlias!]
        cartridges: [CommercialCartridge!]
    }

    type AmmoTypeAlias {
        id: ID!
        parent: AmmoType!
        alias: String!
    }

    type BulletType {
        id: ID!
        name: String!
        short: String
    }

    type CommercialCartridge {
        id: ID!
        productLine: String
        bulletType: BulletType!
        bulletWeight: Int!
        caseMaterial: String!
        ammoType: AmmoType!
        manufacturer: Manufacturer!
        imageURL: String
    }

    type FilterOptions {
        manufacturers: [String!]!
        ammoTypes: [String!]!
        bulletTypes: [String!]!
    }

    type Query {
        ammoTypes: [AmmoType!]!
        bulletTypes: [BulletType!]!
        commercialCartridges: [CommercialCartridge!]!
        filterOptions: FilterOptions!
        manufacturers: [Manufacturer!]!
        filteredCommercialCartridges(
            manufacturer: String
            productLine: String
            ammoType: String
            bulletType: String
            bulletWeight: Int
            caseMaterial: String
        ): [CommercialCartridge!]!
    }
`;

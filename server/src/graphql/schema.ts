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

    type CommercialCartridge {
        id: ID!
        name: String
        bulletType: String!
        bulletWeight: Int!
        caseMaterial: String!
        ammoType: AmmoType!
        manufacturer: Manufacturer!
        imageURL: String
    }

    type Query {
        ammoTypes: [AmmoType!]!
        commercialCartridges: [CommercialCartridge!]!
    }
`;

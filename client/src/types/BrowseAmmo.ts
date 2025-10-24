import { GraphQLError } from "graphql";

export interface FilterValues {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | "";
    caseMaterial: string;
}

export interface CommercialCartridge {
    id: number;
    productLine: string;
    bulletType: { name: string; short?: string };
    bulletWeight: number;
    caseMaterial: string;
    imageURL: string;
    ammoType: { name: string };
    manufacturer: { name: string };
}

export interface QueryData {
    commercialCartridges: CommercialCartridge[];
    filteredCommercialCartridges: CommercialCartridge[];
}

export interface QueryVariables {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | null;
    caseMaterial: string;
}

export interface ApolloError extends Error {
    message: string;
    graphQLErrors?: GraphQLError[];
}

import { useState, useMemo } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import {
    type ApolloError,
    type FilterValues,
    type QueryVariables,
    type QueryData,
} from "../types/BrowseAmmo";
import FilterForm from "../components/FilterForm";
import AmmoCard from "../components/AmmoCard";
import "../styles/BrowseAmmo.less";

const ALL_COMMERCIAL_CARTRIDGES = gql`
    query GetCommercialCartridges {
        commercialCartridges {
            id
            productLine
            bulletType {
                name
                short
            }
            bulletWeight
            caseMaterial
            imageURL
            ammoType {
                name
            }
            manufacturer {
                name
            }
        }
    }
`;

const FILTERED_CARTRIDGES = gql`
    query FilteredCartridges(
        $manufacturer: String
        $productLine: String
        $ammoType: String
        $bulletType: String
        $bulletWeight: Int
        $caseMaterial: String
    ) {
        filteredCommercialCartridges(
            manufacturer: $manufacturer
            productLine: $productLine
            ammoType: $ammoType
            bulletType: $bulletType
            bulletWeight: $bulletWeight
            caseMaterial: $caseMaterial
        ) {
            id
            productLine
            bulletType {
                name
                short
            }
            bulletWeight
            caseMaterial
            imageURL
            ammoType {
                name
            }
            manufacturer {
                name
            }
        }
    }
`;

const GET_FILTER_OPTIONS = gql`
    query GetFilterOptions {
        filterOptions {
            manufacturers
            ammoTypes
            bulletTypes
        }
    }
`;

function BrowseAmmo() {
    const [filters, setFilters] = useState<FilterValues>({
        manufacturer: "",
        productLine: "",
        ammoType: "",
        bulletType: "",
        bulletWeight: "",
        caseMaterial: "",
    });

    const hasFilters = useMemo(
        () =>
            Object.values(filters).some(
                (value) => value !== "" && value !== null
            ),
        [filters]
    );

    const queryVariables = useMemo<QueryVariables>(
        () => ({
            ...filters,
            bulletWeight: filters.bulletWeight
                ? Number(filters.bulletWeight)
                : null,
        }),
        [filters]
    );

    const {
        loading: allLoading,
        error: allError,
        data: allData,
    } = useQuery<QueryData>(ALL_COMMERCIAL_CARTRIDGES, {
        fetchPolicy: "cache-and-network",
    });

    const {
        loading: filteredLoading,
        error: filteredError,
        data: filteredData,
    } = useQuery<QueryData>(FILTERED_CARTRIDGES, {
        variables: queryVariables,
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        skip: !hasFilters,
    });

    const {
        loading: optionsLoading,
        error: optionsError,
        data: filterOptionsData,
    } = useQuery<{
        filterOptions: {
            manufacturers: string[];
            ammoTypes: string[];
            bulletTypes: string[];
        };
    }>(GET_FILTER_OPTIONS, { fetchPolicy: "cache-first" });

    const handleFilterSubmit = (values: FilterValues) => {
        setFilters((prev) => ({
            ...prev,
            ...values,
            bulletWeight:
                values.bulletWeight === ""
                    ? ""
                    : Number(values.bulletWeight) || "",
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            manufacturer: "",
            productLine: "",
            ammoType: "",
            bulletType: "",
            bulletWeight: "",
            caseMaterial: "",
        });
    };

    const caseMaterials = ["Brass", "Steel", "Aluminum", "Nickel Plated"];

    const fallbackFilterOptions = {
        manufacturers: [],
        ammoTypes: [],
        bulletTypes: [],
    };

    const loading = allLoading || filteredLoading || optionsLoading;
    const error = allError || filteredError || optionsError;
    const data = hasFilters ? filteredData : allData;
    const cartridges = hasFilters
        ? data?.filteredCommercialCartridges
        : data?.commercialCartridges;

    if (loading || optionsLoading) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress size="8rem" />
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error || optionsError) {
        console.error(
            "Query error:",
            error,
            (error as ApolloError)?.graphQLErrors
        );
        console.error(
            "Filter options error:",
            optionsError,
            (optionsError as ApolloError)?.graphQLErrors
        );
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography color="error">
                    Error:{" "}
                    {(error || optionsError)?.message || "Failed to load data"}
                </Typography>
            </Box>
        );
    }

    console.log("Cartridges to display:", cartridges);
    console.log("Data structure:", JSON.stringify(data, null, 2));

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Browse Ammo
            </Typography>
            <FilterForm
                initialValues={filters}
                onSubmit={handleFilterSubmit}
                onReset={handleResetFilters}
                filterOptions={
                    filterOptionsData?.filterOptions || fallbackFilterOptions
                }
                caseMaterials={caseMaterials}
            />
            {(!cartridges || cartridges.length === 0) && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">No results found.</Typography>
                </Box>
            )}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {cartridges?.map((ammo) => (
                    <Grid key={ammo.id} size={{ xs: 8, sm: 6, md: 4, lg: 3 }}>
                        <AmmoCard
                            id={ammo.id}
                            productLine={ammo.productLine}
                            manufacturer={ammo.manufacturer.name}
                            imageURL={ammo.imageURL}
                            ammoType={ammo.ammoType.name}
                            grainWeight={ammo.bulletWeight}
                            bulletType={ammo.bulletType}
                            caseMaterial={ammo.caseMaterial}
                        />
                    </Grid>
                ))}
            </Grid>
            {data?.commercialCartridges !== undefined && (
                <Typography fontSize="8pt" color="textSecondary" sx={{ mt: 2 }}>
                    There are {cartridges?.length || 0} cartridges in the
                    database.
                </Typography>
            )}
        </Box>
    );
}

export default BrowseAmmo;

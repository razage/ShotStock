import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
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

interface FilterValues {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | "";
    caseMaterial: string;
}

interface CommercialCartridge {
    id: number;
    productLine: string;
    bulletType: { name: string; short?: string };
    bulletWeight: number;
    caseMaterial: string;
    imageURL: string;
    ammoType: { name: string };
    manufacturer: { name: string };
}

interface QueryData {
    commercialCartridges: CommercialCartridge[];
    filteredCommercialCartridges: CommercialCartridge[];
}

function BrowseAmmo() {
    const [filters, setFilters] = useState<FilterValues>({
        manufacturer: "",
        productLine: "",
        ammoType: "",
        bulletType: "",
        bulletWeight: "",
        caseMaterial: "",
    });

    const hasFilters = Object.values(filters).some(
        (value) => value !== "" && value !== null
    );
    const { loading, error, data } = useQuery<QueryData>(
        hasFilters ? FILTERED_CARTRIDGES : ALL_COMMERCIAL_CARTRIDGES,
        {
            variables: {
                ...filters,
                bulletWeight: filters.bulletWeight
                    ? Number(filters.bulletWeight)
                    : null,
            },
            fetchPolicy: "network-only",
        }
    );

    const handleFilterSubmit = (values: FilterValues) => {
        setFilters(values);
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress size="8rem" />
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        console.error("Query error:", error);
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography color="error">Error: {error.message}</Typography>
            </Box>
        );
    }

    const cartridges = hasFilters
        ? data?.filteredCommercialCartridges
        : data?.commercialCartridges;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Browse Ammo
            </Typography>
            <FilterForm initialValues={filters} onSubmit={handleFilterSubmit} />
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

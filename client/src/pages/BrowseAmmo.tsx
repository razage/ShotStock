import "../styles/BrowseAmmo.less";
import AmmoCard from "../components/AmmoCard";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const allCommercialCartridges = gql`
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

interface CommercialCartridge {
    id: number;
    productLine: string;
    bulletType: { name: string; short?: string };
    bulletWeight: number;
    caseMaterial: string;
    ammoType: { name: string };
    manufacturer: { name: string };
    imageURL: string;
}

interface QueryData {
    commercialCartridges: CommercialCartridge[];
}

function BrowseAmmo() {
    const { loading, error, data } = useQuery<QueryData>(
        allCommercialCartridges
    );

    if (loading)
        return (
            <div>
                <CircularProgress size="8rem" />
                <Typography>Loading...</Typography>
            </div>
        );
    if (error)
        return (
            <div>
                <Typography color="error">Error: {error.message}</Typography>
            </div>
        );
    return (
        <div>
            <Grid container spacing={2} sx={{ p: 2 }}>
                {data?.commercialCartridges.map((ammo) => (
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
                        ></AmmoCard>
                    </Grid>
                ))}
            </Grid>
            <Typography fontSize="8pt" color="textSecondary">
                There are {data?.commercialCartridges.length} cartridges in the
                database.
            </Typography>
        </div>
    );
}

export default BrowseAmmo;

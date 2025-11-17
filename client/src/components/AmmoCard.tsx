import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Tooltip from "@mui/material/Tooltip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    Paper,
    IconButton,
} from "@mui/material";
import type { CommercialCartridge } from "../types/BrowseAmmo";
import { useCart } from "../hooks/useCart";

function AmmoCard(props: CommercialCartridge) {
    const { addToCart } = useCart();
    return (
        <Card className="ammo-card">
            <CardHeader
                title={props.manufacturer.name}
                subheader={props.productLine}
            />
            {props.imageURL ? (
                <CardMedia
                    component="img"
                    image={props.imageURL}
                    alt={props.productLine}
                />
            ) : (
                <QuestionMarkIcon className="missing-image" />
            )}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table className="ammo-info">
                        <TableBody>
                            <TableRow>
                                <TableCell>Ammo Type</TableCell>
                                <TableCell>{props.ammoType.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bullet Type</TableCell>
                                <TableCell>
                                    {props.bulletType.short ? (
                                        <>
                                            <Tooltip
                                                title={props.bulletType.name}
                                            >
                                                <div className="shorthand">
                                                    {props.bulletType.short}
                                                </div>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        props.bulletType.name
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bullet Weight</TableCell>
                                <TableCell>{props.bulletWeight}gr</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Case Material</TableCell>
                                <TableCell>{props.caseMaterial}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                <IconButton
                    color="success"
                    onClick={() =>
                        addToCart(props.id, 1, {
                            primary: `${props.manufacturer.name} ${props.ammoType.name}`,
                            secondary: [
                                props.productLine?.trim(),
                                props.bulletWeight && `${props.bulletWeight}gr`,
                                props.bulletType.short ?? props.bulletType.name,
                            ]
                                .filter(Boolean)
                                .join(" • "),
                        })
                    }
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default AmmoCard;

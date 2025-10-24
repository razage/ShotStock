import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Tooltip from "@mui/material/Tooltip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
    Button,
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    Paper,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import type { CommercialCartridge } from "../types/BrowseAmmo";

function AmmoCard(props: CommercialCartridge) {
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
                                <TableCell>{props.bulletWeight}</TableCell>
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
                <Button size="small" color="success">
                    <Icon color="success">add_circle</Icon>&nbsp;Add
                </Button>
            </CardActions>
        </Card>
    );
}

export default AmmoCard;

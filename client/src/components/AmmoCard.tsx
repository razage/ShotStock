import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
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

interface IAmmoCardData {
    id: number;
    name: string;
    manufacturer: string;
    ammoType: string;
    grainWeight: number;
    bulletType: string;
    caseMaterial: string;
    imageURL: string;
}

function AmmoCard(props: IAmmoCardData) {
    return (
        <Card className="ammoCard">
            <CardActionArea>
                <CardHeader
                    title={props.manufacturer}
                    subheader={props.name}
                ></CardHeader>
                <CardMedia
                    component="img"
                    height="100"
                    image={props.imageURL}
                    alt={props.name}
                    sx={{ objectFit: "contain", objectPosition: "center" }}
                ></CardMedia>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#90caf9",
                                        }}
                                    >
                                        Ammo Type
                                    </TableCell>
                                    <TableCell>{props.ammoType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#90caf9",
                                        }}
                                    >
                                        Bullet Type
                                    </TableCell>
                                    <TableCell>{props.bulletType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#90caf9",
                                        }}
                                    >
                                        Bullet Weight
                                    </TableCell>
                                    <TableCell>{props.grainWeight}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#90caf9",
                                        }}
                                    >
                                        Case Material
                                    </TableCell>
                                    <TableCell>{props.caseMaterial}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="success">
                    <Icon color="success">add_circle</Icon>&nbsp;Add
                </Button>
            </CardActions>
        </Card>
    );
}

export default AmmoCard;

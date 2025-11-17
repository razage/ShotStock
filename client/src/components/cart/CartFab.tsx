import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Fab, Badge } from "@mui/material";
import CartDrawer from "@components/cart/CartDrawer";
import "@styles/Cart.less";

function CartFab() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Fab
                color="primary"
                aria-label="inventory"
                className="inventory-fab"
                onClick={() => setOpen(true)}
            >
                <Badge color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>
            <CartDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}

export default CartFab;

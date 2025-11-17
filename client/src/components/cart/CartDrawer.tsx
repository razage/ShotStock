import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../hooks/useCart";

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { items, removeFromCart, clearCart, checkout } = useCart();
    const handleCheckout = () => {
        checkout();
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: "100vw", sm: 420 },
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                {/* Header */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6">Cart</Typography>
                    <IconButton onClick={onClose} size="large">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Empty State */}
                {items.length === 0 ? (
                    <Box
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography color="text.secondary">
                            Your cart is empty
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {/* Cart Items */}
                        <List sx={{ flexGrow: 1, overflow: "auto" }}>
                            {items.map((item) => (
                                <ListItem
                                    key={item.cartridgeId}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="remove"
                                            onClick={() =>
                                                removeFromCart(item.cartridgeId)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                    sx={{ pr: 6 }} // make room for secondary action
                                >
                                    <ListItemText
                                        primary={item.display.primary}
                                        secondary={item.display.secondary}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        ml={2}
                                    >
                                        ×{item.quantity}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>

                        {/* Action Buttons */}
                        <Box
                            mt={2}
                            gap={1}
                            display="flex"
                            flexDirection="column"
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                fullWidth
                                onClick={handleCheckout}
                            >
                                Checkout to Inventory
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
}

export default CartDrawer;

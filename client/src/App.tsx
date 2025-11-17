import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router";
import { Typography } from "@mui/material";
import NavBar from "@components/Navbar";
import CartFab from "@components/cart/CartFab";
import BrowseAmmo from "@pages/BrowseAmmo";
import "@styles/App.less";
import Inventory from "@pages/Inventory";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <NavBar />

            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/ammo" element={<BrowseAmmo />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="*" element={<Typography>Not Found</Typography>} />
            </Routes>
            <CartFab />
        </ThemeProvider>
    );
}

export default App;

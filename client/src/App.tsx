import "./styles/App.less";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router";
import BrowseAmmo from "./pages/BrowseAmmo";
import { Typography } from "@mui/material";

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
                <Route path="*" element={<Typography>Not Found</Typography>} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;

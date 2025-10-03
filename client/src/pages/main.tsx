import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { client } from "../apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router";
import App from "../App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>
);

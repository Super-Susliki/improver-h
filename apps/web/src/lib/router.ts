import { createBrowserRouter } from "react-router";
import { DefaultLayout } from "../layouts/default-layout";
import { HomePage } from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: DefaultLayout,
        children: [
            {
                path: '/',
                Component: HomePage
            }
        ]
    }
]);
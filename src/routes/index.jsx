import { BrowserRouter, Routes, Route } from "react-router";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

export default function RoutesIndex(){
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductListPage/>} />
            <Route path="/product/:id" element={<ProductDetailsPage/>} />
        </Routes>
    </BrowserRouter>);
}
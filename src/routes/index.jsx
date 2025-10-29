import { BrowserRouter, Routes, Route } from "react-router";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Header from "../components/Header";
import { CartProvider } from "../context/CartContext";

export default function RoutesIndex(){
    return (
        <BrowserRouter>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductListPage/>} />
                    <Route path="/product/:id" element={<ProductDetailsPage/>} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
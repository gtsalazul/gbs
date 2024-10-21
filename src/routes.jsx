import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { Header } from "./components/Header/Header";
import { Error } from "./components/Error/Error";
import { Favoritos } from "./pages/Favoritos/Favoritos";

export const RoutesApp = () => {
    return ( 
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
     );
}
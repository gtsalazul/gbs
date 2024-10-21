import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { Header } from "./components/Header/Header";
import { Error } from "./components/Error/Error";
import { Favoritos } from "./pages/Favoritos/Favoritos";

export const RoutesApp = () => {
    return ( 
        // para definir a navegação na aplicação, permitindo que as URLs sejam interpretadas pelo React Router
        <BrowserRouter> 
        <Header />
        {/* que define as diferentes rotas da aplicação */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/favoritos" element={<Favoritos />} />
                {/* para capturar qualquer caminho não especificado */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
     );
}
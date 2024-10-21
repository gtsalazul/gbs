import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

export const Home = () => {
    // useState() inicializa products como um array vazio.
    const [products, setProducts] = useState([]);
    
    // useEffect() carrega a lista de produtos ao montar o componente.
    useEffect(() => {
        // A função loadProducts() faz uma requisição à API para obter os produtos e atualiza o estado com os 15 primeiros produtos retornados.
        async function loadProducts() {
            const response = await api.get("products/");
            setProducts(response.data.products.slice(0, 15));
        }
        loadProducts();
    }, []);

    return ( 
        <div className="container">
            <div className="lista-products">
            {/* Mapeia os produtos armazenados em products para exibir cada um com imagem, título, preço e um link que direciona para a página de detalhes do produto. */}
                {products.map((product) => {
                    return (
                        <div key={product.id} className="product">
                            <img src={product.thumbnail} alt={product.brand} />
                            <h3>{product.title}</h3>
                            <Link to={`product/${product.id}`}>Acessar</Link>
                            <span>R$ {product.price}</span>
                        </div>
                    );
                })}
            </div>
        </div>
     );
}
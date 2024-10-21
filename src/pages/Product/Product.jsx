import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "./product.css";

export const Product = () => {
    // useParams() é utilizado para acessar o id do produto passado na URL.
    const { id } = useParams();
    // useNavigate() é usado para redirecionar o usuário para outras páginas.
    const navigate = useNavigate()
    // useState() inicializa o estado product como um objeto vazio, que será atualizado com os dados do produto.
    const [product, setProduct] = useState({});

    // useEffect() carrega o produto assim que o componente é montado ou quando o id ou navigate mudam.
    useEffect(() => {
        async function loadProduct() {
            // faz uma requisição assíncrona à API para obter os detalhes do produto pelo id.
            await api.get(`products/${id}`)
            .then((response) => {
                // Em caso de sucesso, setProduct atualiza o estado com os dados do produto.
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Produto não encontrado", error);
                // Em caso de erro, exibe uma mensagem de erro e redireciona o usuário de volta à página inicial
                navigate("/", { replace: true });
                return;
            });
        }

        loadProduct();
    }, [navigate, id]);

    // salvarProduto() armazena o produto no localStorage se ele ainda não foi salvo.
    function salvarProduto() {
        const minhaLista = localStorage.getItem("@produtos");
        let produtosSalvos = JSON.parse(minhaLista) || [];
        // Verifica se o produto já está salvo utilizando some().
        const hasProduct = produtosSalvos.some((produto) => produto.id === product.id);
        if(hasProduct) {
            toast.error("Este produto já foi salvo");
            return;
        }
        // Caso não esteja, o produto é adicionado à lista e salvo novamente no localStorage.
        produtosSalvos.push(product);
        localStorage.setItem("@produtos", JSON.stringify(produtosSalvos));
        // alert("Produto salvo com sucesso");
        toast.success("Produto salvo com sucesso");
    }

    return ( 
        // Exibe as informações do produto, incluindo título, imagem e descrição.
        <div className="produto-info">
            <h1>{product.title}</h1>
            <img src={product.thumbnail} alt={product.brand} />
            <p>{product.description}</p>

            {/* botões para salvar o produto e um link que busca mais informações sobre o produto no Google. */}
            <div className="area-buttons">
                <button onClick={salvarProduto}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`http://google.com/search?q=${product.title}`}>
                    Mais na internet
                    </a>
                </button>
            </div>
        </div>
     );
}
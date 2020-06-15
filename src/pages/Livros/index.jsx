import React, { useState, useEffect } from "react";
import api from "../../services/api";
import RelatorioModal from "./RelatorioModal";
import FormModal from "./FormModal";
import { getSession } from "../../services/auth";
import Tabela from "../../components/Tabela";
import Coluna from "../../components/Coluna";

const Livros = () => {
    const [livros, setLivros] = useState([]);
    const [livrosFiltrados, setLivrosFiltrados] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState({});

    useEffect(() => {
        const requisicao = async () => {
            const token = getSession();
            await api.get("livros", {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }).then(response => {
                setLivros(response.data);
                setLivrosFiltrados(response.data);
            });
        }

        requisicao();
    }, []);

    const handleChangePesquisa = event => {
        const filtroLivros = livros.filter((livro) => {
            return livro.nome.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setPesquisa(event.target.value);

        setLivrosFiltrados(filtroLivros);
    }

    const handleShow = (livro = {}) => {
        setLivroSelecionado(livro);

        setShow(!show);
    }

    const handleRemover = (id) => {
        console.log("OK", id);
    }

    const renderOpcoes = (item) => {
        return (
            <>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleShow(item)}>Editar</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleRemover(item.id_livro)}>Remover</button>
            </>
        )
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav mr-auto">
                    <button className="btn btn-info" onClick={() => setShowRelatorio(!showRelatorio)}>Gerar Relatório</button>
                </ul>

                <input
                    className="form-control col-md-5"
                    type="text"
                    placeholder="Pesquisar..."
                    value={pesquisa}
                    onChange={handleChangePesquisa}
                />
            </nav>
            <div className="mx-2 pb-5">
                <div className="card overflow-auto align-items-center" style={{ height: "80vh" }}>
                    <div className="row col-12">
                        <Tabela data={livrosFiltrados} titulo="Livos" mostrarBotaoNovo={true} tituloBotao="Novo livro" handleShow={handleShow}>
                            <Coluna campo="id_livro" titulo="#" tamanho="1" />
                            <Coluna campo="nome" titulo="Nome" tamanho="10" />
                            <Coluna campo="autor" titulo="Autor" tamanho="10" />
                            <Coluna campo="quantidade" titulo="Quantidade" tamanho="3" />
                            <Coluna campo="tipo" titulo="Tipo" tamanho="3" corpo={(item) => item.tipo === 1 ? "Normal" : "Engenharia"} />
                            <Coluna titulo="Opções" corpo={(item) => renderOpcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal show={show} handleShow={handleShow} data={livroSelecionado} />
            <RelatorioModal show={showRelatorio} handleShow={() => setShowRelatorio(!showRelatorio)} />
        </>
    )
}

export default Livros;
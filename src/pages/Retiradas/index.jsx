import React, { useState, useEffect } from "react";
import api from "../../services/api";
import FormModal from "./FormModal";
import RelatorioModal from "./RelatorioModal";
import { getSession } from "../../services/auth";
import Tabela from "../../components/Tabela";
import Coluna from "../../components/Coluna";

const Retiradas = () => {
    const [retiradas, setRetiradas] = useState([]);
    const [retiradasFiltradas, setRetiradasFiltradas] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);
    const [retiradaSelecionada, setRetiradaSelecionada] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [className, setClassName] = useState("");

    useEffect(() => {
        const requisicao = async () => {
            const token = getSession();
            await api.get("retiradas", {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }).then(response => {
                setRetiradas(response.data);
                setRetiradasFiltradas(response.data);
            });
        }

        requisicao();
    }, [show]);

    const handleChangePesquisa = event => {
        const filtroRetiradas = retiradas.filter((retirada) => {
            return retirada.nome.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setPesquisa(event.target.value);

        setRetiradasFiltradas(filtroRetiradas);
    }

    const handleShow = (retirada = {}) => {
        setRetiradaSelecionada(retirada);

        setShow(!show);
    }

    const handleRemover = async (id) => {
        const token = getSession();
        await api.delete("retiradas/" + id, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }).then(response => {
            if (response.data.error) {
                setMensagem(response.data.error);
                setClassName("bg-danger");
            } else {
                setMensagem("Retirada removida com sucesso!");
                setClassName("bg-success");
                setRetiradas(response.data);
                setRetiradasFiltradas(response.data);
            }

        });

        setTimeout(() => {
            setMensagem("");
        }, 5000);
    }

    const renderOpcoes = (item) => {
        return (
            <>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleShow(item)}>Editar</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleRemover(item.id_retirada)}>Remover</button>
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
                <div className="card align-items-center" style={{ height: "76vh" }}>
                    <div className="col-12">
                        <Tabela
                            data={retiradasFiltradas}
                            titulo="Retiradas"
                            mostrarBotaoNovo={true}
                            tituloBotao="Nova retirada"
                            handleShow={handleShow}
                        >
                            <Coluna campo="id_retirada" titulo="#" tamanho="1" />
                            <Coluna campo="ra" titulo="RA" tamanho="2" />
                            <Coluna campo="nome" titulo="Nome" tamanho="7" />
                            <Coluna campo="curso" titulo="Curso" tamanho="2" />
                            <Coluna campo="semestre" titulo="Semestre" tamanho="2" />
                            <Coluna campo="livro" titulo="Livro" tamanho="7" />
                            <Coluna titulo="Opções" corpo={(item) => renderOpcoes(item)} tamanho="5" />
                        </Tabela>
                        {mensagem &&
                            <div className={className + " d-flex justify-content-center align-items-center rounded w-50"} style={{ maxHeight: "10vh" }}>
                                <p className="text-white" style={{ fontSize: 20 }}>
                                    {mensagem}
                                </p>
                            </div>}
                    </div>
                </div>
            </div>
            <FormModal show={show} handleShow={handleShow} data={retiradaSelecionada} />
            <RelatorioModal show={showRelatorio} handleShow={() => setShowRelatorio(!showRelatorio)} />
        </>
    )
}

export default Retiradas;
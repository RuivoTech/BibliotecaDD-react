import React, { useState, useEffect } from "react";
import api from "../../services/api";
import FormModal from "./FormModal";
import RelatorioModal from "./RelatorioModal";
import { getSession } from "../../services/auth";
import Tabela from "../../components/Tabela";
import Coluna from "../../components/Coluna";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [show, setShow] = useState(false);
    const [showRelatorio, setShowRelatorio] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});

    useEffect(() => {
        const requisicao = async () => {
            const token = getSession();
            await api.get("usuarios", {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }).then(response => {
                setUsuarios(response.data);
                setUsuariosFiltrados(response.data);
            });
        }

        requisicao();
    }, []);

    const handleChangePesquisa = event => {
        const filtroUsuarios = usuarios.filter((usuario) => {
            return usuario.nome.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setPesquisa(event.target.value);

        setUsuariosFiltrados(filtroUsuarios);
    }

    const handleShow = (usuario = {}) => {
        setUsuarioSelecionado(usuario);

        setShow(!show);
    }

    const handleRemover = (id) => {
        console.log("OK", id);
    }

    const renderOpcoes = (item) => {
        return (
            <>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleShow(item)}>Editar</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleRemover(item.id)}>Remover</button>
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
                <div className="card align-items-center" style={{ height: "80vh" }}>
                    <div className="row col-12">

                        <Tabela data={usuariosFiltrados} titulo="Usuários" mostrarBotaoNovo={true} tituloBotao="Novo usuário" handleShow={handleShow}>
                            <Coluna campo="id" titulo="#" tamanho="1" />
                            <Coluna campo="nome" titulo="Nome" tamanho="10" />
                            <Coluna campo="nomeUsuario" titulo="Nome de usuário" tamanho="10" />
                            <Coluna campo="email" titulo="E-mail" tamanho="10" />
                            <Coluna campo="nivel" titulo="Nivel" tamanho="3" corpo={(item) => item.nivel === 1 ? "Normal" : "Admin"} />
                            <Coluna titulo="Opções" corpo={(item) => renderOpcoes(item)} tamanho="5" />
                        </Tabela>
                    </div>
                </div>
            </div>
            <FormModal show={show} handleShow={handleShow} data={usuarioSelecionado} />
            <RelatorioModal show={showRelatorio} handleShow={() => setShowRelatorio(!showRelatorio)} />
        </>
    )
}

export default Usuarios;
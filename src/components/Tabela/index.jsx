import React, { useState, useEffect } from "react";
import "./styles.css";

const Tabela = ({ titulo, tituloBotao, mostrarBotaoNovo, data, handleShow, height, corLinha, children = [] }) => {
    const [items, setItems] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [contador, setContador] = useState(0);
    const [delimitador, setDelimitador] = useState(1);
    const [limiteItems, setLimiteItems] = useState(20);
    const [totalPaginas, setTotalPaginas] = useState([]);

    useEffect(() => {
        const retorno = () => {
            const paginas = Math.ceil(data.length / limiteItems);
            let numeroPaginas = [];

            for (let index = 1; index <= paginas; index++) {
                numeroPaginas.push(index);
            }

            setTotalPaginas(numeroPaginas);
        }

        retorno();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const renderValor = (campo, item) => {
        const [grupo, subGrupo] = campo.split(".");
        let retorno = "";

        if (subGrupo) {
            retorno = item[grupo][subGrupo];
        } else {
            retorno = item[campo];
        }

        return retorno;
    }

    useEffect(() => {
        const listarItems = () => {
            let count = (paginaAtual * limiteItems) - limiteItems;
            let delimiter = (count + limiteItems);
            let resultado = [];

            for (let i = count; i < delimiter; i++) {
                if (data[i] != null) {
                    resultado.push(data[i]);
                }
                count++;
            }

            setContador((paginaAtual * limiteItems) - limiteItems + 1, setDelimitador(delimiter));

            setItems(resultado);
        }

        listarItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginaAtual, totalPaginas]);

    return (
        <>
            <div className="ibox float-e-margins mb-0">
                <div className="ibox-title">
                    <h5 className="pt">{titulo}</h5>
                    <div className="ibox-tools">
                        {mostrarBotaoNovo ?
                            <div className="button-group">
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    title={tituloBotao}
                                    onClick={() => handleShow({})}>
                                    {tituloBotao}
                                </button>&nbsp;
                        </div> : null}
                    </div>
                </div>
                <div className="ibox-content">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper">
                            <div className="overflow-auto" style={height}>
                                <table className="table table-sm table-striped table-hover" style={{ maxHeight: "32em" }}>
                                    <thead className="thead-light">
                                        <tr role="row">
                                            {children.map((child) => {
                                                return (<td key={child.props.titulo} style={{ width: child.props.tamanho + "em" }}>{child.props.titulo}</td>)
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {items?.map((item, index) => {
                                            return (
                                                <tr role="row" key={index} className={corLinha ? corLinha(item) : null}>
                                                    {React.Children.map(children, child => {
                                                        const valor = child.props.corpo ? child.props.corpo(item) : renderValor(child.props.campo, item);

                                                        return React.cloneElement(child, {
                                                            valor,
                                                            className: child.props.className
                                                        })
                                                    })}
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            <div className="dataTables_info pull-left pt-3">
                                Exibindo de {contador} a {delimitador > data ? data.length : delimitador} / Total {data.length}
                            </div>
                            <div className="dataTables_paginate paging_simple_numbers pull-right pt-3">
                                <ul className="pagination justify-content-end mb-0">
                                    <li className={paginaAtual === 1 ? "page-item disabled" : "page-item"}>
                                        <button className="page-link" onClick={() => setPaginaAtual(paginaAtual - 1)}>Anterior</button>
                                    </li>
                                    {totalPaginas.map((pagina) => {
                                        return (
                                            <li key={pagina} className={paginaAtual === pagina ? "page-item active" : "page-item"}>
                                                <button className="page-link" onClick={() => setPaginaAtual(pagina)}>{pagina}</button>
                                            </li>
                                        )
                                    })}
                                    <li className={paginaAtual === totalPaginas[totalPaginas.length - 1] ? "page-item disabled" : "page-item"}>
                                        <button className="page-link" onClick={() => setPaginaAtual(paginaAtual + 1)}>Próxima</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabela;
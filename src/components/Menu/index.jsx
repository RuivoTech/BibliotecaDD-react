import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";

import Logo from "../../assets/Logo.png";
import { AuthContext } from "../../context";
import { getSession } from "../../services/auth";
import { rotas } from "../../services/rotas";

const Menu = () => {
    const { signOut } = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    const [usuario, setUsuario] = useState({});
    const [nivel, setNivel] = useState("normal");

    const sair = () => {
        signOut();

        history.push("/");
    }

    useEffect(() => {
        const response = getSession();

        const token = jwt.decode(response.token);

        setUsuario(token);
    }, [])

    useEffect(() => {
        const session = getSession();
        const token = jwt.decode(session.token);
        const level = token.nivel === 2 ? "admin" : "normal";
        console.log(level)
        setNivel(level)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <>
            <nav className="navbar navbar-light bg-light navbar-expand-sm">
                <Link className="navbar-brand" to="/dashboard">
                    <img src={Logo} alt="Biblioteca DD" height="45" width="90" />
                </Link>
                <ul className="navbar-nav mr-auto">
                    {rotas[nivel].includes("/livros") ?
                        <li className="nav-item dropdown">
                            <Link className="dropdown-item" to="/livros">Livros</Link>
                        </li> : null}
                    {rotas[nivel].includes("/retiradas") ?
                        <li className="nav-item">
                            <Link className="dropdown-item" to="/retiradas">Retiradas</Link>
                        </li> : null}
                    {rotas[nivel].includes("/usuarios") ?
                        <li className="nav-item">
                            <Link className="dropdown-item" to="/usuarios">Usuários</Link>
                        </li> : null}
                </ul>
                <ul className="navbar-nav ml-auto nav-flex-icons">
                    <li className="nav-item avatar">
                        <span>{usuario.nome}</span>
                        <button className="btn btn-danger ml-2 px-3" onClick={sair}>
                            Sair
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Menu;
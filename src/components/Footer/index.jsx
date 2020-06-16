import React from "react";
import package from "../../../package.json";

const Footer = () => {
    return (
        <footer className="fixed-bottom bg-white" style={{ height: "5vh" }}>
            <p className="h6 text-center">
                Todos os direitos reservados {" "}
                <a target="_blank" href="https://github.com/RuivoTech">
                    RuivoTech
                </a>
                <span className="h6 text-secondary">Versão {package.version}</span>
            </p>

        </footer>
    )
}

export default Footer;
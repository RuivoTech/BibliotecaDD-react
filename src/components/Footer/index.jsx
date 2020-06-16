import React from "react";
import packageJSON from "../../../package.json";

const Footer = () => {
    return (
        <footer className="fixed-bottom bg-white" style={{ height: "5vh" }}>
            <p className="h6 text-center">
                Todos os direitos reservados {" "}
                <a target="_blank" href="https://github.com/RuivoTech">
                    RuivoTech
                </a><br />
                <span className="h6 text-secondary">Versão {packageJSON.version}</span>
            </p>

        </footer>
    )
}

export default Footer;
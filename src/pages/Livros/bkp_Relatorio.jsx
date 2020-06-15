import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Documento from "./Documento";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { getSession } from "../../services/auth";

const Relatorio = () => {
    const [dados, setDados] = useState([]);
    const { param } = useParams();

    useEffect(() => {
        const request = async () => {
            const session = getSession();
            const response = await api.get("relatorioLivros", {
                params: {
                    tipo: param
                },
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            })

            if (response.data.error) {
                return;
            }

            setDados(response.data);
        }

        request();
    }, []);

    return (
        <PDFViewer width="100%" height="100%">
            <Documento data={dados} />
        </PDFViewer>
    )
}

export default Relatorio;
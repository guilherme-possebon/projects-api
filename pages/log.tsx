"use client";

import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://project-api-woad.vercel.app/api";

interface LogEntry {
  id: number;
  log_title: string;
  session: SessionData;
  post: {
    excluir_montagem: string;
  };
  server: Record<string, string | number | boolean>;
  planograma: {
    id: string;
    cnpj_empresa: string;
    usuario: string;
    categoria: string;
    data: string;
    ativo: string;
    observacao: string;
    usuario_que_ativou: string;
  };
  created_at: Date;
}

interface SessionData {
  cont_url: number;
  sec: string;
  usuario: {
    nome: string | null;
    usuario: string;
    cargo: string | null;
    data_registro: string;
    id: string;
    nivel: string;
    email: string | null;
  };
  empresa: {
    email: string;
    nome: string;
    cnpj: string;
    uf: string;
    suporte: string | null;
    dados_sensiveis: string;
  };
  customerx: {
    login: number;
  };
  fotos: Record<string, number>;
  recentesURL: Record<string, Record<string, [string, string]>>;
  count_importar_empresa: number;
}

export default function Log() {
  const [logs, setLogs] = useState<LogEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/log`);
        console.log(response.data);
        setLogs(response.data);
      } catch (err) {
        console.error(err);
        setError("Falha ao acessar a API externa");
      }
    };

    fetchLogs();
  }, []);

  const toggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-background text-text flex justify-center items-center min-h-screen p-6">
      {error ? (
        <div className="bg-danger text-white p-4 rounded-lg shadow">
          Erro: {error}
        </div>
      ) : logs ? (
        logs.length > 0 ? (
          <div className="overflow-x-auto border rounded-lg shadow-md w-full max-w-7xl">
            <table className="min-w-full table-auto text-sm md:text-base border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Categoria Planograma</th>
                  <th className="px-4 py-2 border-b">Id Planograma</th>
                  <th className="px-4 py-2 border-b">Session</th>
                  <th className="px-4 py-2 border-b">Log data</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <Fragment key={log.id}>
                    <tr
                      className="hover:bg-accent cursor-pointer text-center"
                      onClick={() => toggleDetails(log.id)}
                    >
                      <td className="px-4 py-2 border-b">{log.id}</td>
                      <td className="px-4 py-2 border-b">
                        {log.planograma.categoria}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {log.post.excluir_montagem}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {log.session.usuario.usuario || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(log.created_at).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                    </tr>
                    {expandedId === log.id && (
                      <tr>
                        <td
                          colSpan={6}
                          className="bg-background p-4 border-b rounded-b-lg"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text text-sm leading-6">
                            <div>
                              <strong>ID do Planograma:</strong>{" "}
                              {log.planograma.id}
                              <br />
                              <strong>Categoria:</strong>{" "}
                              {log.planograma.categoria}
                              <br />
                              <strong>Data do Planograma:</strong>{" "}
                              {new Date(log.planograma.data).toLocaleString(
                                "pt-BR"
                              )}
                              <br />
                              <strong>Usuário que criou:</strong>{" "}
                              {log.planograma.usuario}
                              <br />
                              <strong>Usuário que ativou:</strong>{" "}
                              {log.planograma.usuario_que_ativou || "(Nenhum)"}
                              <br />
                              <strong>Observação:</strong>{" "}
                              {log.planograma.observacao || "(Nenhuma)"}
                              <br />
                            </div>
                            <div>
                              <strong>Empresa (CNPJ):</strong>{" "}
                              {log.planograma.cnpj_empresa}
                              <br />
                              <strong>Usuário (Sessão):</strong>{" "}
                              {log.session.usuario.usuario}
                              <br />
                              <strong>Empresa (Nome):</strong>{" "}
                              {log.session.empresa.nome}
                              <br />
                              <strong>Empresa (Email):</strong>{" "}
                              {log.session.empresa.email}
                              <br />
                              <strong>Agente:</strong>{" "}
                              {log.server?.HTTP_USER_AGENT || "(Não informado)"}
                              <br />
                              <strong>Data do Log:</strong>{" "}
                              {new Date(log.created_at).toLocaleString("pt-BR")}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-success text-white p-4 rounded-lg shadow">
            Nenhum registro de log encontrado.
          </div>
        )
      ) : (
        <p className="text-primary">Carregando...</p>
      )}
    </div>
  );
}

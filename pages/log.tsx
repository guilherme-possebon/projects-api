"use client";

import { useEffect, useState } from "react";

import axios from "axios";

const API_URL = "https://project-api-woad.vercel.app/api";

interface Logs {
  id: number;
  log_title: string;
  session: JSON;
  post: JSON;
  server: JSON;
  planograma: JSON;
  created_at: Date;
  updated_at: Date;
}

export default function Log() {
  const [logs, setLogs] = useState<Logs[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/log`);
        setLogs(response.data);
      } catch (err) {
        console.error(err);
        setError("Falha ao acessar a API externa");
      }
    };

    fetchLogs();
  }, []);
  return (
    <div className="bg-background text-text flex justify-center items-center min-h-screen p-6">
      {error ? (
        <div className="bg-danger text-white p-4 rounded-lg shadow">
          Erro: {error}
        </div>
      ) : logs ? (
        logs.length > 0 ? (
          <div className="flex flex-col gap-6 w-11/12 md:w-3/4 mt-8">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-background p-6 md:p-8 rounded-lg border border-border shadow-md"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-3xl font-bold text-primary">
                    {log.log_title}
                  </h3>
                  <p className="text-sm text-primary">#{log.id}</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-text break-words whitespace-pre-wrap">
                  {log.id}
                </p>
              </div>
            ))}
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

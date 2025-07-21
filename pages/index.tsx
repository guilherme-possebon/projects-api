"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DebugReport {
  id: number;
  debug_title: string;
  debug_content: string;
  created_at: Date;
}

const API_URL = "https://project-api-woad.vercel.app/api";

export default function Home() {
  const [debugs, setDebugs] = useState<DebugReport[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebugs = async () => {
      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");

      if (!email) {
        setError("Email não fornecido");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/debug?email=${email}`);
        setDebugs(response.data.debugReports);
      } catch (err) {
        console.error(err);
        setError("Falha ao acessar a API externa");
      }
    };

    fetchDebugs();
  }, []);

  return (
    <div className="bg-background text-text flex justify-center items-center min-h-screen p-6">
      {error ? (
        <div className="bg-danger text-white p-4 rounded-lg shadow">
          Erro: {error}
        </div>
      ) : debugs ? (
        debugs.length > 0 ? (
          <div className="flex flex-col gap-6 w-11/12 md:w-3/4 mt-8">
            {debugs.map((debug) => (
              <div
                key={debug.id}
                className="bg-background p-6 md:p-8 rounded-lg border border-border shadow-md relative"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-3xl font-bold text-primary">
                    {debug.debug_title}
                  </h3>
                  <p className="text-sm text-primary">#{debug.id}</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-text break-words whitespace-pre-wrap">
                  {debug.debug_content}
                </p>
                <p className="text-sm text-primary text-center absolute right-6 md:right-8 bottom-6 md:bottom-8 h-[24px]">
                  {new Date(debug.created_at).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-success text-white p-4 rounded-lg shadow">
            Nenhum registro de debug encontrado.
          </div>
        )
      ) : (
        <p className="text-primary">Carregando...</p>
      )}
    </div>
  );
}

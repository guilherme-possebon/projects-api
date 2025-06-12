"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DebugReport {
  id: number;
  debug_title: string;
  debug_content: string;
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
    <div className="bg-[#121212] text-[#7d57d0] flex justify-center items-center min-h-screen p-6">
      {error ? (
        <div className="bg-[#ef5350] text-white p-4 rounded-lg shadow">
          Erro: {error}
        </div>
      ) : debugs ? (
        debugs.length > 0 ? (
          <div className="flex flex-col gap-6 w-11/12 md:w-3/4 mt-8">
            {debugs.map((debug) => (
              <div
                key={debug.id}
                className="bg-[#121212] p-6 md:p-8 rounded-lg border border-[#6f3de4] shadow-md"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-3xl font-bold text-[#6a4bc7]">
                    {debug.debug_title}
                  </h3>
                  <p className="text-sm text-[#6a4bc7]">#{debug.id}</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-[#7d57d0] break-words whitespace-pre-wrap">
                  {debug.debug_content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#66bb6a] text-white p-4 rounded-lg shadow">
            Nenhum registro de debug encontrado.
          </div>
        )
      ) : (
        <p className="text-[#6a4bc7]">Carregando...</p>
      )}
    </div>
  );
}

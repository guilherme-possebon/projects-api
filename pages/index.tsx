"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
        console.log(API_URL);
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
    <div className="bg-[#121212] text-[#7D57D0] flex justify-center items-center min-h-screen p-6">
      {error ? (
        <div className="bg-[#EF5350] text-[#FFFFFF] p-4 rounded-lg shadow">
          Erro: {error}
        </div>
      ) : debugs ? (
        debugs.length > 0 ? (
          <div className="flex flex-col gap-6 w-11/12 md:w-3/4 mt-8">
            {debugs.map((debug) => (
              <div
                key={debug.id}
                className="bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-[#6F3DE4] shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h1 className="text-xl md:text-3xl font-bold text-[#6A4BC7]">
                    {debug.debug_title}
                  </h1>
                  <p className="text-sm text-[#8AB4F8]">#{debug.id}</p>
                </div>
                <p className="text-base md:text-lg leading-relaxed break-words text-[#A29EA8]">
                  {debug.debug_content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#66BB6A] text-[#FFFFFF] p-4 rounded-lg shadow">
            Nenhum registro de debug encontrado.
          </div>
        )
      ) : (
        <p className="text-[#6A4BC7]">Carregando...</p>
      )}
    </div>
  );
}

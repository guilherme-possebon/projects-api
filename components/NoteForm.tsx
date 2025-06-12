"use client";

import { createNote } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const autosize = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.width = "auto";
        textarea.style.width = `${textarea.scrollWidth}px`;
      };
      textarea.addEventListener("input", autosize);
      autosize();
      return () => textarea.removeEventListener("input", autosize);
    }
  }, []);

  const handleSubmit = async () => {
    if (!title || !note) {
      Swal.fire({
        icon: "error",
        title: "Campos obrigatórios!",
        text: "Preencha tanto o título quanto a nota.",
        background: "bg-[var(--color-background)]",
        color: "text-[var(--color-white)]",
        confirmButtonColor: "bg-[var(--color-primary)]",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createNote(title, note);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Nota salva com sucesso!",
        showConfirmButton: false,
        timer: 2000,
        background: "bg-[var(--color-success)]",
        color: "text-[var(--color-white)]",
      });
      setTitle("");
      setNote("");
      textareaRef.current!.style.height = "auto";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar nota",
        text: (error as Error).message,
        background: "bg-[var(--color-background)]",
        color: "text-[var(--color-white)]",
        confirmButtonColor: "bg-[var(--color-primary)]",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-[#1a1a1a] border border-[#6f3de4] rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-[#6a4bc7] mb-3">
        Notas
      </h1>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full bg-[#1a1a1a] border border-[#6f3de4] rounded-2xl p-4 shadow-lg placeholder-[#a29ea8] text-[#7d57d0] focus:outline-none focus:ring-2 focus:ring-[#6a4bc7] focus:border-transparent hover:border-[#6a4bc7] transition-all duration-300"
            placeholder="Digite o título da nota..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            ref={textareaRef}
            className="w-full bg-[#1a1a1a] border border-[#6f3de4] rounded-2xl p-4 shadow-lg placeholder-[#a29ea8] text-[#7d57d0] focus:outline-none focus:ring-2 focus:ring-[#6a4bc7] focus:border-transparent hover:border-[#6a4bc7] transition-all duration-300 resize-none overflow-hidden"
            rows={1}
            placeholder="Digite sua mensagem..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
              isSubmitting
                ? "bg-[#6a4bc7] opacity-50 cursor-not-allowed"
                : "bg-[#6a4bc7] hover:bg-[#2d195c] text-white"
            }`}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";
import Swal from "sweetalert2";
import { Note } from "@/types";

interface NotesListProps {
  notes: Note[];
  start: string;
  end: string;
  weekStartDate: string;
}

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function NotesList({
  notes,
  start,
  end,
  weekStartDate,
}: NotesListProps) {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    const startIndex = daysOfWeek.indexOf(start);
    const endIndex = daysOfWeek.indexOf(end);

    if (startIndex > endIndex) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "O início da semana não pode ser depois do fim!",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "bg-[var(--color-background)]",
        color: "text-[var(--color-toastText)]",
        iconColor: "text-[var(--color-error)]",
      });
      return;
    }

    const startDate = new Date(weekStartDate);
    startDate.setDate(startDate.getDate() + startIndex);
    const endDate = new Date(weekStartDate);
    endDate.setDate(endDate.getDate() + endIndex + 1);

    const filtered = notes.filter((note) => {
      const noteDate = new Date(note.created_at);
      return noteDate >= startDate && noteDate < endDate;
    });

    setFilteredNotes(filtered);
  }, [notes, start, end, weekStartDate]);

  const groupedNotes = filteredNotes.reduce((acc, note) => {
    const noteDate = new Date(note.created_at);
    const dayKey = formatWithOptions(
      { locale: ptBR },
      "EEEE, dd/MM"
    )(noteDate).toLowerCase();
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div id="notes-container" className="max-w-4xl mx-auto">
      {Object.keys(groupedNotes).length === 0 ? (
        <p className="text-center text-gray text-lg py-10">
          Nenhuma nota encontrada para o período selecionado.
        </p>
      ) : (
        Object.entries(groupedNotes).map(([day, dayNotes]) => (
          <div key={day} className="mb-10" data-day={day}>
            <h2 className="text-2xl font-bold text-text-text mb-4 flex justify-between items-center capitalize border-b border-divider pb-2">
              {day}
            </h2>
            {dayNotes.map((note) => (
              <details
                key={note.id}
                className="bg-background rounded-lg p-5 mb-4 shadow-md border-2 border-border hover:border-primary transition-all duration-200"
                data-date={note.created_at.split("T")[0]}
              >
                <summary className="cursor-pointer text-xl font-semibold text-text flex justify-between items-center">
                  {note.title}
                  {/* ícone */}
                </summary>
                <div className="mt-4 text-primary space-y-3">
                  <p className="text-base leading-relaxed">{note.note}</p>
                </div>
              </details>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

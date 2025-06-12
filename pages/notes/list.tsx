"use client";

import { useState, useEffect } from "react";
import NotesList from "@/components/NotesList";
import { getCurrentWeek } from "@/lib/api";
import { Week } from "@/types";
export default function NotesListPage() {
  const [week, setWeek] = useState<Week>({
    id: null,
    start_date: null,
    end_date: null,
    notes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentWeek();
      if (data && data.success && data.week) {
        setWeek(data.week);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <NotesList
        notes={week.notes}
        start="monday"
        end="friday"
        weekStartDate={
          week.start_date || new Date().toISOString().split("T")[0]
        }
      />
    </div>
  );
}

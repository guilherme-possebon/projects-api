export interface Note {
  id: number;
  title: string;
  note: string;
  created_at: string;
  week?: Week;
}

export interface Week {
  id: number | null;
  start_date: string | null;
  end_date: string | null;
  notes: Note[];
}

export interface NotesResponse {
  success: boolean;
  week: Week;
}

export interface WeeksResponse {
  success: boolean;
  weeks: Week[];
}

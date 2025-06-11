import Carousel from "@/components/Carousel.jsx";
import NotesList from "@/components/NotesList.jsx";
import WeekFilter from "@/components/WeekFilter.jsx";
import { getCurrentWeek } from "@/lib/api.js";

export default async function NotesListPage() {
  const data = await getCurrentWeek();
  const week =
    data && data.success
      ? data.week
      : { id: null, start_date: null, end_date: null, notes: [] };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <Carousel
        currentWeek={week}
        onWeekChange={() => {
          // Client-side handling
        }}
      />
      <WeekFilter
        start="monday"
        end="friday"
        onFilterChange={() => {
          // Client-side handling
        }}
      />
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

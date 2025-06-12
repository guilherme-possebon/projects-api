import { useState, useEffect } from "react";
import { subWeeks } from "date-fns";
import Swal from "sweetalert2";
import { getWeekById } from "@/lib/api";
import { Week } from "@/types";

interface CarouselProps {
  currentWeek: Week;
  onWeekChange: (week: Week) => void;
}

export default function Carousel({ currentWeek, onWeekChange }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [ranges, setRanges] = useState<string[]>([]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  useEffect(() => {
    const startDate = new Date(currentWeek.start_date || new Date());
    const endDate = new Date(currentWeek.end_date || new Date());
    const weekRange = `${formatDate(startDate)} até ${formatDate(endDate)}`;

    const lastWeekStart = subWeeks(startDate, 1);
    const lastWeekEnd = subWeeks(endDate, 1);
    const lastWeekRange = `${formatDate(lastWeekStart)} até ${formatDate(
      lastWeekEnd
    )}`;

    const twoWeeksAgoStart = subWeeks(startDate, 2);
    const twoWeeksAgoEnd = subWeeks(endDate, 2);
    const twoWeeksAgoRange = `${formatDate(twoWeeksAgoStart)} até ${formatDate(
      twoWeeksAgoEnd
    )}`;

    setRanges([twoWeeksAgoRange, lastWeekRange, weekRange]);
  }, [currentWeek]);

  const fetchWeekNotes = async (weekId: number) => {
    try {
      const data = await getWeekById(weekId);
      if (data && data.success) {
        onWeekChange(data.week);
      } else {
        throw new Error("Failed to fetch week");
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: (error as Error).message,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#121212",
        color: "#ffffff",
        iconColor: "#ef5350",
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (newIndex === 1 && currentWeek.id) {
        fetchWeekNotes(currentWeek.id - 1);
      } else if (newIndex === 0 && currentWeek.id) {
        fetchWeekNotes(currentWeek.id - 2);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (newIndex === 1 && currentWeek.id) {
        fetchWeekNotes(currentWeek.id - 1);
      } else if (newIndex === 2 && currentWeek.id) {
        onWeekChange(currentWeek);
      }
    }
  };

  return (
    <div className="mx-auto mb-12 mt-12 relative max-w-4xl">
      <div className="relative h-16 overflow-hidden rounded-lg shadow-md bg-[#1a1a1a] border border-[#4d2d9d]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {ranges.map((range, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 flex items-center justify-center"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-[#7d57d0] text-center">
                {range}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-[#6a4bc7] text-white p-3 rounded-full shadow-lg hover:bg-[#2d195c] focus:ring-[#6a4bc7] disabled:bg-[#7a7a7a] disabled:text-[#a29ea8] disabled:cursor-not-allowed transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === 2}
        className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-[#6a4bc7] text-white p-3 rounded-full shadow-lg hover:bg-[#2d195c] focus:ring-[#6a4bc7] disabled:bg-[#7a7a7a] disabled:text-[#a29ea8] disabled:cursor-not-allowed transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

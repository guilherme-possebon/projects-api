"use client";

import { useState, useEffect } from "react";

interface WeekFilterProps {
  start: string;
  end: string;
  onFilterChange: (start: string, end: string) => void;
}

const days = [
  { label: "Domingo", value: "sunday" },
  { label: "Segunda-feira", value: "monday" },
  { label: "Terça-feira", value: "tuesday" },
  { label: "Quarta-feira", value: "wednesday" },
  { label: "Quinta-feira", value: "thursday" },
  { label: "Sexta-feira", value: "friday" },
  { label: "Sábado", value: "saturday" },
];

export default function WeekFilter({
  start,
  end,
  onFilterChange,
}: WeekFilterProps) {
  const [startDay, setStartDay] = useState(start);
  const [endDay, setEndDay] = useState(end);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  useEffect(() => {
    onFilterChange(startDay, endDay);
  }, [startDay, endDay, onFilterChange]);

  const handleSelectStart = (value: string) => {
    setStartDay(value);
    setIsStartOpen(false);
  };

  const handleSelectEnd = (value: string) => {
    setEndDay(value);
    setIsEndOpen(false);
  };

  return (
    <form className="bg-[#1a1a1a] rounded-2xl p-6 mb-10 flex flex-wrap md:flex-nowrap gap-6 items-end justify-center shadow-md border border-[#4d2d9d]">
      <div className="flex flex-col items-center w-full sm:w-auto">
        <label
          htmlFor="start"
          className="text-sm font-semibold text-[#7d57d0] mb-2"
        >
          Início da semana
        </label>
        <div className="relative w-full sm:w-48">
          <button
            type="button"
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="bg-[#1a1a1a] border border-[#6f3de4] text-[#7d57d0] px-4 py-2 rounded-lg flex items-center justify-between w-full hover:bg-[#2d195c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6a4bc7] transition-colors duration-200"
          >
            <span>{days.find((d) => d.value === startDay)?.label}</span>
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#8ab4f8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isStartOpen && (
            <ul className="absolute z-10 mt-2 w-full bg-[#1a1a1a] border border-[#6f3de4] rounded-lg shadow-md">
              {days.map((day) => (
                <li
                  key={day.value}
                  onClick={() => handleSelectStart(day.value)}
                  className="px-4 py-2 text-[#a29ea8] hover:bg-[#2d195c] hover:text-white cursor-pointer transition-all duration-150"
                >
                  {day.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center w-full sm:w-auto">
        <label
          htmlFor="end"
          className="text-sm font-semibold text-[#7d57d0] mb-2"
        >
          Fim da semana
        </label>
        <div className="relative w-full sm:w-48">
          <button
            type="button"
            onClick={() => setIsEndOpen(!isEndOpen)}
            className="bg-[#1a1a1a] border border-[#6f3de4] text-[#7d57d0] px-4 py-2 rounded-lg flex items-center justify-between w-full hover:bg-[#2d195c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6a4bc7] transition-colors duration-200"
          >
            <span>{days.find((d) => d.value === endDay)?.label}</span>
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#8ab4f8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isEndOpen && (
            <ul className="absolute z-10 mt-2 w-full bg-[#1a1a1a] border border-[#6f3de4] rounded-lg shadow-md">
              {days.map((day) => (
                <li
                  key={day.value}
                  onClick={() => handleSelectEnd(day.value)}
                  className="px-4 py-2 text-[#a29ea8] hover:bg-[#2d195c] hover:text-white cursor-pointer transition-all duration-150"
                >
                  {day.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}

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
    <form className="bg-cardBackground rounded-2xl p-6 mb-10 flex flex-wrap md:flex-nowrap gap-6 items-end justify-center shadow-md border border-divider">
      <div className="flex flex-col items-center w-full sm:w-auto">
        <label htmlFor="start" className="text-sm font-semibold text-text mb-2">
          Início da semana
        </label>
        <div className="relative w-full sm:w-48">
          <button
            type="button"
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="bg-cardBackground border border-border text-text px-4 py-2 rounded-lg flex items-center justify-between w-full hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          >
            <span>{days.find((d) => d.value === startDay)?.label}</span>
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isStartOpen && (
            <div className="absolute z-20 mt-2 w-full bg-cardBackground border border-border rounded-lg shadow-xl animate-fadeIn">
              <ul className="py-1 text-sm text-text">
                {days.map((day) => (
                  <li key={day.value}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200"
                      onClick={() => handleSelectStart(day.value)}
                    >
                      {day.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full sm:w-auto">
        <label htmlFor="end" className="text-sm font-semibold text-text mb-2">
          Fim da semana
        </label>
        <div className="relative w-full sm:w-48">
          <button
            type="button"
            onClick={() => setIsEndOpen(!isEndOpen)}
            className="bg-cardBackground border border-border text-text px-4 py-2 rounded-lg flex items-center justify-between w-full hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          >
            <span>{days.find((d) => d.value === endDay)?.label}</span>
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isEndOpen && (
            <div className="absolute z-20 mt-2 w-full bg-cardBackground border border-border rounded-lg shadow-xl animate-fadeIn">
              <ul className="py-1 text-sm text-text">
                {days.map((day) => (
                  <li key={day.value}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200"
                      onClick={() => handleSelectEnd(day.value)}
                    >
                      {day.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

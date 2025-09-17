"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface ProperCalendarProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  eventDates: Date[];
  className?: string;
}

export function ProperCalendar({ month, onMonthChange, eventDates, className }: ProperCalendarProps) {
  const today = new Date();
  const currentMonth = month.getMonth();
  const currentYear = month.getFullYear();
  
  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // Get the day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDayOfWeek;
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const prevMonthDays = [];
  
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    prevMonthDays.push(new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i));
  }
  
  // Get all days of current month
  const currentMonthDays = [];
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    currentMonthDays.push(new Date(currentYear, currentMonth, day));
  }
  
  // Get days from next month to fill the last week
  const totalCells = 42; // 6 rows × 7 days
  const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;
  const nextMonthDays = [];
  
  for (let day = 1; day <= remainingCells; day++) {
    nextMonthDays.push(new Date(currentYear, currentMonth + 1, day));
  }
  
  // Combine all days
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  
  // Check if a date has an event
  const hasEvent = (date: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Check if date is today
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };
  
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentYear, currentMonth - 1, 1);
    onMonthChange(newMonth);
  };
  
  const goToNextMonth = () => {
    const newMonth = new Date(currentYear, currentMonth + 1, 1);
    onMonthChange(newMonth);
  };
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  return (
    <div className={`bg-white rounded-lg p-4 ${className}`}>
      {/* Header with month/year and navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousMonth}
          className="p-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextMonth}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((date, index) => (
          <div
            key={index}
            className={`
              h-10 w-10 flex items-center justify-center text-sm rounded-md cursor-pointer
              ${isCurrentMonth(date) 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-gray-400'
              }
              ${isToday(date) 
                ? 'bg-blue-500 text-white font-bold hover:bg-blue-600' 
                : ''
              }
              ${hasEvent(date) && !isToday(date) 
                ? 'bg-orange-100 text-orange-900 font-semibold hover:bg-orange-200' 
                : ''
              }
            `}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}
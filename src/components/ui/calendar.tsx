
import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(new Date());

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = parseInt(newMonth);
    const newDate = new Date(month.getFullYear(), monthIndex, 1);
    setMonth(newDate);
  };

  const handleYearChange = (newYear: string) => {
    const year = parseInt(newYear);
    const newDate = new Date(year, month.getMonth(), 1);
    setMonth(newDate);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={month}
      onMonthChange={setMonth}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-6",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 md:w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 md:h-9 md:w-9 p-0 font-normal aria-selected:opacity-100 hover:scale-110 transition-all duration-300"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-lg",
        day_today: "bg-accent text-accent-foreground shadow-md font-semibold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth }) => (
          <div className="flex items-center justify-center gap-3 mb-6 px-8">
            <Select value={displayMonth.getMonth().toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-32 md:w-36 h-9 md:h-10 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2 bg-white dark:bg-slate-800">
                <SelectValue />
                <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
              </SelectTrigger>
              <SelectContent className="max-h-60 shadow-2xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg z-50">
                {months.map((month, index) => (
                  <SelectItem 
                    key={month} 
                    value={index.toString()}
                    className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer text-sm md:text-base py-2"
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={displayMonth.getFullYear().toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-20 md:w-24 h-9 md:h-10 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-2 bg-white dark:bg-slate-800">
                <SelectValue />
                <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
              </SelectTrigger>
              <SelectContent className="max-h-60 shadow-2xl border-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg z-50">
                {years.map((year) => (
                  <SelectItem 
                    key={year} 
                    value={year.toString()}
                    className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer text-sm md:text-base py-2"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };


import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label: string;
  className?: string;
  minDate?: Date;
}

export function DatePicker({
  date,
  onDateChange,
  label,
  className,
  minDate,
}: DatePickerProps) {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 py-6 text-left font-normal border border-luxe-darkgray bg-luxe-black text-luxe-white hover:bg-luxe-black/90 hover:text-luxe-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-luxe-yellow" />
            {date ? format(date, "dd-MM-yyyy") : <span>{label}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-luxe-black border border-luxe-darkgray" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={(date) => minDate ? date < minDate : false}
            initialFocus
            className="pointer-events-auto bg-luxe-black text-luxe-white"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center text-luxe-white",
              caption_label: "text-sm font-medium text-luxe-white",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-luxe-darkgray text-luxe-white p-0 hover:bg-luxe-yellow hover:text-luxe-black"
              ),
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-luxe-yellow rounded-md w-9 font-semibold text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-luxe-darkgray first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                "h-9 w-9 p-0 font-normal text-luxe-white hover:bg-luxe-yellow hover:text-luxe-black aria-selected:opacity-100"
              ),
              day_selected: "bg-luxe-yellow text-luxe-black hover:bg-luxe-yellow hover:text-luxe-black focus:bg-luxe-yellow focus:text-luxe-black",
              day_today: "bg-luxe-darkgray text-luxe-white",
              day_disabled: "text-luxe-darkgray opacity-50",
              day_range_middle: "aria-selected:bg-luxe-darkgray aria-selected:text-luxe-white",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

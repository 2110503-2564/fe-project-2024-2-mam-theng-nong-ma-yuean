'use client'

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateReserveProps {
  defaultDateTime?: string;
}

export default function DateReserve({ defaultDateTime }: DateReserveProps) {
  const defaultDate = defaultDateTime ? dayjs(defaultDateTime) : null;
  const defaultTime = defaultDateTime ? dayjs(defaultDateTime).format('HH:mm') : null;

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-col justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={defaultDate || null}
        />
        <DemoItem>
          <StaticTimePicker
            value={defaultTime ? dayjs().hour(parseInt(defaultTime.split(':')[0])).minute(parseInt(defaultTime.split(':')[1])) : null}
          />
        </DemoItem>
      </LocalizationProvider>
    </div>
  );
}

'use client'

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Suspense, useRef } from 'react';
import { LinearProgress } from "@mui/material";
import { useState } from "react";

export default function DateReserve({dentist, submitFunc}:{dentist:GetDentist, submitFunc:Function}) {
  const date = useRef<string|null>();
  const [warning, setWarning] =useState<string>();

  return (
    <div>
          <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-col justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          onChange={(v)=>{date.current = v?.toISOString()}}
          slots={{
            day: (props)=>{
              
              let date = new Date(props.day.year(),props.day.month(),props.day.date(),7,0,0,0);
              let found =0;
              dentist.data.bookings?.forEach((booking)=>{              
                if ((new Date(booking.bookingDate)).toISOString().toString() == date.toISOString().toString()) found++;
              });
              return (<PickersDay {...props} className={
                found >= dentist.data.bookingPerDay? "bg-red-200" : found > 0? "bg-yellow-200" : ""
              }/>);
            },
          }}
        />
      </LocalizationProvider>
      <button name="Book Venue" className="rounded-md bg-indigo-600 px-3 py-2 shadow-sm text-white"
      onClick={()=>{setWarning(submitFunc(date.current))}}>
          Booking
      </button>


      </div>  
      {warning?    
      <div className="absolute z-50 object-center top-[80px] left-2 bg-red-500 m-2 px-10 p-2 text-white text-center rounded">
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <div className="">{warning}</div>
        </Suspense>
      </div>:""
      }
    </div>

  );
}

import React from 'react'
import { Listbox, Transition } from "@headlessui/react";
import Select from "./Select/SelectBox";
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Store } from '../System/Stores';




function TimeDropDown() {

    const [timeOptions, setTimeOptions] = useState([]);
    const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
    
    const  onTimeSelected=(date: Date | [Date, Date] | null) =>{
    if (date instanceof Date) {
      console.log('Time: ', date);
      Store.setSelectedDate(date);
    }
  }
    return (
        <div className="flex flex-row justify-end items-center z-100">
          <label className="mx-2 text-black font-bold">
            Preferred Time:<span className="text-red-600">*</span>
          </label>
          <div>
            <ReactDatePicker
              showTimeSelectOnly={true}
              showTimeSelect={true}
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="Time"
              selected={Store.getSelectedDate()}
              value={Store.getTimeComponent()}
              onChange={(date) => onTimeSelected(date)}
              startDate={Store.getFirstAvailableHour()}
              endDate={Store.getLastAvailableHour()}
              includeTimes={Store.getAvailableHours()}
            />
          </div>
        </div>
    )
}

export default TimeDropDown

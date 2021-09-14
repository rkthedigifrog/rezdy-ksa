import React, { useEffect, useState } from "react";
import moment from "moment";
//import '../Components/DatePicker.css'
import LangSelector from "./LangSelector";
import { Store } from "../System/Stores";
import { observer } from "mobx-react";

import { ChevronLeft } from "@material-ui/icons";
import { ChevronRight } from "@material-ui/icons";
import calenderImage from "../Assets/Images/bg.jpg";
import calenderIcon from "../Assets/Images/calder-icon.png";
import visitorIcon from "../Assets/Images/user-icon.png"

import Select from "./Select/SelectBox";
import CalendarDays from "./DateSlider";
import WheelChairDropdown from "./WheelChairDropdown";
import { BookingState } from "../Enums/BookingState";
import TimeDropDown from "./TimeDropDown";

export function Datepicker() {
  const YEARS = () => {
    const years = [];
    const dateStart = moment();
    const dateEnd = moment().add(1, "y");
    while (dateEnd.diff(dateStart, "years") >= 0) {
      years.push({
        id: dateStart.format("MMYYYY"),
        label: dateStart.format("MMMM") + " (" + dateStart.format("YYYY") + ")",
        value: dateStart.format("MMMM YYYY"),
      });
      dateStart.add(1, "month");
    }

    return years;
  };
  const allMonthYear = YEARS(); // year month options dropdown
  const temp = allMonthYear.map((month) => month.value);
  const [currentMonthYear, setCurrentMonthYear] = useState(allMonthYear[0]);

  //vistor count 1-30
  const getSelectOptions = () => {
    let options: JSX.Element[] = [];

    for (let i = 0; i <= 30; i++) {
      if(i === 0){
        options.push({ id: i, label: 'Enter the no. of visitors', value: '' });
      }else{
        options.push({ id: i, label: i + 1, value: i + 1 });
      }
      
    }

    return options;
  };
  const allVisitors = getSelectOptions();
  const [currentVisitor, setCurrentVisitor] = useState(allVisitors[0]);

  const setVisitorCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let visitors = Number.parseInt(event.target.value);
    Store.setVisitorsCount(visitors);
  };

  let [day, setDay] = useState([moment().format("DD")]);
  const currentMonth = useState(moment().format("MMMM YYYY"));
  let [selected, setSelected] = useState(false);
  let selectclass = selected ? "cards-sel" : "cards";
  const ref = React.createRef();

  const imageUrl =
    Store.product != null
      ? Store.product.images[0].largeSizeUrl
      : calenderImage;
  
  return (
    <div>
      <div className="" middle-content>
        <div className="show-input">
          <div className="container  px-12">
            <div className="flex flex-wrap mt-6 mb-12 px-12 justify-center time_picker">
              {
                <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center">
                  <div className="select-border black-border text-lg">
                    <Select
                      id="months"
                      label={calenderIcon}
                      options={allMonthYear}
                      selectedOption={currentMonthYear}
                      handelChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        console.log("parent", event);
                        setCurrentMonthYear(event);
                      }}
                    />
                  </div>
                </div>
              }
              <TimeDropDown />
              <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center lsb">
                <div className="language-selector black-border text-lg">
                  <LangSelector></LangSelector>
                </div>
              </div>
              <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center">
                <div className="select-border black-border text-lg">
                  <Select
                    //className="flex-1"
                    id="visitor"
                    label={visitorIcon}
                    options={allVisitors}
                    selectedOption={currentVisitor}
                    handelChange={(event) => {
                      console.log("parent", event);
                      setCurrentVisitor(event);
                      Store.setVisitorsCount(event.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative calender-sep">
          <img
            className="w-screen  z-0"
            src={imageUrl}
            alt="KSA Pavilion"
            height="800"
          />
          <div className="absolute inset-0  z-100 set-z-index">
            <div className="container">
              <div className="flex flex-row justify-center items-center sm:mt-1 md:mt-20 lg:mt-48">
                <CalendarDays monthYear={currentMonthYear} /> 
              </div>
              <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center wcd my-0 md:my-4">

              <WheelChairDropdown /></div> 
              <div className="text-center pt-3 md:pt-4 md:pt-20 mb-12 text-sm md:text-xl">
                <button
                  className="booknow py-2 font-bold text-sm md:text-xl"
                  onClick={() => {
                    Store.setBookingState(BookingState.VisitorDetails);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="py-6 text-center text-sm">
        *Please note: After your booking is confirmed we will send you a
        confirmation email.
      </h5>
    </div>
  );
}

export default Datepicker;

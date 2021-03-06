import React, { useEffect, useState } from 'react'
import moment from 'moment'
import LangSelector from "./LangSelector";
import { Store } from '../System/Stores';
import { observer } from 'mobx-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calenderImage from '../Assets/Images/bg.jpg'
import Select from "./Select/SelectBox";
import CalendarDays from "./DateSlider";
import WheelChairDropdown from './WheelChairDropdown';
import { BookingState } from "../Enums/BookingState";
import TimeDropDown from './TimeDropDown';


 

export function Datepicker() {

    const YEARS = () => {
        
        const years = []
        const dateStart = moment()
        const dateEnd = moment().add(1, 'y')
        while (dateEnd.diff(dateStart, 'years') >= 0) {
            years.push({id:dateStart.format('MMYYYY'), label: (dateStart.format('MMMM')+' ('+dateStart.format('YYYY')+')'),value: dateStart.format('MMMM YYYY')})
            dateStart.add(1, 'month')
        }

        return years
    }
    const allMonthYear = YEARS(); // year month options dropdown
    const temp = allMonthYear.map((month) => month.value);
    const [currentMonthYear, setCurrentMonthYear] = useState(allMonthYear[0]);
    
  //vistor count 1-30
    const getSelectOptions =() => {
     let options: JSX.Element[] = [];

    for (let i = 0; i < 30; i++) {
      options.push({id:i, label:(i + 1), value: (i+1)});
    }

    return options;
  }
  const allVisitors = getSelectOptions();
  const [currentVisitor, setCurrentVisitor] = useState(allVisitors[0]);

  const allWheelchairs = getSelectOptions();
  const [currentWheelchair, setCurrentWheelchair] = useState(allWheelchairs[0]);

  const setVisitorCount =(event: React.ChangeEvent<HTMLSelectElement>)=>{

  let visitors = Number.parseInt(event.target.value);
      Store.setVisitorsCount(visitors);

  }

   

    let [day, setDay] = useState([moment().format('DD')]);
    const currentMonth = useState(moment().format('MMMM YYYY'));
    let [selected, setSelected] = useState(false);
    let selectclass = selected ? "cards-sel" : "cards";
    const ref = React.createRef();

       const imageUrl =
      Store.product != null
        ? Store.product.images[0].largeSizeUrl
        : calenderImage;

    
    const onTimeSelected = (date: Date | [Date, Date] | null) => {
        if (date instanceof Date) {
          console.log('Time: ', date);
          Store.setSelectedDate(date);
        }
    }
    const onVisitorCountSelected = (e) => {
        let visitors = Number.parseInt(e.target.value);

        Store.setVisitorsCount(visitors);
    }
    return (
        <div>
            <div className="" middle-content>
                <div className="show-input">
                    <div className="container  px-12">
                        <div className="flex flex-wrap mt-6 mb-12 px-12 justify-center">
                            {<div className="w-full sm:w-3/12 px-4 text-center text-lg">
                                <div className="select-border black-border">
                                    <Select
                                      //className="flex-1"
                                      id="months"
                                      options={allMonthYear}
                                      selectedOption={currentMonthYear}
                                      handelChange={(event) => {
                                        console.log("parent", event);
                                        setCurrentMonthYear(event);
                                      }}
                                    />
                                </div>
                            </div>}
                            <div className="w-full sm:w-3/12 px-4 text-center">
                                <div className="language-selector black-border text-lg">
                                    <LangSelector></LangSelector>
                                </div>
                            </div>
                            <div className="w-full sm:w-3/12 px-4 text-center">
                                <div className="select-border black-border text-lg">
                                    <Select
                                      //className="flex-1"
                                      id="visitor"
                                      options={allVisitors}
                                      selectedOption={currentVisitor}
                                      handelChange={(event) => {
                                        this.onVisitorCountSelected(event)
                                        console.log("parent", event);
                                        setCurrentVisitor(event);
                                      }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative calender-sep">
                    <img className="w-screen z-0" src={imageUrl} alt="KSA Pavilion" />
                    <div className="absolute inset-0  z-100 set-z-index">
                        <div className="container">
                            <div className="flex flex-row justify-center items-center sm:mt-0 md:mt-20 lg:mt-48">
                                <CalendarDays/>            
                            </div>
                              <div className="md:flex md;flex-row justify-center items-center md:mt-8">
                                <div className="w-full md:w-3/12 px-4 text-center time_piker">
                                    <div className="select-border black-border w-full text-lg">
                                        <ReactDatePicker 
                                        class="inline-block w-full rounded-md shadow-sm"
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
                                <div className="w-full md:w-3/12 px-4 text-center">
                                    <div className="select-border black-border text-lg">
                                        <Select
                                          //className="flex-1"
                                          id="visitor"
                                          options={allWheelchairs}
                                          selectedOption={currentWheelchair}
                                          handelChange={(event) => {
                                            //console.log("parent", event);
                                            setCurrentWheelchair(event);
                                          }}
                                        />

                                    </div>
                                </div>
                                </div>
                        
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )




}



export default Datepicker

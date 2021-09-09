import React, { useEffect, useState } from 'react'
import moment from 'moment'
//import '../Components/DatePicker.css'
import LangSelector from "./LangSelector";
import { Store } from '../System/Stores';
import { observer } from 'mobx-react';

import { ChevronLeft } from '@material-ui/icons'
import { ChevronRight } from '@material-ui/icons'
import calenderImage from '../Assets/Images/bg.jpg'
import Select from "./Select/SelectBox";
import CalendarDays from "./DateSlider";




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

  const setVisitorCount =(event: React.ChangeEvent<HTMLSelectElement>)=>{

  let visitors = Number.parseInt(event.target.value);
      Store.setVisitorsCount(visitors);

  }

    //let [month, setMonth] = useState(moment().format('MMMM YYYY'));
    let [day, setDay] = useState([moment().format('DD')]);
    
    /*const temp = monthArray.map(month => month);*/
    const currentMonth = useState(moment().format('MMMM YYYY'));
    /*const [currentMonthYear, setMonthYear] = useState(temp);*/
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
            <div className="flex flex-wrap mt-6 mb-12 px-12 justify-center">
              {<div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center">
                <div className="select-border black-border text-lg">
                <Select
                  id="months"
                  options={allMonthYear}
                  selectedOption={currentMonthYear}
                  handelChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                    console.log("parent", event);
                    setCurrentMonthYear(event);

                  }}
                />
                  </div>
              </div>}
              <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center">
                <div className="language-selector black-border text-lg">
                  <LangSelector></LangSelector>
                  </div>
              </div>
              <div className="w-full md:w-4/12 lg:w-3/12 md:px-4 text-center">
                <div className="select-border black-border text-lg">
                <Select
                  //className="flex-1"
                  id="visitor"
                  options={allVisitors}
                  selectedOption={currentVisitor}
                  handelChange={(event) => {
                    console.log("parent", event);
                    setCurrentVisitor(event);
                  }}
                />
                  {/*<label className="font-bold">
                  Enter number of visitors:<span className="text-red-600">*</span>
                </label>
                <select
                  className="border-gray-600 border-solid border h-6 ml-2 w-12"
                  onChange={(data) => {}}
                >
                  {getSelectOptions()}
                        </select>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="relative calender-sep">
              <img className="w-screen  z-0" src={imageUrl} alt="KSA Pavilion" height="800" />
              <div className="absolute inset-0  z-100 set-z-index">
                <div className="container">
                  <div className="flex flex-row justify-center items-center sm:mt-0 md:mt-20 lg:mt-48" >
                  <CalendarDays monthYear={currentMonthYear}/>
                  </div>
                  <div className="text-center pt-4 md:pt-20 mb-12">
                    <button className="booknow">Book Now</button>
                  </div>
                </div>
                </div>
            </div>
            </div >
          <h5 className="py-6 text-center" >*Please note: After your booking is confirmed we will send you a confirmation email.</h5>
        </div >
    )
}

export default Datepicker

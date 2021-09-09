import React, { useEffect, useState } from "react";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import moment from 'moment';
import { Store } from '../System/Stores';
import DateSliderElement from "./DateSliderElement";


export function CalendarDays(props: any) {

  let { monthY } = props.monthYear;
  
  let [month,setMonth] = useState(moment(props.monthYear).format('MMMM YYYY'));
  let [day, setDay] = useState([moment().format('DD')]);
  
    useEffect(() => {

        setDay(Array.from(Array(moment(month, 'MMMM YYYY').daysInMonth()), (_, i) => (i + 1).toString()));

    }, [month]);
  
  useEffect(() => {
    console.log("month year use effiect:", (props.monthYear.value).toString())
    console.log("moment date setmonth:",moment((props.monthYear.value).toString(),'MMMM YYYY').format('MMMM YYYY'))
    
    setMonth(moment((props.monthYear.value).toString(),'MMMM YYYY').format('MMMM YYYY'))
    console.log(month)
    
    
  },[props.monthYear]);
  
    const onDateSelected = (e) =>{
    if (e.target.getAttribute('mydate') != '') {
      let selectedDate = e.target.getAttribute('mydate');
      Store.setSelectedDate(selectedDate);
    }else{
      Store.setSelectedDate(moment().toDate());
    }
  }
    return (
      <Carousel
      plugins={[
        'arrows',
        {
          resolve: slidesToShowPlugin,
          options: {
           numberOfSlides: 5
          }
        },
      ]}
      breakpoints={{
        640: {
          plugins: [
           {
             resolve: slidesToShowPlugin,
             options: {
              numberOfSlides: 1
             }
           },
         ]
        },
        900: {
          plugins: [
           {
             resolve: slidesToShowPlugin,
             options: {
              numberOfSlides: 3
             }
           },
         ]
        }
      }}
    >
  {day.map((val, k) => {
    return (
      <DateSliderElement k={k} val={val} monthYear={props.monthYear} month={month}/>
    )
        })}
</Carousel>
      
    );
  }

export default CalendarDays


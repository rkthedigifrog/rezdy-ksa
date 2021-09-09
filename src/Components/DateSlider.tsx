import React, { useEffect, useState } from "react";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import moment from 'moment';
import { Store } from '../System/Stores';



export function CalendarDays(props: any) {
  
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
          return(<div key={k} class="slider_content m-4 md:m-2 h-48 hover:bg-white hover:border-purple-800 hover:border-b-8 border-b-4 border-transparent sm:w-full w-full ">
          <div class="border-2 border-bg-white hover:border-transparent w-full h-full p-2" for={val} mydate={val+`-${moment(month).format('MM')}-${moment().format('YYYY')}`} onClick={(e) => console.log(e)}><h5 class="text-white text-xl">{moment(month, 'MMMM YYYY').format('MMM')}</h5><h3 class="text-4xl text-white">{val}</h3>
          

          </div>
          </div>)
        })}
</Carousel>
      
    );
  }

export default CalendarDays


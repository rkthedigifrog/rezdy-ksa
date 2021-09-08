import React, { Component, useEffect, useState } from "react";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import moment from 'moment';



export function CalendarDays() {
  let [month, setMonth] = useState(moment().format('MMMM YYYY'));
  let [day, setDay] = useState([moment().format('DD')]);
    
    useEffect(() => {

        setDay(Array.from(Array(moment(month, 'MMMM YYYY').daysInMonth()), (_, i) => i + 1));

    }, [month]);
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
  {day.map((val, key) => {
          console.log(val);
          return(<div class="slider_content m-4 md:m-2 h-48 hover:bg-white hover:border-purple-800 hover:border-b-8 border-b-4 border-transparent sm:w-full w-full ">
          <div class="border-2 border-bg-white hover:border-transparent w-full h-full p-2" for={val} onClick={(e) => console.log(e.target.textContent)}><h5 class="text-white text-xl">{moment(month, 'MMMM YYYY').format('MMM')}</h5><h3 class="text-4xl text-white">{val}</h3>
          

          </div>
          </div>)
        })}
</Carousel>
      
    );
  }

export default CalendarDays


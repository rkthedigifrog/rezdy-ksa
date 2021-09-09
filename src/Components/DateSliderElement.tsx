import React from 'react'
import { useState } from 'react';
import moment from 'moment';
import { Store } from '../System/Stores';

function DateSliderElement({k,val,monthYear,month}) {
    let [selected, setSelected] = useState(false);
    
    return (
       <div key={k} className={selected ? "slider_content_sel m-4 md:m-2 h-48 bg-white border-purple-800 border-b-8 border-b-4 border-transparent sm:w-full w-full text-black":"slider_content m-4 md:m-2 h-48 hover:bg-white hover:border-purple-800 hover:border-b-8 border-b-4 border-transparent sm:w-full w-full "}>
            <div className="border-2 border-bg-white hover:border-transparent w-full h-full p-2" for={val} mydate={val + `-${moment(month).format('MM')}-${moment().format('YYYY')}`} onClick={(e) => {
              
                console.log(val)
                console.log(moment((monthYear.value).toString(), 'MMMM YYYY').format('MMMM YYYY'))
              console.log(val)
              let month = moment((monthYear.value+' '+val.padStart(1,'0')).toString(), 'MMMM YYYY DD').format('MMMM YYYY DD');

             // console.log(month.toString() + ' ' + val.toString().padStart(1, '0'))
                setSelected(!selected);
              
              console.log(month)
              let selectedDate = moment((monthYear.value + ' ' + val.padStart(1, '0')).toString(), 'MMMM YYYY DD').toDate();
             Store.setSelectedDate(selectedDate);

            
            }}><h5 className="text-white text-xl">{moment(month, 'MMMM YYYY').format('MMM')}</h5><h3 class="text-4xl text-white">{val}</h3>
          

          </div>
          </div>
    )
}

export default DateSliderElement

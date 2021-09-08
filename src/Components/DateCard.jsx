import React from 'react'
import { useState } from 'react';
import '../components/Datepicker.css'

function DateCard(props:any) {
    let { day, isSelected } = props;


    return (

        <div className={isSelected ? "cards-sel" : "cards"}>
            {day}
        </div>
    )
}

export default DateCard

import React, { Component } from "react";
import { BookingState } from "../Enums/BookingState";
import { ItemData } from "../Interfaces/ItemData";
import { Store } from "../System/Stores";
import { ExtraItem } from "./ExtraItem";

export class Extras extends Component {
  render() {
    let items: Array<ItemData> = [
      // {
      //   name: "Hearing Aid",
      //   image: "https://img.rezdy.com/EXTRA_IMAGE/cta_1_tb.jpg",
      //   question: "Do you need a hearing aid?",
      // },
      {
        name: "Wheelchair",
        image:
          "https://img.rezdy.com/EXTRA_IMAGE/anirehab_24_inch_bariatric_wheelchair_tb.jpg",
        question: "Do you need a wheelchair?",
      },
    ];

    let extraItems: JSX.Element[] = [];

    let index = 0;

    items.forEach((element) => {
      index++;
      extraItems.push(
        <ExtraItem key={"ei-" + index.toString()} itemData={element} />
      );

      if (index !== items.length)
        extraItems.push(<hr key={"hr-" + index.toString()} className="mt-2" />);
    });

    return (
      <div className="pt-10">
        <h1 className="text-base md:text-2xl font-bold mb-4">
          Optional extras - KSA Pavilion Tour Guide Booking
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-row justify-end items-center">
            <button className="button skip-btn" onClick={this.onContinue}>
              Skip
            </button>
          </div>
          {extraItems}
          <div className="flex flex-row justify-end items-center mt-2">
            <button className="button" onClick={this.onContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  onContinue() {
    Store.setBookingState(BookingState.VisitorDetails);
  }

  onSkip() {}
}

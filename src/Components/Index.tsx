import { observer } from "mobx-react";
import React, { Component } from "react";
import { BookingState } from "../Enums/BookingState";
import { Session } from "../System/Models/Session";
import { locator } from "../System/ServiceLocator";
import { ApiService } from "../System/Services/ApiService";
import { Store } from "../System/Stores";
import { action } from "mobx";
import { Datepicker } from "./Datepicker";


interface IProps {}

interface IState {}

@observer
export class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

   // this.onBookableRequest = this.onBookableRequest.bind(this);
  }

  async componentDidMount() {
    const apiService = locator(ApiService);

    let products = await apiService.getProducts();

    console.log("Products:", products);

    if (products != null && products.length > 0) {
      Store.setProduct(products[0]);

      if (Store.product != null) {
        let sessions: Session[] | null = await apiService.getAvailabilitiesFor(
          Store.product.code
        );

        if (sessions != null) Store.setAvailableSessions(sessions);
      }
    }
  }

  render() {
 

    const description =
      Store.product != null
        ? Store.product.description
        : "Planning to visit our Pavilion? Go ahead and book one of our scheduled tours that will enable you to truly experience what the Kingdom of Saudi Arabia has to offer.<br />Each tour is for 20 mins where one of our experienced guides will take you";

    return (
      <div className="bg-white">
        <div className="top-content">
        <div className="container  px-12">
          <div className="top_head py-6  px-12">
          <h1 className="text-4xl font-bold p-2 text-black text-center">
            Plan your visit to the Kingdom
of Saudi Arabia Pavilion at Expo 2020 Dubai
          </h1>
          <h4 className="text-2xl text-black text-center">
              Plan your visit and book a 20-minute tour of the Pavilion with one of our knowledgeable guides to learn about
Saudi Arabia’s rich heritage, diverse people, vast opportunities and natural wonders.
          </h4>
          </div>
          </div>
        
      </div>
        <Datepicker></Datepicker>
       

      </div>
    );
  }





onBookNow() {
    if (Store.getSelectedDate() != null) {
      Store.setBookingState(BookingState.Extra);
    }
}

}

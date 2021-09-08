import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Aftermath } from './Components/Aftermath';
import { Extras } from './Components/Extras';
import { Index } from './Components/Index';
import { VisitorDetails } from './Components/VisitorDetails';
import { BookingState } from './Enums/BookingState';
import { Store } from './System/Stores';

interface IProps {}

@observer
export default class App extends Component<IProps> {
  render() {
    let element: JSX.Element | null = null;

    if (Store.bookingState === BookingState.Initial) element = <Index />;
    else if (Store.bookingState === BookingState.Extra) element = <Extras />;
    else if (Store.bookingState === BookingState.VisitorDetails)
      element = <VisitorDetails />;
    else if (Store.bookingState === BookingState.Aftermath)
      element = <Aftermath />;

    return <div className="site-container">{element}</div>;
  }
}

import { Component } from 'react';

export class Aftermath extends Component {
  render() {
    return (
      <div className="aftermath flex flex-col justify-center items-center pt-20">
        <h1 className="text-lg font-bold">Thank you!</h1>
        <span>We will send you an email after your booking is confirmed</span>
      </div>
    );
  }
}

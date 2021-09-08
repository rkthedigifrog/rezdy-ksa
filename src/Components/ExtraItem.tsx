import React, { Component } from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import { ItemData } from "../Interfaces/ItemData";
import { Store } from "../System/Stores";

interface IProps {
  itemData: ItemData;
}

type Mystate = {
  count: number;
};

export class ExtraItem extends Component<IProps, Mystate> {
  state: Mystate = {
    count: 0,
  };

  render() {
    return (
      <div className="grid grid-cols-12">
        <div className="flex flex-col col-span-12 md:col-span-10">
          <div className="flex flex-row">
            <div className="flex-col p-2">
              <img className="w-40" src={this.props.itemData.image} alt="" />
            </div>
            <div className="flex flex-col justify-center p-2">
              <div className="flex-row">
                <h2 className="text-sm md:text-xl font-bold">
                  {this.props.itemData.name}
                </h2>
              </div>
              <div className="flex-row text-xs md:text-base">
                {this.props.itemData.question}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-2 col-span-12 md:col-span-2">
          <div className="w-28">
            <InputSpinner
              type={"real"}
              precision={0}
              max={30}
              min={0}
              step={1}
              value={this.state.count}
              onChange={(num: any) => {
                Store.setExtras(num);
              }}
              variant={"dark"}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }
}

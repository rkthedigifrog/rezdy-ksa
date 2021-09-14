import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import Select from "./Select/SelectBox";
import { useState } from "react";
import { Store } from "../System/Stores";
import wheelchairIcon from "../Assets/Images/wheel_icon.png";

const users: any = [
  {
    name: "1",
    label: "Do you need a wheel chair?",
    id: 0,
  },
  {
    name: "1",
    label: "1",
    id: 1,
  },
  {
    name: "2",
    label: "2",
    id: 2,
  },
  {
    name: "3",
    label: "3",
    id: 3,
  },
  {
    name: "4",
    label: "4",
    id: 4,
  },
  {
    name: "5",
    label: "5",
    id: 5,
  },
  {
    name: "6",
    label: "6",
    id: 6,
  },
  {
    name: "7",
    label: "7",
    id: 7,
  },
  {
    name: "8",
    label: "8",
    id: 8,
  },
  {
    name: "9",
    label: "9",
    id: 9,
  },
  {
    name: "10",
    label: "10",
    id: 10,
  },
];

function WheelChairDropdown() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  return (
    <Select
      //className="flex-1"
      label={wheelchairIcon}
      options={users}
      selectedOption={currentUser}
      handelChange={(event) => {
        console.log("parent", event);
        setCurrentUser(event);
        Store.setExtras(parseInt(event.label));
      }}
    />
  );
}

export default WheelChairDropdown;

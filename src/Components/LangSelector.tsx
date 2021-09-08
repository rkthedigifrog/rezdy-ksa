import React, { useEffect, useState } from "react";
import { Store } from "../System/Stores";
import Select from "./Select/SelectBox";

//import Select, { ActionMeta, OptionTypeBase } from "react-select";

interface LanguageOption {
  name: string;
  id: string | number;
}

interface SelectButtonProps {
  onSelect: (user: LanguageOption) => void;
  languageOptions: LanguageOption[];
  stateId: string;
}

const users: LanguageOption[] = [
  {
    name: "English",
    label: "English",
    id: 1,
  },
  {
    name: "Italian",
    label: "Italian",
    id: 2,
  },
  {
    name: "French",
    label: "French",
    id: 3,
  },
  {
    name: "German",
    label: "German",
    id: 4,
  },
  {
    name: "Spanish",
    label: "Spanish",
    id: 5,
  },
  {
    name: "Japanese",
    label: "Japanese",
    id: 6,
  },
  {
    name: "Hebrew",
    label: "Hebrew",
    id: 7,
  },
  {
    name: "Korean",
    label: "Korean",
    id: 8,
  },
  {
    name: "Turkish",
    label: "Turkish",
    id: 9,
  },
  {
    name: "Urdu",
    label: "Urdu",
    id: 10,
  },
  {
    name: "Chinese",
    label: "Chinese",
    id: 11,
  },
  {
    name: "Tagalog",
    label: "Tagalog",
    id: 12,
  },
  {
    name: "Bahasa",
    label: "Bahasa",
    id: 13,
  },
];

/*const SelectUserButton: React.FunctionComponent<SelectButtonProps> = ({
  onSelect,
  languageOptions,
  stateId,
}) => {
  const options: OptionTypeBase[] = languageOptions.map(
    (user: LanguageOption) => ({
      label: user.name,
      value: user.id,
    })
  );

  const handleChange = (
    option: OptionTypeBase,
    meta: ActionMeta<any>
  ): void => {
    console.log({ option, meta });
    onSelect({
      name: option.label,
      id: option.value,
    });
  };

  return (
    <div className="select__user">
      <Select
        name="user"
        options={options}
        onChange={handleChange}
        maxMenuHeight={120}
        placeholder={stateId}
        //defaultValue={}
      />
    </div>
  );
};*/

export default function LangSelector() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  return (
    <Select
        //className="flex-1"

        options={users}
        selectedOption={currentUser}
        handelChange={(event) => {
          console.log("parent", event);
          setCurrentUser(event);
        }}
      />
    /*<SelectUserButton
      stateId={stateId}
      languageOptions={users}
      onSelect={(user) => {
        console.log("you have selected user " + user.name);
        Store.setLanguage(user.name);
      }}
    />*/
  );
}

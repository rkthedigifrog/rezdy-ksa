import React, { useState } from 'react';

let defaultOptions = {
  default: 'en',
  naming: 'default',
}

const multiLang = {
  useDropdown : (languages, userOptions={}) => {
    const options = Object.assign(defaultOptions, userOptions);
    const preferredLanguage = options.default === 'location' ? navigator.language.split('-')[0] : options.default;
    const [state, setState] = useState(languages[preferredLanguage]);
    const id = 'use-dropdown'+ Math.random();
  
    const Dropdown = () => {
      return (
        <div className='languageDropdown'>
          <select
            id={id}
            disabled={languages.length === 0}
            value={state.bcp47}
            onChange={e => setState(() => languages[e.target.value])}
            onBlur={e => setState(() => languages[e.target.value])}
          >
            {Object.keys(languages).map(key => (
              <option value={languages[key].bcp47} key={languages[key].bcp47} >
                {options.naming === 'default' ? languages[key].name : languages[key][options.naming]}
              </option>
            ))}
  
          </select>
        </div>
      )
    }
    return [state, Dropdown, setState];
  },

  autochange : (userOptions={}) => {
    const options = Object.assign(defaultOptions, userOptions);
    const preferredLanguage = navigator.language.split('-')[0];
    let lang = languages[preferredLanguage] ? languages[preferredLanguage] : languages[options.default];
    return lang
  }
}

export default multiLang;
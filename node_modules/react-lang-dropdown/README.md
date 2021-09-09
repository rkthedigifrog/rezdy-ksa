# react-lang-dropdown

## Short Description

An easy way to implement a dropdown-menu to react and update the content with the new language.

The library adds a custom hook to your client, that takes an language-object or json-file as argument. These need to have a certain structure to work with the dropdown-menu. It is strongly recommended to use this package together with the [npx-languages-package](https://www.npmjs.com/package/npx-languages).

## Quick-start

Installing the package (inside the client-folder).
```
    npm i react-lang-dropdown

```

The package provides two function:

**.autochange()**
   * takes the default-language as argument {default: 'en'}
   * creates no dropdown-menu
   * changes the language automatic to the location or prefered language of the user
   * if the prefered language is not available, it presents the default-language (preset is english).

**.useDropdown(**languagesObject, {options}**)**
   * takes an object of languages as mandatory argument
   * takes an optional options-object as second argument


**<options>**
   * default: sets the default language. Preset is english
      * *"location"* alternative setting, that sets the standard language to the user-location/prefered language. 

   * naming: sets the way of presentation. 

      * *"default"* presents the language in english-characters. 
      * *"native"* presents the language in the native characters and language
      * *"emoji"* presents the language-choice in form of a flag (if available) 

### Example for the options-argument

The following example would set the dropdown list to have the users location langugae as standard and presents the language-choices in form of their native language. If the user would be located in Japan, the website should start in Japanese and present it with 日本語.

```js
   const [language, LanguageDropdown] = languageDropdown.useDropdown(languages,  
   {
      default: 'location', 
      naming: 'native'
   });
```

The languages-parameter needs to be an object that has a bcp-47-standard as key and a language-object as value. The language-object should hold the name, nativename, bcp-47 and a flag-emoji.

```json
"en":{
        "name":"English",
        "emoji": "🇬🇧",
        "nativeName":"English",
        "content": "{}",
        "bcp47": "en"
    }
```

It is strongly recommended to use the "npx-languages" npm-package to provide the correct syntax and structure for this.


## Code examples
In the App.js import the library and use it like a normal custom hook. It takes a 

```js
    import languageDropdown from 'react-lang-dropdown';
    import languages from './lang/languages.json';
...
    function App() {
      const [language, LanguageDropdown] = languageDropdown.useDropdown(languages);
    ...
    }

    ...

    return (
    <div className="App">
        <LanguageDropdown />
    </div>
    )
```


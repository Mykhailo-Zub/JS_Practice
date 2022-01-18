import { useState } from "react";
import styles from "./App.module.css";
import CustomInput from "./components/CustomInput/CustomInput";
import CustomSelect from "./components/CustomSelect/CustomSelect";
import FieldValidator from "./components/FieldValidator/FieldValidator";

const inputsVariant = "outlined";

const languages = ["JavaScript", "C#", "Python", "PHP", "Java", "Ruby", "Go"];
const years = ["1", "2", "3", "4", "5"];

function App() {
  const [firstName, setFirstName] = useState(null);
  const [age, setAge] = useState(null);
  const [lang, setLang] = useState([]);
  const [exp, setExp] = useState(null);

  const checkNameLength = (text) => {
    return text.length > 15 ? "enter less than 15 characters" : undefined;
  };
  const nameValidation = (text) => {
    return /\W|\d|\s+/gm.test(text) ? "name must contain only letters" : undefined;
  };
  const checkAge = (number) => {
    return number && number > 100 ? "age must be less than 100" : undefined;
  };
  const check18 = (number) => {
    return number && number < 18 ? "you must be over 18 years old" : undefined;
  };
  const checkLang = (arr) => {
    return arr.length > 2 ? "you must choose less than 2 languages" : undefined;
  };
  const checkExp = (value) => {
    return parseInt(value) < 2 ? "you need more than 2 years of coding experience" : undefined;
  };

  return (
    <div className={styles.wrapper}>
      <h2>Submit form</h2>
      <FieldValidator
        component={<CustomInput />}
        value={firstName || ""}
        onChange={(text) => setFirstName(text)}
        validators={[checkNameLength, nameValidation]}
        label="First name"
        variant={inputsVariant}
      />
      <FieldValidator
        component={<CustomInput />}
        value={age || ""}
        onChange={(number) => setAge(number)}
        validators={[checkAge, check18]}
        label="Age"
        variant={inputsVariant}
        type="Number"
      />
      <FieldValidator
        component={<CustomSelect />}
        value={lang || []}
        onChange={(arr) => setLang(arr)}
        validators={[checkLang]}
        label="Technoligies"
        variant={inputsVariant}
        options={languages}
        multiple={true}
      />
      <FieldValidator
        component={<CustomSelect />}
        value={exp || ""}
        onChange={(text) => setExp(text)}
        validators={[checkExp]}
        label="Years of experience"
        variant={inputsVariant}
        options={years}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import InputText from "../form-elements/InputText";
import "./style-form-element.css";

function SelectSearchOption({
  name,
  label,
  options,
  blanket,
  setBlanket,
  mandatory,
  errors,
  value,
  changeFun,
  form,
  setForm,
  flag,
}) {
  const [isCountryList, setIsCountryList] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryName, setCountryName] = useState("Select Country");

  useEffect(() => {
    setCountryList(options);
  }, [options]);

  const countryListHandeler = () => {
    setIsCountryList(!isCountryList);
    setBlanket(true);
  };

  const filterListHandeler = (e) => {
    let val = e.target.value.toLowerCase();
    let filterLst = options.filter((item) =>
      item.label.toLowerCase().startsWith(val)
    );
    setCountryList(filterLst);
  };

  const selectCountryHandeler = (inputFieldName, name) => {

    if (
      inputFieldName === "birthCountry" ||
      inputFieldName === "citizenshipCountry" ||
      inputFieldName === "nationalityCountry"
    ) {
      setForm({
        ...form,
        fatcaDetail: {
          ...form.fatcaDetail,
          [inputFieldName]: name,
        },
      });
    }else{
         setForm({
           ...form,
           fatcaDetail: {
             ...form.fatcaDetail,
             taxRecords: [
               { ...form.fatcaDetail.taxRecords[0], [inputFieldName]: name },
             ],
           },
         });
    }
    
    setCountryName(name);
    setIsCountryList(false);
    setCountryList(options);
    setBlanket(false);
  };
  useEffect(() => {
    if (!blanket) {
      setIsCountryList(false);
    }
  }, [blanket]);



  return (
    <article
      className="country-wrapper"
      style={{ zIndex: isCountryList ? 9 : 7 }}
    >
      <div className="search-select-option">
        <InputText
          name={name}
          label={label}
          placeholder={countryName}
          value={flag === 'N' ? 'India': value || countryName}
          clickFun={countryListHandeler}
          changeFun={changeFun}
          mandatory="*"
          errors={errors}
          disabled ={flag === 'N' ? true: false}
        />

        <span className="country-arrow">
          <MdKeyboardArrowDown />
        </span>
      </div>

      {isCountryList && (
        <div className="country-list-container">
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              onChange={filterListHandeler}
            ></input>
          </div>
          <div className="country-list">
            {countryList?.map((country) => (
              <div
                key={country.label}
                style={{ textTransform: "capitalize" }}
                onClick={() => selectCountryHandeler(name, country.label)}
              >
                {country.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default SelectSearchOption;

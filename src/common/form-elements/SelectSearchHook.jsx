import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import InputText from '../form-elements/InputText';
import InputTextHook from './InputTextHook';
import './style-form-element.css';

function SelectSearchHook({
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
  errorBorder,
  register,
  reqText,
  pattern,
  condition,
  setValue,
  sts,
  depend,
  selectFieldName,
  rowIndex,
  fildsObj,
  textRecords,
  setTextRecords,
}) {
  const [isCountryList, setIsCountryList] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryName, setCountryName] = useState('Select Country');

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

  const selectCountryHandeler = (inputFieldName, countryName) => {
    console.log(selectFieldName + '-' + inputFieldName, countryName);
    setValue(inputFieldName || name, countryName);

    if (
      inputFieldName === 'birthCountry' ||
      inputFieldName === 'citizenshipCountry' ||
      inputFieldName === 'nationalityCountry'
    ) {
      setForm({
        ...form,
        [selectFieldName + '-' + inputFieldName]: countryName,
        // fatcaDetail: {
        //   ...form.fatcaDetail,
        //   [inputFieldName]: name,
        // },
      });
    } else {
     
      const orgName = name.split('-')[1];
      let updateRecords = textRecords.map((items, ind) => {
        if (ind === rowIndex) {
          return { ...items, [orgName]: countryName };
        }
        return items;
      });
      
      setTextRecords(updateRecords);
      // setForm({
      //   ...form,
      //   [selectFieldName + '-taxRecords']: [
      //     {
      //       ...form[selectFieldName + '-taxRecords'][rowIndex],
      //       [name]: countryName,
      //     },
      //   ],
      // });
    }

    setCountryName(countryName);
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
        <InputTextHook
          register={register}
          name={name}
          label={label}
          placeholder={'countryName'}
          value={!sts ? 'India' : value || ''}
          clickFun={countryListHandeler}
          changeFun={changeFun}
          errorBorder={errorBorder}
          disabled={flag === 'N' ? true : false}
          reqText={reqText}
          sts={!sts ? true : false}
          depend={name}
        />
        {/* <InputText
          name={name}
          label={label}
          placeholder={countryName}
          value={flag === 'N' ? 'India' : value || countryName}
          clickFun={countryListHandeler}
          changeFun={changeFun}
          mandatory="*"
          errors={true}
          disabled={flag === 'N' ? true : false}
          {...register(name, {
            required: reqText,
            pattern: pattern && {
              value: condition.value,
              message: condition.message,
            },
          })}
         
        /> */}

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
                style={{ textTransform: 'capitalize' }}
                onClick={() =>
                  selectCountryHandeler(name.split('-')[1], country.label)
                }
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

export default SelectSearchHook;

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

  const selectCountryHandeler = (inputFieldName, name) => {
    console.log(selectFieldName + '-' + inputFieldName, name);
    setValue(inputFieldName, name);

    if (
      inputFieldName === 'birthCountry' ||
      inputFieldName === 'citizenshipCountry' ||
      inputFieldName === 'nationalityCountry'
    ) {
      setForm({
        ...form,
        [selectFieldName+'-'+inputFieldName]: name,
        // fatcaDetail: {
        //   ...form.fatcaDetail,
        //   [inputFieldName]: name,
        // },
      });
    } else {
      setForm({
        ...form,
        [selectFieldName + '-taxRecords']: 
          
            {...form[selectFieldName + '-taxRecords'],
            [selectFieldName + '-' + inputFieldName]: name,}
          
        

        // [{ ...form.taxRecords[0], [selectFieldName+'-'+inputFieldName]: name }],

        // taxRecords: [
        //   { ...form.taxRecords[0], [inputFieldName]: name },
        // ],
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

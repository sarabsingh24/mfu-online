import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import moment from 'moment'

function DatePicker({
  name,
  label,
  mandatory,
  changeFun,
  value,
  count,
  errors,
  dob,
}) {
  const [todayDate, setTodayDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  useEffect(() => {
    let date = new Date(value);
    // if (value) {
    //   date = new Date(value);
    // }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // let selectDate = value ? date.getTime() : 0
    let dtNow = Date.now();
    let eighteenAgo = dtNow.valueOf() - 18 * 365 * 24 * 60 * 60 * 1000;
    let getDt = moment(eighteenAgo).format("YYYY-MM-DD");
    setMaxDate(getDt);
    

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    setTodayDate(`${year}-${month}-${day}`);
  }, [value]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}
        <span className="red">{mandatory}</span>
      </Form.Label>
      <Form.Control
        type="date"
        name={name}
        data-count={count}
        value={value ? value : ""}
        onChange={changeFun}
        // max={todayDate}
        //  min="2023-03-04"
        // max={dob ? maxDate : null}
        className={!!errors?.[name] && "redBorder"}
        isInvalid={!!errors?.name}
        style={{ color: "#666", fontWeight: "500" }}
      />
      <div className="red">{errors?.[name]}</div>
    </Form.Group>
  );
}

export default DatePicker;

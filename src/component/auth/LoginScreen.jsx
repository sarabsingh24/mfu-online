import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputTextHook from '../../common/form-elements/InputTextHook';
import Register from '../../component/auth/Register';
import { Wrapper } from './auth-styles';
import { getUserAsync } from './authSlice';

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

function LoginScreen() {
  const [IsOtpVerified, setIsOtpVerified] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const loginForm = (data) => {
    delete data.otp;
    console.log(data);
    if (IsOtpVerified) {
      dispatch(getUserAsync(data));
    }
  };

  const verifyOTPHandeler = () => {
    const compaireOTP = +getValues('otp') === 5678;
    console.log(compaireOTP);

    setIsOtpVerified(compaireOTP);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <form onSubmit={handleSubmit(loginForm)}>
              <InputTextHook
                type="text"
                register={register}
                name="email"
                label="Email"
                reqText="email required"
                disabled={false}
                errorBorder={errors?.email?.message}
                mandatory=""
                // value={form?.name || ''}
                // changeFun={formHandeler}
              />
              <small style={errorFontStyle}>{errors?.email?.message}</small>
              <InputTextHook
                type="password"
                register={register}
                name="password"
                label="Password"
                reqText="password required"
                disabled={false}
                errorBorder={errors?.password?.message}
                mandatory=""
              />
              <small style={errorFontStyle}>{errors?.password?.message}</small>

              <InputTextHook
                type="text"
                register={register}
                name="otp"
                label="OTP"
                reqText="correct otp required"
                disabled={false}
                errorBorder={errors?.otp?.message}
                mandatory=""
              />
              <small style={errorFontStyle}>{errors?.otp?.message}</small>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button
                  style={{ width: '6rem' }}
                  variant="primary"
                  size="sm"
                  onClick={verifyOTPHandeler}
                  disabled={IsOtpVerified}
                >
                  Verify OTP
                </Button>
                <Button
                  style={{ width: '6rem' }}
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={!IsOtpVerified}
                >
                  Signin
                </Button>
              </div>
            </form>
            <small>
              New user? Signup <Link to="/signup">here</Link>
            </small>
          </Card.Body>
        </Card>
      </Wrapper>
    </React.Fragment>
  );
}

export default LoginScreen;

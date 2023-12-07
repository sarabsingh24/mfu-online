import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputTextHook from '../../common/form-elements/InputTextHook';
import Register from '../../component/auth/Register';
import { Wrapper } from './auth-styles';

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

function LoginScreen() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const loginForm = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Card style={{ width: '18rem' }}>
          <Card.Body >
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
              <Button variant="primary" size="sm" type='submit'>
                Signin
              </Button>
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

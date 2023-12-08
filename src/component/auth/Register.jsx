import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from './auth-styles';
import Card from 'react-bootstrap/Card';
import InputTextHook from '../../common/form-elements/InputTextHook';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import {registerUserAsync} from '../auth/authSlice'

const errorFontStyle = {
  color: 'red',
  fontSize: '12px',
  height: '12px',
  display: 'block',
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

const password = watch('password');
  const dispatch = useDispatch();
  const registerSubmit = (data) => {
    console.log(data)
    dispatch(registerUserAsync(data));
  };
  return (
    <Wrapper>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <form onSubmit={handleSubmit(registerSubmit)}>
            <InputTextHook
              type="text"
              register={register}
              name="name"
              label="Name"
              reqText="name required"
              disabled={false}
              errorBorder={errors?.name?.message}
              mandatory="*"
              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>{errors?.name?.message}</small>
            <InputTextHook
              type="text"
              register={register}
              name="email"
              label="Email"
              reqText="email required"
              disabled={false}
              errorBorder={errors?.email?.message}
              mandatory="*"
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
              mandatory="*"
              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>{errors?.password?.message}</small>
            <InputTextHook
              type="password"
              register={register}
              name="conform-password"
              label="Conform Password"
              reqText="password missmatch"
              disabled={false}
              errorBorder={errors['conform-password']?.message}
              mandatory="*"
              compair={password}
              // value={form?.name || ''}
              // changeFun={formHandeler}
            />
            <small style={errorFontStyle}>
              {errors['conform-password']?.message}
            </small>
            <Button variant="primary" size="sm" type="submit">
              Signin
            </Button>
          </form>
          <small>
            Already a user? Signin <Link to="/signin">here</Link>.
          </small>
        </Card.Body>
      </Card>
    </Wrapper>
  );
}

export default Register;

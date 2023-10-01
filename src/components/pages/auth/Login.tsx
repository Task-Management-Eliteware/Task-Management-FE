import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, TLogin } from 'shared';
import { customForm } from 'components/common/Form';

const Login = () => {
  const formMethods = useForm<TLogin>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    // console.log('🚀 ~ file: Login.tsx:28 ~ onSubmit ~ hello:', data);
  };
  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          <Form.Input className="form-control" label="Email" name="email" />
          <Form.Input className="form-control" label="Password" name="password" />
          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

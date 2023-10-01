import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, localStorageSetItem, TLogin, useLogin } from 'shared';
import { customForm } from 'components/common/Form';

const Login = () => {
  const [login] = useLogin();

  const formMethods = useForm<TLogin>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        console.log('res', res.result.token);
        localStorageSetItem({ key: 'token', value: res.result.token });
      })
      .catch((err) => console.log(err));
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

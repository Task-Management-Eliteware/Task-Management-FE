import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, localStorageSetItem, TLogin, useLogin, setToken } from 'shared';
import { customForm } from 'components/common/Form';
import { routes } from 'shared/constant';

const Login = () => {
  const [login] = useLogin();
  const navigate = useNavigate();
  const formMethods = useForm<TLogin>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        const { token } = res.result;
        setToken({ token });
        localStorageSetItem({ key: 'token', value: token });
        navigate(routes.TASKS);
      })
      .catch((err) => console.log(err));
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

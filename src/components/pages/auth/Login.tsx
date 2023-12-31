import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, localStorageSetItem, TLogin, useLogin, setToken, useAppDispatch, TCustomError } from 'shared';
import { Button } from 'components/common';
import { customForm } from 'components/common/Form';
import { routes } from 'shared/constant';

const Login: FC = () => {
  const [login] = useLogin();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formMethods = useForm<TLogin>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const {
        result: { token },
      } = await login(data).unwrap();
      localStorageSetItem({ key: 'token', value: token });
      dispatch(setToken({ token }));
      navigate(routes.TASKS);
      toast.success('Login success.');
    } catch (err: any) {
      if (err.status === 400) {
        toast.error('Invalid Login or Password');
      } else {
        toast.error('Something went wrong please try after some times.');
      }
    }
  };
  return (
    <div>
      <div>
        <h3 className="text text-center">Login</h3>
      </div>
      <div>
        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12">
              <Form.Input label="Email" name="email" />
            </div>
            <div className="col-12">
              <Form.Input label="Password" name="password" />
            </div>
            <div className="col-12">
              <div className="my-btn-class">
                <Form.SubmitButton>Submit</Form.SubmitButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema, TSignUP, routes, useSignUp } from 'shared';
import { customForm } from 'components/common/Form';

const SignUp = () => {
  const [signup] = useSignUp();
  const navigate = useNavigate();
  const formMethods = useForm<TSignUP>({
    mode: 'all',
    resolver: yupResolver(signUpSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TSignUP> = async (data) => {
    try {
      await signup(data).unwrap();
      toast.success('Signup ');
      navigate(routes.LOGIN);
    } catch (err: any) {
      if (err.status === 400) {
        toast.error(err.data.error.message);
      } else {
        toast.error('Something went wrong please try after some times.');
      }
    }
  };
  return (
    <div>
      <div>
        <h3 className="text text-center">Sign Up</h3>
      </div>
      <div>
        <Form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-12">
              <Form.Input label="First Name" name="firstName" />
            </div>
            <div className="col-12">
              <Form.Input label="Last Name" name="lastName" />
            </div>

            <div className="col-12">
              <Form.Input label="Email" name="email" />
            </div>

            <div className="col-12">
              <Form.Input label="Password" name="password" />
            </div>

            <div className="col-12">
              <Form.Input label="Confirm Password" name="confirmPassword" />
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

export default SignUp;

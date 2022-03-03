import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setToken, setUserLocally } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';

import {base_url, Api} from '../../../Env';

import './LoginForm.scss';

function initialValues() {
  return {
      email: "client1@gmail.com",
      password: "123",
  }
}

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setUser } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
        email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (formData) => {

      let url = base_url(Api, "auth")
      fetch(url,{
        method:'POST',
        headers: {
          "Content-Type":"application/json",
          "Accept":"*/*"
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok){
            response.json()
            .then((resp) => {
              setToken(resp.token);
              setUserLocally(resp.name);
              setUser(resp.name, resp.token); 
              localStorage.setItem("id_user", resp.id_user);     
            })
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            setError(error.message);
            throw error;
        }
      },
    )},
  });

  return (
      <form className='login-form' onSubmit={formik.handleSubmit} >
        <h2>Login</h2>
        <div className='login-form__row'>
            <input type="text" name="email" id="email" placeholder='Your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            />
        </div>
        <div className='login-form__row'>
            <input type="password" name="password" id="password" placeholder='Your Password'
            value={formik.values.password}
            onChange={formik.handleChange}

            />
        </div>
        <button type="submit" className='btn'>
            Log in
        </button>
        {error && <p className='login-form__error'>User or Password are incorrect</p>}
      </form>
  );
};

export default LoginForm;

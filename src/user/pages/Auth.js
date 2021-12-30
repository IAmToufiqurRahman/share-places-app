import React, { useState, useContext } from 'react'

import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import './Auth.css'
import { AuthContext } from '../../shared/context/auth-context'

function Auth() {
  const auth = useContext(AuthContext)

  const [isLoginMode, setIsLoginMode] = useState(true)

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },

      password: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const authSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
    auth.login()
  }

  const switchModeHandler = () => {
    // we call setFormData to handle the conditional input field
    // in the below condition we are at signupmode but as this function is switchModeHandler it will turn into isloginMode, so to update out form state correctly, we need to drop the name field
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      )
    }

    // switch mode from login to signup
    setIsLoginMode((prevMode) => !prevMode)
  }

  return (
    <Card className='authentication'>
      <h2>Login Required</h2>

      <hr />

      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && <Input element='input' id='name' type='text' label='Your Name' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a name' onInput={inputHandler} />}

        <Input element='input' id='email' type='email' label='E-Mail' validators={[VALIDATOR_EMAIL()]} errorText='Please enter a valid email address.' onInput={inputHandler} />

        <Input element='input' id='password' type='password' label='Password' validators={[VALIDATOR_MINLENGTH(5)]} errorText='Please enter a valid password(at least 5 characters)' onInput={inputHandler} />

        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>

      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  )
}

export default Auth

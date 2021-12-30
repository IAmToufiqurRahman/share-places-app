import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true

      // iterating over object
      for (const inputId in state.inputs) {
        // the switch function in auth needs this check
        if (!state.inputs[inputId]) {
          continue
        }

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          // not currently getting updated
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,

        inputs: {
          ...state.inputs,
          // override the input state for the input we're updating with this action
          [action.inputId]: { value: action.value, isValid: action.isValid }
          // title: {value: 'aaa', isValid: true}
        },

        isValid: formIsValid
      }

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }

    default:
      return state
  }
}

export const useForm = (initialInput, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: initialFormValidity
  })

  // if the component re executes this function will be stored away by useCallback and will be reused
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value: value,
      isValid: isValid
    })
  }, [])

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    })
  }, [])

  return [formState, inputHandler, setFormData]
}

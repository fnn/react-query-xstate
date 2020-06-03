import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



export default function Form({ createUser, setShow }) {
  const initialState = {
    name: "",
    email: "",
    password: null,
    createdAt: new Date()
  }
  function reducer(state, action) {
    switch (action.type) {
      case "NAME_INPUT":
        return {
          ...state,
          name: action.name
        }
      case "EMAIL_INPUT":
        return {
          ...state,
          email: action.email
        }
      case "PASS_INPUT":
        return {
          ...state,
          password: action.password
        }
      default:
        return {
          ...state
        }
    }
  }
  const [store, dispatch] = React.useReducer(reducer, initialState)

  function updateInput(e, type, key) {
    dispatch({ type, [key]: e.target.value })
  }

  return (
    <div>
      <TextField variant="outlined" label="Name" onChange={e => updateInput(e, "NAME_INPUT", "name")} />
      <TextField variant="outlined" label="Email" onChange={e => updateInput(e, "EMAIL_INPUT", "email")} />
      <TextField variant="outlined" label="password" type="password" onChange={e => updateInput(e, "PASS_INPUT", "password")} />
      <Button onClick={() => {
        createUser(store)
        setShow(false)
      }}>
        Create +
    </Button>
    </div>
  )
}
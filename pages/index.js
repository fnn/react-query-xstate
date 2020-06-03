import { useQuery, useMutation, queryCache } from 'react-query';

import Table from '../components/Table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';


export default function Index() {
  const [show, setShow] = React.useState(false);
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

  const { data, status } = useQuery(['users'], async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    return users.data;
  })

  /* 
    Create a useMutation that lets us hit our create endpoint and create a new user. 
    We can feed it dummy data first, then wire it up to a form
    
    We will explore utilizing the queryCache to optimistically update our table 
  */

  const [createUser] = useMutation(async (newUser) => {
    const res = await fetch('/api/user/create', {
      method: "POST",
      body: newUser
    })

    return res.json();
  }, {
    onSuccess: (newUser) => queryCache.setQueryData('users', prev => prev.concat(newUser.data))
  })



  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: 'id'
      },

      {
        Header: 'Name',
        accessor: 'attributes.name',
      },
      {
        Header: 'Email',
        accessor: 'attributes.email',
      },
      {
        Header: 'Account Created',
        accessor: 'attributes.created-at',
      },
    ],
    []
  )

  const users = React.useMemo(() => data, [data])

  if (status === "loading") return <p>Loading...</p>;

  const body = (
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

  return (
    <div>
      <CssBaseline />
      <Button variant="outlined" color="primary" onClick={() => setShow(!show)}>Create +</Button>
      {show && (
        <Modal
          open={show}
          onClose={() => setShow(false)}
          aria-labelledby="Create user modal"
          aria-describedby="Modal to show a form for creating an entry"
        >
          {body}
        </Modal>
      )}
      <Table columns={columns} data={users} />
    </div>
  )
}
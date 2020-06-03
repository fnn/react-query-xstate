import { useQuery, useMutation, queryCache } from 'react-query';

import Table from '../components/Table';
import Form from '../components/Form';

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

export default function Index() {
  const [show, setShow] = React.useState(false);

  const { data, status } = useQuery(['users'], async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    return users.data;
  })

  const [createUser] = useMutation(async (newUser) => {
    const res = await fetch('/api/user/create', {
      method: "POST",
      body: newUser
    })

    return res.json();
  }, {
    onSuccess: (newUser) => queryCache.setQueryData('users', prev => prev.concat(newUser.data))
  })

  const users = React.useMemo(() => data, [data])

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setShow(!show)}>Create +</Button>
      {show && (
        <Modal
          open={show}
          onClose={() => setShow(false)}
          aria-labelledby="Create user modal"
          aria-describedby="Modal to show a form for creating an entry"
        >
          <Form setShow={setShow} createUser={createUser} />
        </Modal>
      )}
      <Table data={users} />
    </div>
  )
}
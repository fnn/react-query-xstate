import { useQuery } from 'react-query';
import Table from '../components/Table';

export default function Index() {
  const { data, status } = useQuery(['users'], async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    return users.data;
  })

  /* 
    Create a useMutation that lets us hit our create endpoint and create a new user. 
    We can feed it dummy data first, then wire it up to a form
    
    We will explore utilizing the queryCache to optimistically update our table 
    
    TODO: 
    [] useMutation hits our POST in Mirage
    [] useMutation updates the queryCache, thus updating the UI

  */

  const columns = React.useMemo(
    () => [
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

  return (
    <div>
      <button>Create +</button>
      <Table columns={columns} data={users} />
    </div>
  )
}
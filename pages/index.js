import { useQuery } from 'react-query';
import Table from '../components/Table';

export default function Index() {
  const { data, status } = useQuery(['users'], async () => {
    const res = await fetch("/api/users");
    const users = await res.json();
    return users.data;
  })

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
      <Table columns={columns} data={users} />
    </div>
  )
}
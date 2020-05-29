import { useQuery } from 'react-query';

export default function Index() {
  const { data, status } = useQuery(['users'], async () => {
    const users = await fetch("/api/users").then(res => res.json());

    return users
  })

  if (status === "loading") return <p>Loading...</p>;
  return (
    <div>
      {data && data.data.map(user => (
        <p>{user.attributes.name}</p>
      ))}
    </div>
  )
}
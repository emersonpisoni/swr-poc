import useSWR from 'swr';
import { getUser, updateUser, type User } from '../api';

export function UserProfile() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<User>(
    'user',
    getUser
  );

  if (error) return <div className="card error">Failed to load.</div>;
  if (isLoading) return <div className="card">Loading…</div>;
  if (!data) return null;

  const handleEditBio = async () => {
    const newBio = `Bio edited at ${new Date().toLocaleTimeString()}`;

    await mutate(updateUser({ bio: newBio }), {
      optimisticData: { ...data, bio: newBio },
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>UserProfile</h2>
        {isValidating && <span className="badge">revalidating…</span>}
      </div>
      <p><strong>{data.name}</strong></p>
      <p>{data.email}</p>
      <p><em>{data.bio}</em></p>
      <p className="muted">updatedAt: {data.updatedAt}</p>
      <div className="row">
        <button onClick={() => mutate()}>Refetch (revalidate)</button>
        <button onClick={handleEditBio}>Edit bio (optimistic)</button>
      </div>
    </div>
  );
}

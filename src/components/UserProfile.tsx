import useSWR from 'swr';
import { getUser, updateUser, type User } from '../api';

export function UserProfile() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<User>(
    'user',
    getUser
  );

  if (error) return <div className="card error">Erro ao carregar.</div>;
  if (isLoading) return <div className="card">Carregando…</div>;
  if (!data) return null;

  const handleEditBio = async () => {
    const novoBio = `Bio editada às ${new Date().toLocaleTimeString()}`;

    await mutate(updateUser({ bio: novoBio }), {
      optimisticData: { ...data, bio: novoBio },
      rollbackOnError: true,
      populateCache: true,
      revalidate: false,
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>UserProfile</h2>
        {isValidating && <span className="badge">revalidando…</span>}
      </div>
      <p><strong>{data.name}</strong></p>
      <p>{data.email}</p>
      <p><em>{data.bio}</em></p>
      <p className="muted">updatedAt: {data.updatedAt}</p>
      <div className="row">
        <button onClick={() => mutate()}>Refetch (revalidate)</button>
        <button onClick={handleEditBio}>Editar bio (optimistic)</button>
      </div>
    </div>
  );
}

import useSWR from 'swr';
import { getUser, type User } from '../api';

export function UserBadge() {
  const { data, isLoading } = useSWR<User>('user', getUser);

  if (isLoading) return <span className="badge">…</span>;
  if (!data) return null;

  return <span className="badge solid">{data.name}</span>;
}

import useSWR from 'swr';
import { getStats } from '../api';

export function Stats() {
  const { data } = useSWR('stats', getStats, { refreshInterval: 500 });

  return (
    <div className="card stats">
      <h3>Server stats</h3>
      <p>
        Total <code>getUser</code> requests:{' '}
        <strong>{data?.fetchCount ?? '…'}</strong>
      </p>
      <p className="muted">
        If dedup works, opening 2 components that use the same key shouldn't
        increase this counter by more than 1 per revalidation.
      </p>
    </div>
  );
}

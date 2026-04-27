import useSWR from 'swr';
import { getStats } from '../api';

export function Stats() {
  const { data } = useSWR('stats', getStats, { refreshInterval: 500 });

  return (
    <div className="card stats">
      <h3>Stats do servidor</h3>
      <p>
        Total de requests <code>getUser</code>:{' '}
        <strong>{data?.fetchCount ?? '…'}</strong>
      </p>
      <p className="muted">
        Se dedup funciona, abrir 2 componentes que usam a mesma key não
        deve aumentar esse contador em mais de 1 por revalidação.
      </p>
    </div>
  );
}

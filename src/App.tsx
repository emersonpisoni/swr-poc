import { SWRConfig } from 'swr';
import { UserProfile } from './components/UserProfile';
import { UserBadge } from './components/UserBadge';
import { Stats } from './components/Stats';

export default function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
      }}
    >
      <main className="container">
        <header>
          <h1>SWR POC</h1>
          <UserBadge />
        </header>

        <section>
          <h2>1. Cache + dedup</h2>
          <p className="muted">
            Two components (header and card below) use the key{' '}
            <code>'user'</code>. Only 1 request is made.
          </p>
          <UserProfile />
        </section>

        <section>
          <h2>2. Revalidation</h2>
          <ol>
            <li>Switch to another tab and come back → automatic fetch on focus.</li>
            <li>Click <em>Refetch</em> → manual revalidation.</li>
            <li>
              Note the data <strong>doesn't disappear</strong> during revalidation —
              only the "revalidating…" badge shows. That's stale-while-revalidate.
            </li>
          </ol>
        </section>

        <section>
          <h2>3. Optimistic update</h2>
          <p className="muted">
            Click <em>Edit bio</em>: the bio changes <strong>instantly</strong>{' '}
            (optimistic). In parallel, the "server" takes 1.2s. If it fails, it rolls back.
          </p>
        </section>

        <Stats />
      </main>
    </SWRConfig>
  );
}

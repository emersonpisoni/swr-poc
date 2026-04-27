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
            Dois componentes (header e card abaixo) usam a key{' '}
            <code>'user'</code>. Apenas 1 request é feita.
          </p>
          <UserProfile />
        </section>

        <section>
          <h2>2. Revalidação</h2>
          <ol>
            <li>Mude para outra aba e volte → fetch automático em foco.</li>
            <li>Clique em <em>Refetch</em> → revalidação manual.</li>
            <li>
              Note que o dado <strong>não some</strong> durante a revalidação —
              só o badge "revalidando…" aparece. Isso é stale-while-revalidate.
            </li>
          </ol>
        </section>

        <section>
          <h2>3. Optimistic update</h2>
          <p className="muted">
            Clique em <em>Editar bio</em>: a bio muda <strong>instantânea</strong>{' '}
            (otimista). Em paralelo, o "servidor" leva 1.2s. Se falhar, reverte.
          </p>
        </section>

        <Stats />
      </main>
    </SWRConfig>
  );
}

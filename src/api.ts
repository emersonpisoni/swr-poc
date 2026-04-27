export type User = {
  id: number;
  name: string;
  email: string;
  bio: string;
  updatedAt: string;
};

let user: User = {
  id: 1,
  name: 'Emerson Pisoni',
  email: 'emerson@example.com',
  bio: 'Developer',
  updatedAt: new Date().toISOString(),
};

let fetchCount = 0;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getUser(): Promise<User> {
  fetchCount++;
  await delay(800);
  return { ...user };
}

export async function getStats(): Promise<{ fetchCount: number }> {
  await delay(150);
  return { fetchCount };
}

export async function updateUser(patch: Partial<User>): Promise<User> {
  await delay(1200);
  user = { ...user, ...patch, updatedAt: new Date().toISOString() };
  return { ...user };
}

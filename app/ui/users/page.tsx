// app/ui/users/page.tsx
import { fetchUsers } from '@/lib/data';

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Users</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#00003C] text-white border border-black rounded p-4"
          >
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

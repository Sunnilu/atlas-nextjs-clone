// components/LoggedInUser.tsx
// Update the import path below to the correct relative path where your auth module is located.
// For example, if your auth file is at 'lib/auth.ts', use:
import { auth } from '../lib/auth';
// Or adjust the path as needed for your project structure.
import Image from 'next/image';

export default async function LoggedInUser() {
  const session = await auth();

  if (!session?.user) return null;

  const { name, image } = session.user;
  const avatarUrl = image || 'https://via.placeholder.com/40';

  return (
    <div className="flex items-center space-x-2 p-3">
      <Image
        src={avatarUrl}
        alt="User avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-white text-sm">{name ?? 'Anonymous'}</span>
    </div>
  );
}

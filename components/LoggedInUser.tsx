// Update the import path below to the correct location of your auth module.
// For example, if your auth file is at 'lib/auth.ts', use:
import { auth } from '../lib/auth';
// Or adjust the path as needed to match your project structure.
import Image from 'next/image';
import Link from 'next/link';

export default async function LoggedInUser() {
  const session = await auth();

  if (!session?.user) return null;

  const { name, image } = session.user;
  const avatarUrl = image || 'https://via.placeholder.com/40';

  return (
    <div className="flex items-center justify-between gap-2 p-3">
      <div className="flex items-center space-x-2">
        <Image
          src={avatarUrl}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-white text-sm">{name ?? 'Anonymous'}</span>
      </div>
      <form action="/api/auth/signout" method="post">
        <button
          type="submit"
          className="text-sm text-red-400 hover:underline"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

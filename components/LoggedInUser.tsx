'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function LoggedInUser() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex flex-col space-y-2 p-3">
      {/* Create Topic */}
      <a
        href="/ui/topics/new"
        className="flex items-center gap-3 bg-white text-[#00003C] rounded-xl px-4 py-3 shadow hover:bg-gray-100 transition"
      >
        <span className="text-2xl">➕</span>
        <span className="font-medium text-lg">Create Topic</span>
      </a>

      {/* Logged-in User */}
      <div className="flex items-center gap-3 bg-white text-[#00003C] rounded-xl px-4 py-3 shadow">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        )}
        <span className="font-medium text-lg">{session.user.name}</span>
      </div>

      {/* Sign Out */}
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 bg-white text-[#00003C] rounded-xl px-4 py-3 shadow hover:bg-gray-100 transition"
      >
        <span className="text-2xl">⏻</span>
        <span className="font-medium text-lg">Sign Out</span>
      </button>
    </div>
  );
}

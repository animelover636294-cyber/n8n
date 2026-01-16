'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MenuIcon } from 'lucide-react'
import { UserButton, useAuth } from '@clerk/nextjs'

type Props = {}

const Navbar = (props: Props) => {
  const auth = useAuth()
  
  // Handle case when auth is undefined or not loaded
  if (!auth || auth === undefined) {
    return (
      <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-700 justify-between">
        <aside className="flex gap-[2px]">
          <p className="text-3xl font-bold">Fuzzie.</p>
        </aside>
      </header>
    )
  }
  
  const router = useRouter()
  const { isLoaded, userId } = auth

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-700 justify-between">
      <aside className="flex gap-[2px]">
        <p className="text-3xl font-bold">Fuzzie.</p>
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] flex items-center gap-4 ">
        <Link
          href="#"
          className="py-2 px-5 hover:bg-white hover:text-black rounded-full hover:font-bold transition"
        >
          Features
        </Link>
        <Link
          href="#"
          className="py-2 px-5 hover:bg-white hover:text-black rounded-full hover:font-bold transition"
        >
          Community
        </Link>
        <Link
          href="#"
          className="py-2 px-5 hover:bg-white hover:text-black rounded-full hover:font-bold transition"
        >
          Enterprise
        </Link>
      </nav>

      {isLoaded && userId ? (
        <aside className="flex gap-3 items-center">
          <Link
            href="/dashboard"
            className="py-2 px-5 hover:bg-white hover:text-black rounded-full hover:font-bold transition"
          >
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </aside>
      ) : (
        <aside className="flex gap-3 items-center">
          <Link
            href="/sign-in"
            className="py-2 px-5 hover:bg-white hover:text-black rounded-full hover:font-bold transition"
          >
            Sign In
          </Link>
        </aside>
      )}
    </header>
  )
}

export default Navbar

'use client'
import React from 'react'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

type Props = { children: React.ReactNode }

const Layout = async (props: Props) =>{
  
    const { userId } = await auth();
    
    if (!userId) {
      redirect('/sign-in');
    }
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout

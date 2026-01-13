"use client"
import React, { useEffect, useState, ErrorInfo, Component } from 'react'
import dynamic from 'next/dynamic'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Headphones, Search } from 'lucide-react'
import Templates from '../icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
)
import { useBilling } from '@/providers/billing-provider'
import { onPaymentDetails } from '@/app/(main)/(pages)/billing/_actions/payment-connecetions'

type Props = {}

// Error boundary component for UserButton
class UserButtonErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UserButton error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    }
    return this.props.children
  }
}

const SafeUserButton = () => {
  const [mounted, setMounted] = useState(false)
  const [clerkReady, setClerkReady] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Check if Clerk is loaded by checking for the Clerk object
    const checkClerkReady = () => {
      if (typeof window !== 'undefined') {
        // Check if Clerk is available in window and has initialized
        const clerk = (window as any).Clerk
        if (clerk && (clerk.loaded || clerk.__internal || clerk.user || clerk.session || clerk.client)) {
          // Double check that Clerk is actually ready
          setTimeout(() => {
            setClerkReady(true)
          }, 100)
        } else {
          // Retry after a delay, but limit retries
          const maxRetries = 30
          let retries = 0
          const retry = () => {
            retries++
            if (retries < maxRetries) {
              setTimeout(checkClerkReady, 100)
            }
          }
          retry()
        }
      }
    }
    
    // Start checking after component mounts
    if (mounted) {
      checkClerkReady()
    }
  }, [mounted])

  // Show loading if not mounted or Clerk not ready
  // DO NOT render UserButton until Clerk is confirmed ready
  if (!mounted || !clerkReady) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  // Only render UserButton when Clerk is confirmed ready
  return (
    <UserButtonErrorBoundary>
      <UserButton />
    </UserButtonErrorBoundary>
  )
}

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling()

  const onGetPayment = async () => {
    try {
      const response = await onPaymentDetails()
      if (response) {
        setTier(response.tier!)
        setCredits(response.credits!)
      }
    } catch (error) {
      console.error('Failed to get payment details:', error)
    }
  }

  useEffect(() => {
    onGetPayment()
  }, [])

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {tier == 'Unlimited' ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == 'Free' ? '10' : tier == 'Pro' && '100'}
          </span>
        )}
      </span>
      <span className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SafeUserButton />
    </div>
  )
}

export default InfoBar

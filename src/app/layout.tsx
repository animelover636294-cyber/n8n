import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/sonner'
import { BillingProvider } from '@/providers/billing-provider'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fuzzie.',
  description: 'Automate Your Work With Fuzzie.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!clerkKey) {
    console.error('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set')
    // Don't render ClerkProvider if key is missing to prevent errors
    return (
      <html lang="en">
        <body className={font.className}>
          <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Clerk configuration error: Missing publishable key</p>
          </div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      appearance={{
        elements: {
          rootBox: 'mx-auto',
        },
      }}
      allowedRedirectOrigins={
        process.env.NODE_ENV === 'production'
          ? ['https://n8n-pi-flax.vercel.app']
          : ['http://localhost:3000', 'http://localhost:3001']
      }
    >
      <html lang="en">
        <head>
          {clerkKey && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__CLERK_PUBLISHABLE_KEY = '${clerkKey}';
                `,
              }}
            />
          )}
        </head>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BillingProvider>
              <ModalProvider>
                {/* Debug component to log Clerk initialization state in client consoles */}
                {/* Remove in production after debugging */}
                <script dangerouslySetInnerHTML={{__html: `/* Clerk debug: injected */`}} />
                {children}
                <Toaster />
              </ModalProvider>
            </BillingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

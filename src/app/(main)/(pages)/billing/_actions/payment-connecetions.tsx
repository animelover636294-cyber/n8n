'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

      const { userId } = await auth()
    const connection = await db.user.findFirst({
      where: {
        clerkId: user.id,
      },
      select: {
        tier: true,
        credits: true,
      },
    })

        if (userId) {
      return connection
    }
}

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
}

export const { handler, signIn, signOut, auth } = NextAuth(authOptions)

export { handler as GET, handler as POST }

/**
 * Get current user with role information
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    }
  })

  return user
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'ADMIN'
}

/**
 * Require admin access - throw error or redirect if not admin
 */
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'ADMIN') {
    redirect('/unauthorized')
  }

  return user
}

/**
 * API helper to check admin权限
 * Returns error response if not admin
 */
export async function requireAdminApi() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return {
      error: 'Unauthorized',
      status: 401
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })

  if (!user || user.role !== 'ADMIN') {
    return {
      error: 'Forbidden: Admin access required',
      status: 403
    }
  }

  return { user }
}

/**
 * Server Action helper to check admin权限
 */
export async function requireAdminAction() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required')
  }

  return user
}

'use client'

import LoginForm from '@/components/login-form'
import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RootPage = () => {
  const router = useRouter()
  const { user, accessToken, logoutUser } = useUser((s: any) => ({
    user: s.user,
    accessToken: s.accessToken,
    logoutUser: s.logoutUser,
  }))

  const logoutConversations = useConversation(
    (s: any) => s.logoutConversations,
  )

  useEffect(() => {
    logoutConversations()
    logoutUser()
  }, [])

  return (
    <div className=' bg-image h-screen flex items-center justify-center'>
      <div className=' bg-white w-1/2 rounded p-5'>
        <LoginForm />
      </div>
    </div>
  )
}

export default RootPage

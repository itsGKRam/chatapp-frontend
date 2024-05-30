'use client'

import LeftSideBar from '@/components/leftSideBar'
import { RightSideBar } from '@/components/rightSideBar'
import { socket } from '@/lib/utils'
import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export type dummyDataTypes = {
  id: string
  name: string
  imageId: string
  email: string
  messages: {
    message: string
    sender: string
    receiver: string
    time: Date
  }[]
}[]

const ChatPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const conversationId = searchParams.get('conversationId')
  const user = useUser((s: any) => s.user)
  const accessToken = useUser((s: any) => s.accessToken)
  const setConversations = useConversation((s: any) => s.setConversations)
  const activeConversation = useConversation(
    (s: any) => s.activeConversation,
  )
  const setActiveConversationData = useConversation(
    (s: any) => s.setActiveConversationData,
  )

  const activeConversationData = useConversation(
    (s: any) => s.activeConversationData,
  )

  const setActiveConversation = useConversation(
    (s: any) => s.setActiveConversation,
  )

  useEffect(() => {
    if (conversationId !== null) {
      if (accessToken !== null) {
        fetchConversationMessages()
      }
    }
  }, [conversationId, accessToken])

  useEffect(() => {
    if (accessToken !== null) {
      fetchConversations()
    }
  }, [accessToken, activeConversationData])

  useEffect(() => {
    if (accessToken === null) {
      return router.replace('/')
    }
    socket.on(
      `new-conversation-created-${user._id}`,
      async (data: any) => {
        await fetchConversations()
      },
    )
  }, [user])

  const fetchConversations = async () => {
    const res = await axios.get(
      'http://localhost:4000/user/getAllConversations',
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setConversations(res.data)
  }

  const fetchConversationMessages = async () => {
    if (conversationId === 'new') {
      return
    }
    setActiveConversation(conversationId)
    const resData = await axios.get(
      `http://localhost:4000/conversation/getById?conversationId=${conversationId}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setActiveConversationData(resData.data)
  }

  return (
    <div className='flex  h-full'>
      <div className=' w-1/4'>
        <LeftSideBar />
      </div>
      <div className='  flex flex-1'>
        {conversationId ? (
          <RightSideBar />
        ) : (
          <div className=' flex w-full items-center justify-center bg-white m-5 rounded border-dotted'>
            Select User To See the Chat
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage

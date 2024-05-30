'use client'

import { socket } from '@/lib/utils'
import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import RightBody from './rightBody'
import RightFooter from './rightFooter'
import RightHeader from './rightHeader'

export const RightSideBar = ({ data }: any) => {
  const searchParams = useSearchParams()
  const scrollRef = useRef<HTMLDivElement>(null)
  const conversationId = searchParams.get('conversationId')
  const userID = searchParams.get('_id')
  const name = searchParams.get('name')
  const { accessToken } = useUser((s: any) => ({
    accessToken: s.accessToken,
  }))
  const activeConversationData = useConversation(
    (s: any) => s.activeConversationData,
  )
  const activeConversation = useConversation(
    (s: any) => s.activeConversation,
  )
  const setActiveConversationData = useConversation(
    (s: any) => s.setActiveConversationData,
  )

  useEffect(() => {
    socket.on(`conversation-${activeConversation}`, async (data: any) => {
      await setActiveConversationData(data)
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [activeConversation])

  const newConvData =
    conversationId === 'new'
      ? {
          _id: conversationId,
          isGroup: false,
          members: [
            {
              _id: userID,
              name: name,
            },
          ],
          messages: [],
          __v: 31,
          lastMessage: '',
          groupPeople: name,
        }
      : activeConversationData

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationId])

  return newConvData ? (
    <div className=' w-full flex   flex-col relative'>
      <div className=' sticky top-0  left-0 ring-0 w-full p-3 bg-white'>
        <RightHeader userData={newConvData} />
      </div>
      <div className=' flex flex-1 flex-col gap-2 justify-start p-2  scrollbar-hide overflow-hidden overflow-y-scroll'>
        <RightBody messages={newConvData.messages} />
        <div ref={scrollRef}></div>
      </div>
      <div className=' sticky bottom-0  left-0 ring-0 w-full p-3 bg-white'>
        <RightFooter
          scrollRef={scrollRef}
          conversationId={newConvData._id}
        />
      </div>
    </div>
  ) : null
}

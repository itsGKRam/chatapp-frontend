'use client'

import { cn, getTime } from '@/lib/utils'
import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

type UserCardProps = {
  key: string | number
  chat: any
  isHeader?: boolean
}

const UserCard = ({ key, chat, isHeader = false }: UserCardProps) => {
  const accessToken = useUser((s: any) => s.accessToken)
  const router = useRouter()
  const searchParams = useSearchParams()
  const conversationId = searchParams.get('conversationId')
  const setActiveConversation = useConversation(
    (s: any) => s.setActiveConversation,
  )
  const setActiveConversationData = useConversation(
    (s: any) => s.setActiveConversationData,
  )

  const handelCardClick = async () => {
    const query = { conversationId: chat._id }

    setActiveConversation(chat._id)
    const resData = await axios.get(
      `http://localhost:4000/conversation/getById?conversationId=${chat._id}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    )
    setActiveConversationData(resData.data)
    router.push('/chat?' + qs.stringify(query))
  }

  return (
    <div
      key={key}
      onClick={handelCardClick}
      className={cn(
        'p-2 cursor-pointer rounded flex w-full gap-2 items-center',
        chat._id === conversationId ? 'bg-blue-200' : '',
      )}
    >
      <div className=' w-12 h-12 aspect-square flex items-center justify-center text-2xl rounded-full bg-red-300'>
        {chat.members[0]?.name[0]}
      </div>
      <div className=' w-full'>
        <div className=' flex flex-col w-full'>
          <text className=' font-bold'>{chat.members[0]?.name}</text>
        </div>
        <div className=' flex items-center justify-between'>
          <text className=' text-xs line-clamp-1 '>
            {chat?.lastMessage?.content}
          </text>
          <text className=' text-xs whitespace-nowrap'>
            {getTime(chat?.lastMessage?.createdAt)}
          </text>
        </div>
      </div>
    </div>
  )
}

export default UserCard

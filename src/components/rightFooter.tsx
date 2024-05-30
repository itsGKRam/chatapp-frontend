import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import axios from 'axios'
import { PlusIcon, SmileIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

const RightFooter = ({ conversationId, scrollRef }: any) => {
  const router = useRouter()
  const [message, setMessage] = useState('' as string)
  const searchParams = useSearchParams()
  const user_id = searchParams.get('_id')
  const accessToken = useUser((s: any) => s.accessToken)
  const setActiveConversationData = useConversation(
    (s: any) => s.setActiveConversationData,
  )
  const setActiveConversation = useConversation(
    (s: any) => s.setActiveConversation,
  )

  const sendMessage = async () => {
    if (!message) return

    if (conversationId === 'new') {
      const newData = {
        members: [user_id],
        message,
      }

      const res = await axios.post(
        'http://localhost:4000/conversation/create',
        newData,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      )
      setActiveConversation(res.data._id)
      router.replace(`/chat?conversationId=${res.data._id}`)
    }

    try {
      const res = await axios.post(
        'http://localhost:4000/message/send',
        {
          conversationId,
          content: message,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      )
      await setActiveConversationData(res.data)
      setMessage('')
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' flex gap-3 items-end'>
      <Button variant='ghost'>
        <PlusIcon />
      </Button>
      <div className=' bg-white w-full flex items-end'>
        <Button variant='ghost'>
          <SmileIcon />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=' min-h-min'
          placeholder='Type your Message'
        />
      </div>
      <Button variant='default' onClick={sendMessage}>
        Send
      </Button>
    </div>
  )
}

export default RightFooter

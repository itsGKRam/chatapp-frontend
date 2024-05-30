import { cn } from '@/lib/utils'
import { useConversation } from '@/store/conversations'
import { useUser } from '@/store/user'
import axios from 'axios'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import UserCard from './userCard'

const LeftSideBar = () => {
  const [searchUser, setSearchUser] = useState('')
  const router = useRouter()
  const [allUsersData, setAllUsersData] = useState([])
  const [opened, setOpened] = useState(false)
  const { conversations, setConversations } = useConversation(
    (s: any) => ({
      conversations: s.conversations,
      setConversations: s.setConversations,
    }),
  )
  const { accessToken, logoutUser } = useUser((s: any) => ({
    accessToken: s.accessToken,
    logoutUser: s.logoutUser,
  }))

  const logoutConversations = useConversation(
    (s: any) => s.logoutConversations,
  )

  const handleLogout = async () => {
    router.replace('/')
  }

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(
        'http://localhost:4000/user/getAllUsers',
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      )
      setAllUsersData(res.data)
    }

    if (accessToken) {
      getAllUsers()
    }
  }, [accessToken])

  const [searchAllUser, setSearchAllUser] = useState('' as string)

  const handleUserClick = (user: any) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          conversationId: 'new',
          ...user,
        },
      },
      { skipNull: true },
    )
    router.push(url)
    setOpened(false)
  }

  return (
    <div className=' flex flex-col h-full'>
      <div className=' bg-white p-5 flex flex-row ic justify-between'>
        <text>Chats</text>
        <div className=' flex gap-3'>
          <PlusIcon onClick={() => setOpened(true)} />
          {opened && (
            <div className=' backdrop-blur-sm absolute z-50 w-full left-0 top-0  right-0 h-screen flex items-center justify-center'>
              <div className=' bg-white flex flex-col gap-2 w-1/2 p-3 h-1/3 shadow-lg rounded-lg'>
                <div className=' flex flex-row gap-2'>
                  <Input
                    placeholder='Search'
                    value={searchAllUser}
                    onChange={(e) => setSearchAllUser(e.target.value)}
                  />
                  <Button variant='ghost' onClick={() => setOpened(false)}>
                    <XCircleIcon />
                  </Button>
                </div>
                <div className=' flex flex-col'>
                  {allUsersData
                    .filter((user: any) =>
                      user.name
                        .toLowerCase()
                        .includes(searchAllUser.toLowerCase()),
                    )
                    .map((user: any, i: any) => (
                      <text
                        key={i}
                        className=' p-2 hover:bg-gray-200 cursor-pointer'
                        onClick={() => handleUserClick(user)}
                      >
                        {user.name}
                      </text>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=' relative p-2   scrollbar-hide  overflow-hidden overflow-y-scroll flex gap-2 flex-col flex-1'>
        <div className=' sticky top-0 right-0 left-0'>
          <div className=' relative '>
            <Input
              placeholder='Search'
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div
              className={cn(
                ' absolute bottom-[-2] bg-white w-full max-h-40 overflow-y-scroll mt-2 rounded',
                opened ? 'block' : 'hidden',
              )}
            ></div>
            <div className=' bg-red-500 rounded-lg shadow-xl absolute  bottom-[-2] mt-2 left-0 right-0 w-full'></div>
          </div>
        </div>
        <div className=' flex flex-col flex-1 gap-2 '>
          {conversations &&
            conversations
              .filter((user: any) =>
                user.members[0].name
                  .toLowerCase()
                  .includes(searchUser.toLowerCase()),
              )
              .map((chat: any, i: any) => (
                <UserCard key={i} chat={chat} />
              ))}
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default LeftSideBar

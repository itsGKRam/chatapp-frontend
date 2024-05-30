import { cn, getTime } from '@/lib/utils'
import { useUser } from '@/store/user'

const RightBody = ({ messages }: any) => {
  const user = useUser((s: any) => s.user)

  return messages.map((item: any) => (
    <div
      key={item._id}
      className={cn(
        ' flex',
        item.sender === user._id ? 'justify-end' : 'justify-start',
      )}
    >
      <text className=' bg-blue-200 max-w-[80%]  p-1 rounded flex items-end gap-2'>
        {item.content}{' '}
        <span className=' text-[0.6rem]'>{getTime(item.createdAt)}</span>
      </text>
    </div>
  ))
}

export default RightBody

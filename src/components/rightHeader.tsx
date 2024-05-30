'use client'

const RightHeader = ({ userData }: any) => {
  return (
    <div className='flex w-full gap-2 items-center'>
      <div className=' flex flex-col w-full'>
        <text className=' font-bold'>{userData?.members[0]?.name}</text>
        <text className=' text-xs'>You, {userData?.groupPeople}</text>
      </div>
      <div className=' flex flex-row whitespace-nowrap'></div>
    </div>
  )
}

export default RightHeader

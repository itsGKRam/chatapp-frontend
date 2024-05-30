'use client'

import { useUser } from '@/store/user'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const { setUser, setAccessToken } = useUser((s: any) => ({
    setUser: s.setUser,
    setAccessToken: s.setAccessToken,
  }))

  const handelSubmit = async () => {
    if (!formData.name || !formData.email)
      return alert('Please fill all fields')
    const data = {
      name: formData.name,
      email: formData.email,
      imageId: '345678765434567',
    }
    const res = await axios.post('http://localhost:4000/user/auth', data)
    const { accessToken, user } = res.data
    setAccessToken(accessToken)
    setUser(user)
    router.push('/chat')
  }

  return (
    <div className=' flex gap-2 flex-col'>
      <div className=' flex justify-center items-center'>
        <Image
          src={`https://robohash.org/345678765434567`}
          alt='Image'
          width={100}
          height={100}
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <text>Name</text>
        <input
          type='text'
          className=' w-full input input-bordered bg-white'
          placeholder='Name'
          value={formData.name}
          onChange={(e) => {
            setFormData((prev: any) => ({ ...prev, name: e.target.value }))
          }}
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <text>Email</text>
        <input
          type='email'
          className=' w-full input input-bordered bg-white'
          placeholder='Name'
          value={formData.email}
          onChange={(e) => {
            setFormData((prev: any) => ({
              ...prev,
              email: e.target.value,
            }))
          }}
        />
      </div>
      <button onClick={handelSubmit}>Submit</button>
    </div>
  )
}

export default LoginForm

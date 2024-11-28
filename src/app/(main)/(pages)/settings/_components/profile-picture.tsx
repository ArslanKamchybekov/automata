'use client'
import React from 'react'
import UploadCareButton from './uploadcare-button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type Props = {
  userImage: string | null
  onDelete?: any
  onUpload: any
}

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter()

  const onRemoveProfileImage = async () => {
    const response = await onDelete()
    if (response) {
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <p className="text-lg font-semibold text-white">Profile Picture</p>
      <div className="flex flex-row items-center gap-4">
        {userImage ? (
          <>
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src={userImage}
                alt="User's Profile Picture"
                fill
                className="object-cover"
              />
            </div>
            <Button
              onClick={onRemoveProfileImage}
              className="bg-transparent text-white/70 hover:bg-transparent hover:text-white"
            >
              <X className="w-4 h-4" />
              Remove Logo
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCareButton onUpload={onUpload} />
          </div>
        )}
      </div>
    </div>

  )
}

export default ProfilePicture
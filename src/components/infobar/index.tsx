'use client'
import React, { useEffect } from 'react'
import { Book, Headphones } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { useBilling } from '@/providers/billing-provider'
import { onPaymentDetails } from '@/app/(main)/(pages)/billing/_actions/payment-connections'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'

type Props = object

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling()

  const onGetPayment = async () => {
    const response = await onPaymentDetails()
    if (response) {
      setTier(response.tier!)
      setCredits(response.credits!)
    }
  }

  useEffect(() => {
    onGetPayment()
  }, [])

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full ">
      {/* <span className="flex items-center gap-2 font-bold">
        <span className="font-semibold">Credits: </span>
        {tier == 'Unlimited' ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == 'Free' ? '10' : tier == 'Pro' && '100'}
          </span>
        )}
      </span> */}
      <button
        onClick={() => {
          window.location.href = 'mailto:kamchybekov.arslan.us@gmail.com';
        }}
      >
        <Headphones size={24} />
      </button>
      <button
        onClick={() => {
          window.location.href = 'https://cookie-paper-810.notion.site/Automata-Documentation-Write-up-15034142cd0c806a8a1bc8803dee22a4';
        }}
      >
        <Book size={24} />
      </button>
      <UserButton />
    </div>
  )
}

export default InfoBar
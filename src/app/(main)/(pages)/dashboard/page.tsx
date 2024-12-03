import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { currentUser } from '@clerk/nextjs/server'
import { getUserData } from '../connections/_actions/get-user'
import Link from 'next/link'

const DashboardPage = async () => {
  const user = await currentUser()

  const userData = user?.id ? await getUserData(user.id) : null

  return (
    <div className="flex flex-col gap-6 relative">
      <h1 className="text-4xl font-bold sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Dashboard
      </h1>
    
      {/* User Overview */}
      <div className="flex flex-col p-6 gap-6">
        {/* Meet the user */}
        <h2 className="text-4xl font-semibold">Welcome, {user?.fullName}!</h2>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Account Overview</h2>
          <div className="flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Tier</CardTitle>
                {userData?.tier === 'Free' ? (
                  <div className="flex flex-col gap-2">
                    <CardDescription>Free</CardDescription>
                    <Link href="/billing" className='text-green-500'>Upgrade</Link>
                  </div>
                ) : (
                  <CardDescription>{userData?.tier}</CardDescription>
                )}
              </CardHeader>
              <CardHeader>
                <CardTitle>Connections</CardTitle>
                {userData?.connections.length ===  0 ? (
                  <div className="flex flex-col gap-2">
                    <CardDescription>You have no connections</CardDescription>
                    <Link href="/connections" className='text-green-500'>Add Connection</Link>
                  </div>
                  ) : (
                    <CardDescription>You have {userData?.connections.length} connections</CardDescription>
                  )}
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage

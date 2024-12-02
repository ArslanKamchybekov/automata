import ProfileForm from '@/components/forms/profile-form';
import React from 'react';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

const Settings = async () => {
  const authUser = await currentUser();

  if (!authUser) {
    return <div>Please log in to view this page.</div>;
  }

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });
  if (!user) {
    return <div>User not found. Please try again later.</div>;
  }

  const updateUserInfo = async (name: string) => {
    'use server';
    try {
      const updateUser = await db.user.update({
        where: { clerkId: authUser.id },
        data: { name },
      });
      return updateUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky font-bold top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;

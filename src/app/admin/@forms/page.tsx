import { AddCategory, AddProduct } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs'
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

async function AdminPage() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata.role === 'admin';

  if (!isAdmin) {
    return <div className='h-screen flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-4xl font-bold'>Unauthorized</h1>
      <p className='text-lg'>You must be an admin to access this page</p>
      <Button asChild>
        <Link href='/'>
          <Home className='mr-2' />
          Go back home
        </Link>
      </Button>
    </div>
  }

  return (
    <section className='space-y-2 w-full p-4'>
      <AddCategory />
      <div className="col-span-2"></div>
      <AddProduct />
    </section>
  )
}

export default AdminPage
import React from 'react'
import InventoryTable from '../_components/InventoryTable'
import { stackServerApp } from '@/stack';
import { SignUp } from '@stackframe/stack';
import { getCategories, getItems } from '@/actions/items.actions';


const page = async () => {
    const user = await stackServerApp.getUser();
    const app = stackServerApp.urls;

    const items = await getItems();
    const itemCat = await getCategories();

  return (
    <>
      {
        user ? (
            <div className='mt-55 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
                <div className='lg:col-span-full'>
                    <InventoryTable items={items} category={itemCat}/>
                </div>
                
            </div>
        ) : (
            <div className='flex mt-55 items-center justify-center'>
                <SignUp/>
            </div>
        ) 
      }
    </>
  )
}

export default page

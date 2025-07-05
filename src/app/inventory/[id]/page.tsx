import { getItemById } from '@/actions/items.actions'
import LoadingCircle from '@/components/loading'
import React from 'react'
import ItemCard from './ItemCard';

const page = async ({params} : {params : Promise<{id:string}>}) => {
  const awaitedParam = await params;
  const [id] = awaitedParam.id.split('-')
  const item = await getItemById(id);
  return (
    <>
      { item ? 
      (
        <div className='flex min-h-screen items-center justify-center'>
        <ItemCard item={item}/>
        </div>
      ) 
      :
      (
        <div className='flex min-h-screen items-center justify-center'>
          <LoadingCircle/>
        </div>
      )
      }
      
    </>
  )
}

export default page

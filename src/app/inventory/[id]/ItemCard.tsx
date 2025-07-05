
import { getItemById } from "@/actions/items.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Item = Awaited<ReturnType<typeof getItemById>>

interface ItemCardProps {
    item : Item
}

const ItemCard = ( {item} : ItemCardProps ) => {
  return (
    <div className="flex items-center justify-center mt-10">
        <Card className="md:w-[80rem] shadow-none">
            <div className="flex flex-row">
                <div className="basis-2/4">
                <CardHeader className="pt-2 pb-2 px-6 flex-row items-center gap-3 font-semibold">
                    <div className="aspect-video rounded-xl" >
                        {item?.imageUrl ?
                            <img src={item?.imageUrl || undefined} alt="Item Image" className="w-full h-full object-fit rounded-xl"/> :
                            <div className="flex items-center justify-center w-full bg-gray-300 aspect-video rounded-xl dark:bg-gray-100 dark:text-[#1e1e1e]"> 
                                No Image
                            </div>
                        }
                    </div>
                </CardHeader>
                </div>
                <CardContent className="text-[16px] text-primary px-5">
                    <h1 className="text-4xl font-semibold text-primary">
                        {item?.name}
                    </h1>
                    <div className="flex flex-col gap-1 mt-2">
                        <Badge className="w-fit mb-5">{item?.category?.name}</Badge>
                        <p className="text-lg">
                            Price: ${item?.price}
                        </p>
                        <p className="text-lg">
                            Quantity: {item?.stock} 
                        </p>
                        <p className="text-lg">
                            Description: {item?.description}
                        </p>
                        
                    </div>
                </CardContent>
            </div>
        </Card>
    </div>
  );
};

export default ItemCard;

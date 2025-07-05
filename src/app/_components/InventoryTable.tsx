"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {  Pencil, Search, TrashIcon } from "lucide-react";
import { CategoryDropdown } from "./CategoryDropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteItem, getCategories, getItems } from "@/actions/items.actions";
import { Badge } from "@/components/ui/badge";
import LoadingCircle from "@/components/loading";
import AddItemButton from "./AddItem";
import EditItem from "./EditItem";
import AddCategory from "./AddCategory";


type Item = Awaited<ReturnType<typeof getItems>>
type Category = Awaited<ReturnType<typeof getCategories>>

interface InventoryTableProps {
    items: Item,
    category: Category,
}
  
  export default function InventoryTable({items, category}: InventoryTableProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    

    const router = useRouter();

    const filteredItems = items?.items?.filter((item) => {
        let matchesCategory = selectedCategory ? item.category?.name.toLowerCase() === selectedCategory.toLowerCase() : true;

        if (selectedCategory.toLowerCase() === "all categories"){
            matchesCategory = true
        }

        const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;

        return matchesCategory && matchesSearch;
    });


    if(!items && !category){
        return (
        <div className="flex justify-center items-center">
            <LoadingCircle/>
        </div>
        );
    }

    return (
        <>
            <div className="w-full">
                <div className="flex items-center gap-2 py-4">
                    <div className="relative max-w-[20rem] min-w-[10rem] w-full">
                        <Search className="absolute left-[10px] md:left-[7px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"/>
                        <Input      
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 max-w-xs focus-visible:ring-[3px] focus-visible:ring-blue-500/20 focus-visible:border-blue-500"/>
                    </div>
                    <CategoryDropdown value={selectedCategory} onChange={setSelectedCategory} category={category}/>
                    <div className="flex justify-end items-end ml-auto gap-2">
                        <AddItemButton category={category}/>
                        <AddCategory category={category}/>
                    </div>
                    
                </div>
            </div>


        <div className="w-full border rounded-md overflow-hidden">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Item ID</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center w-[100px]">Category</TableHead>
                    <TableHead className="text-center w-[100px]">Price</TableHead>
                    <TableHead className="text-center w-[100px]">Stock</TableHead>
                    <TableHead className="text-right w-[300px]">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredItems.map((item) => {
                    const itemName = item.name.replace(/\s+/g, '-').toLowerCase();
                    const url = `/inventory/${item.id}-${itemName}`
                    return (
                    <TableRow
                    key={item.id}
                    className="odd:bg-muted/50"
                    onClick={() => router.push(url)}    
                    >
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="text-center">{item.name}</TableCell>
                    <TableCell className="text-center"><Badge>{item.category?.name}</Badge></TableCell>
                    <TableCell className="text-center">{item.price}</TableCell>
                    <TableCell className="text-center">{item.stock}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                        <div className="flex justify-end space-x-4" onClick={(e)=>e.stopPropagation()}>
                        <EditItem item={item} category={category}/>
                        </div>
                        <Button className="cursor-pointer bg-red-500" onClick={(e) => {
                            deleteItem(item.id)
                            e.stopPropagation();
                        }}>
                            <TrashIcon/>
                            Delete
                        </Button>
                    </TableCell>
                    </TableRow>
                )})}
                </TableBody>
            </Table>
        </div>
      </>
    );
  }
  
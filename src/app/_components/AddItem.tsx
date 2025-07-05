import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryDropdown } from "./CategoryDropdown";
import { useState } from "react";
import { createItem, getCategories, getCategoryId } from "@/actions/items.actions";
import { Textarea } from "@/components/ui/textarea";
import toast from 'react-hot-toast';
import ImageUpload from "./ImageUpload";

type Category = Awaited<ReturnType<typeof getCategories>>

interface AddItemButtonProps {
    category: Category
}

  
  export default function AddItemButton({category} : AddItemButtonProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
    });

    const handleChange = ((key: string, val: string | number) => {
        setFormData({
            ...formData,
            [key]: val,
        });
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
        setIsOpen(false);
        const catId = await getCategoryId(selectedCategory);

        const finalData = {
            ...formData,
            categoryId: catId,
        };

            const itemCreate = await createItem(finalData);
            toast.success("Item added successfully");
        }catch(err){
            console.error(err);
        }
    }
    
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-blue-500 cursor-pointer text-white dark:bg-blue-500 dark:text-black">📦Add Item</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Item</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Add a new item to your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input type="text" id="item-name" placeholder="Item Name" onChange={(e)=>handleChange("name",e.target.value)} required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="item-cat">Category</Label>
                    <div className="flex flex-row space-x-1">
                        <CategoryDropdown value={selectedCategory} onChange={setSelectedCategory} category={category}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-3 justify-between">
                <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="item-price">Price</Label>
                    <Input type="number" id="item-price" placeholder="Price" onChange={(e) => handleChange("price", Number(e.target.value))} required/>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="item-stock">Stock</Label>
                    <Input type="number" id="item-stock" placeholder="Stock" onChange={(e) => handleChange("stock", Number(e.target.value))} required/>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-3 mb-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Add item description" onChange={(e)=>handleChange("description",e.target.value)} required/>
            </div>
            <Label htmlFor="image" className="mb-2">Image</Label>
            <ImageUpload endpoint="postImage" value={formData.imageUrl} onChange={(url) => {
              handleChange("imageUrl", url);
            }}/>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" className="bg-blue-500 text-white">Add Item</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
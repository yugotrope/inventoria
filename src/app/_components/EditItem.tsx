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
import { useEffect, useState } from "react";
import { updateItem, getCategories, getCategoryId, getItems } from "@/actions/items.actions";
import AddCategory from "./AddCategory";
import { Textarea } from "@/components/ui/textarea";
import toast from 'react-hot-toast';
import { Pencil } from "lucide-react";

type Item = NonNullable<Awaited<ReturnType<typeof getItems>>>
type Category = Awaited<ReturnType<typeof getCategories>>

interface AddItemButtonProps {
    item: Item["items"][0],
    category: Category,
}

  
  export default function EditItem({item, category} : AddItemButtonProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    
    const [formData, setFormData] = useState({
      name: item?.name.trim(),
      categoryId: (item?.categoryId || "").trim(),
      description: (item?.description || "").trim(),
      price: item?.price,
      stock: item?.stock,
      userId: (item?.userId || "").trim(),
      imageUrl: "",
    });

    useEffect(() => {
      setSelectedCategory((item?.categoryId || "").trim());
    },[]);

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


        const updateItemData = await updateItem(finalData,item.id);

            toast.success("Item updated successfully");
        }catch(err){
            console.error(err);
        }
    }
    
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-blue-500 cursor-pointer text-white dark:bg-blue-500 dark:text-black"><Pencil/>Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Item</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Edit an item in your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input type="text" id="item-name" value={formData.name} onChange={(e)=>handleChange("name",e.target.value)} required/>
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
                    <Input type="number" id="item-price" value={formData.price} placeholder="Price" onChange={(e) => handleChange("price", Number(e.target.value))} required/>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="item-stock">Stock</Label>
                    <Input type="number" id="item-stock" value={formData.stock} placeholder="Stock" onChange={(e) => handleChange("stock", Number(e.target.value))} required/>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-3 mb-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Add item description" value={formData.description} onChange={(e)=>handleChange("description",e.target.value)} required/>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" className="bg-blue-500 text-white">Edit Item</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
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
import { createCategory, getCategories } from "@/actions/items.actions";
import { Plus } from "lucide-react";
import toast from 'react-hot-toast';

type Category = Awaited<ReturnType<typeof getCategories>>

interface AddCategoryProps {
    category: Category
}
  
  export default function AddCategory({category}: AddCategoryProps) {
    const [categoryName, setCategoryName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(category.categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase())){
            toast.error("Category already exists.");
            return;
        }

        const finalData = {
            name: categoryName,
        }

        try{
          setIsOpen(false);
          const newCat = await createCategory(finalData);

          toast.success("Category created successfully.");
        } catch(err){
            toast.error("Failed to create category."); 
        }
    }
    
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className=" cursor-pointer"><Plus/>Add Category</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Category</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Add a new category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-3">
                <div className="flex flex-col gap-3 flex-1">
                    <Label htmlFor="item-name">Name</Label>
                    <Input type="text" id="item-name" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button type="submit" className="bg-blue-500 text-white">Add Category</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
"use server"
import { Prisma } from "@/generated/prisma";
import { getUserId } from "./user.actions"
import {db} from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function getItems() {
    try{
        const currUserId = await getUserId();

        const whereClause: any = {
            userId: currUserId,
        }

        const items = await db.item.findMany({
            where: whereClause,
            include: {
                category: true,
            }
        })

        return {success: true, items}

    } catch (error) {
        console.error("Error fetching items:", error);
        throw new Error("Failed to fetch items")
    }

}

export async function getCategories() {
    try{
    const currUserId = await getUserId();

    const whereClause: any = {
        userId: currUserId,
    }

    const categories = await db.categories.findMany({
        where: whereClause,
    })

    return {success: true, categories}
    }catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories")
    }
}

export async function createItem(data: Prisma.ItemCreateInput) {
    try{
        const currUserId = await getUserId();

        if(!currUserId) {
            throw new Error("User not authenticated")
        };

        const newItem = await db.item.create({
            data: {
                ...data,
                userId: currUserId,
            }
        });

        revalidatePath("/");

        return newItem;
    } catch (error) {
        console.error("Error creating item:", error);
        throw new Error("Failed to create item") ;
    }
}

export async function updateItem(data: Prisma.ItemUpdateInput, id: string){
    try{
        const currUserId = await getUserId();

        if(!currUserId) {
            throw new Error("User not authenticated")
        };

        const updatedItem = await db.item.update({
            where: {
                id,
            },
            data: {
                ...data,
            }
        });

        revalidatePath("/");

        return updatedItem;
    }catch (error) {
        console.error("Error updating item:", error);
        throw new Error("Failed to update item")
    }
}

export async function deleteItem(id:string){
    try{
        const currUserId = await getUserId();

        if(!currUserId) {
            throw new Error("User not authenticated")
        };
        
        const whereClause: any = {
            id: id,
            userId: currUserId, 
        }

        const deletedItem = await db.item.delete({
            where: whereClause,
        })
    } catch (error) {
        console.error("Error deleting item:", error);
        throw new Error("Failed to delete item")
    }
}

export async function createCategory(data: Prisma.CategoriesCreateInput){
    try{
        const currUserId = await getUserId();

        if(!currUserId) {
            throw new Error("User not authenticated")
        };

        const newCategory = await db.categories.create({
            data: {
                ...data,
                userId: currUserId,
            }
        })
    } catch(error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category") 
    }
}

export async function getCategoryId(data: string){
    try{ 
    const currUserId = await getUserId();

    if(!currUserId) {
        throw new Error("User not authenticated")
    };

    const category = await db.categories.findFirst({
        where: {
            userId: currUserId,
            name: data,
        }
    });

    return category?.id;
    } catch (error) {
        console.error("Error fetching category id:", error);
        throw new Error("Failed to fetch category id")
    }

}

export async function getItemById(id: string) {
    try{
        const currUserId = await getUserId();

        if(!currUserId) {
            throw new Error("User not authenticated")
        }; 

        const item = await db.item.findFirst({
            where: {
                userId: currUserId,
                id: id,
            },
            include: {
                category: true,
            }
        });

        return item;
    }  catch (error) {
        console.error("Error fetching item:", error);
        throw new Error("Failed to fetch item")
    }
}
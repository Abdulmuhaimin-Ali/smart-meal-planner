import React, { createContext, useContext, useState, ReactNode } from "react";
import { GroceryItem, FoodCategory } from "../models/GroceryItem";
import uuid from "react-native-uuid";

interface GroceryContextType {
  groceryItems: GroceryItem[];
  addItem: (
    name: string,
    category: FoodCategory,
    quantity: number,
    unit?: string
  ) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<GroceryItem>) => void;
  getItemsByCategory: (category: FoodCategory) => GroceryItem[];
  categories: FoodCategory[];
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export const GroceryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);

  const categories: FoodCategory[] = [
    "vegetables",
    "fruits",
    "poultry",
    "meat",
    "dairy",
    "grains",
    "canned",
    "frozen",
    "snacks",
    "beverages",
    "other",
  ];

  const addItem = (
    name: string,
    category: FoodCategory,
    quantity: number,
    unit?: string
  ) => {
    const newItem: GroceryItem = {
      id: uuid.v4().toString(),
      name,
      category,
      quantity,
      unit,
      isChecked: false,
    };
    setGroceryItems([...groceryItems, newItem]);
  };

  const removeItem = (id: string) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const updateItem = (id: string, updates: Partial<GroceryItem>) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const getItemsByCategory = (category: FoodCategory) => {
    return groceryItems.filter((item) => item.category === category);
  };

  return (
    <GroceryContext.Provider
      value={{
        groceryItems,
        addItem,
        removeItem,
        toggleItem,
        updateItem,
        getItemsByCategory,
        categories,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (context === undefined) {
    throw new Error("useGrocery must be used within a GroceryProvider");
  }
  return context;
};

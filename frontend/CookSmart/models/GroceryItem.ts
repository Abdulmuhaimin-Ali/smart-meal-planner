export type FoodCategory =
  | "vegetables"
  | "fruits"
  | "poultry"
  | "meat"
  | "dairy"
  | "grains"
  | "canned"
  | "frozen"
  | "snacks"
  | "beverages"
  | "other";

export interface GroceryItem {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  unit?: string;
  isChecked: boolean;
}

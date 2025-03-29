import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FoodCategory, GroceryItem } from "../models/GroceryItem";
import GroceryListItem from "./GroceryListItem";
import { useGrocery } from "../contexts/GroceryContext";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";

type CategorySectionProps = {
  category: FoodCategory;
  items: GroceryItem[];
};

export default function CategorySection({
  category,
  items,
}: CategorySectionProps) {
  const { toggleItem, removeItem } = useGrocery();
  const colorScheme = useColorScheme() || "light";
  const colors = Colors[colorScheme];

  if (items.length === 0) return null;

  const categoryLabels: Record<FoodCategory, string> = {
    vegetables: "Vegetables",
    fruits: "Fruits",
    poultry: "Poultry",
    meat: "Meat",
    dairy: "Dairy & Eggs",
    grains: "Grains & Bread",
    canned: "Canned Goods",
    frozen: "Frozen Foods",
    snacks: "Snacks",
    beverages: "Beverages",
    other: "Other Items",
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>
        {categoryLabels[category] || category}
      </Text>
      {items.map((item) => (
        <GroceryListItem
          key={item.id}
          item={item}
          onToggle={() => toggleItem(item.id)}
          onDelete={() => removeItem(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
});

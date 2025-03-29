import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GroceryItem } from "../models/GroceryItem";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";

type GroceryListItemProps = {
  item: GroceryItem;
  onToggle: () => void;
  onDelete: () => void;
};

export default function GroceryListItem({
  item,
  onToggle,
  onDelete,
}: GroceryListItemProps) {
  const colorScheme = useColorScheme() || "light";
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Pressable onPress={onToggle} style={styles.checkboxContainer}>
        <Ionicons
          name={item.isChecked ? "checkbox" : "square-outline"}
          size={24}
          color={colors.tint}
        />
      </Pressable>

      <View style={styles.itemDetails}>
        <Text
          style={[
            styles.itemName,
            item.isChecked && styles.checkedText,
            { color: colors.text },
          ]}
        >
          {item.name}
        </Text>
        <Text style={[styles.itemQuantity, { color: colors.icon }]}>
          {item.quantity} {item.unit || ""}
        </Text>
      </View>

      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={22} color={colors.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkboxContainer: {
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkedText: {
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  itemQuantity: {
    fontSize: 14,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
});

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useGrocery } from "../contexts/GroceryContext";
import { FoodCategory } from "../models/GroceryItem";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";

type AddGroceryItemModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddGroceryItemModal({
  visible,
  onClose,
}: AddGroceryItemModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<FoodCategory>("other");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("");

  const { addItem, categories } = useGrocery();
  const colorScheme = useColorScheme() || "light";
  const colors = Colors[colorScheme];

  const handleAddItem = () => {
    if (name.trim() && Number(quantity) > 0) {
      addItem(
        name.trim(),
        category,
        Number(quantity),
        unit.trim() || undefined
      );
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("other");
    setQuantity("1");
    setUnit("");
  };

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Add Grocery Item
            </Text>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Item Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.icon },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter item name"
                placeholderTextColor={colors.icon}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Category
              </Text>
              <View
                style={[styles.pickerContainer, { borderColor: colors.icon }]}
              >
                <Picker
                  selectedValue={category}
                  onValueChange={(value) => setCategory(value as FoodCategory)}
                  style={{ color: colors.text }}
                >
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat}
                      label={categoryLabels[cat]}
                      value={cat}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.quantityRow}>
              <View style={[styles.formGroup, styles.quantityInput]}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Quantity
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon },
                  ]}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="1"
                  placeholderTextColor={colors.icon}
                />
              </View>

              <View style={[styles.formGroup, styles.unitInput]}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Unit (optional)
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon },
                  ]}
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="lbs, oz, etc."
                  placeholderTextColor={colors.icon}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.addButton,
                  { backgroundColor: colors.tint },
                ]}
                onPress={handleAddItem}
              >
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityInput: {
    flex: 1,
    marginRight: 10,
  },
  unitInput: {
    flex: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  addButton: {
    backgroundColor: "#0a7ea4",
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

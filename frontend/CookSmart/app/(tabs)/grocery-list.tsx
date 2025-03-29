import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGrocery } from "../../contexts/GroceryContext";
import CategorySection from "../../components/CategorySection";
import AddGroceryItemModal from "../../components/AddGroceryItemModal";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

export default function GroceryListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { groceryItems, categories } = useGrocery();
  const colorScheme = useColorScheme() || "light";
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Grocery List
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {groceryItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="basket-outline" size={64} color={colors.icon} />
            <Text style={[styles.emptyStateText, { color: colors.text }]}>
              Your grocery list is empty
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: colors.icon }]}>
              Tap the + button to add items
            </Text>
          </View>
        ) : (
          categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              items={groceryItems.filter((item) => item.category === category)}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.tint }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <AddGroceryItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

<template>
  <v-card>
    <v-card-title>
      <h2>Add New Item</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="item.name"
          label="Item Name"
          :rules="[rules.required]"
          required
        />
        <v-text-field
          v-model="item.quantity"
          label="Quantity"
          type="number"
          :rules="[rules.required, rules.positive]"
          required
        />
        <v-text-field
          v-model="item.price"
          label="Price"
          type="number"
          prefix="₱"
          :rules="[rules.required, rules.positive]"
          required
        />
        <v-text-field
          v-model="item.barcode"
          label="Barcode"
          :rules="[rules.required]"
          required
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="error" text @click="resetForm">Cancel</v-btn>
      <v-btn color="success" :disabled="!valid" @click="saveItem">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { rules } from "~/util/rules";
import { useItemsStore } from "~/stores";
const valid = ref(false);
const itemsStore = useItemsStore();

// Form data
const item = ref({
  name: "",
  quantity: null,
  price: null,
  barcode: "",
});

// Methods
const resetForm = () => {
  item.value = {
    name: "",
    quantity: null,
    price: null,
    barcode: "",
  };
};

const saveItem = async () => {
  if (!valid.value) return;

  // Perform save action (e.g., API call or adding to local state)
  try {
    const data = await itemsStore.saveItem(item.value);

    await itemsStore.fetchItems();

    resetForm();
  } catch (e) {
    alert(e.message);
  }
};
</script>

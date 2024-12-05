<template>
  <v-card>
    <v-card-title class="d-flex">
      <h2>Item List</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        clearable
        append-icon="mdi-magnify"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="itemsStore.itemsList"
        no-data-text="No items found."
        :search="search"
      >
        <template #item.actions="{ item }">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" size="sm" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editItem(item)" prepend-icon="mdi-pencil">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteItem(item)" prepend-icon="mdi-delete">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="printBarcode(item)"
                prepend-icon="mdi-barcode"
              >
                <v-list-item-title>Print Barcode</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useItemsStore } from "~/stores";

// Access the store
const itemsStore = useItemsStore();

// Fetch items on component mount
onMounted(async () => {
  await itemsStore.fetchItems();
});

const search = ref("");

const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Quantity", value: "quantity", sortable: true },
  { title: "Price", value: "price", sortable: true },
  { title: "Barcode", value: "barcode", sortable: true },
  { title: "Actions", value: "actions", sortable: false },
];

const editItem = (item) => {
  console.log(item);
};
const deleteItem = async (item) => {
  await itemsStore.deleteItem(item);
  await itemsStore.fetchItems();
};

const printBarcode = (item) => {
  console.log(item);
};
</script>

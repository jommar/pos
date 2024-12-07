<template>
  <div>
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
                <v-list-item
                  @click="deleteItem(item)"
                  prepend-icon="mdi-delete"
                >
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
          <template #item.priceHistory="{ item }">
            <v-chip
              v-for="history in item.priceHistory"
              :key="`${item._id}-${history.date}`"
              size="sm"
              class="mx-1 px-2"
              color="green-darken-3"
            >
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <span v-bind="props">
                    {{ `₱${parseFloat(history.price).toFixed(2)}` }}
                  </span>
                </template>
                <span>
                  Updated At:
                  {{ new Date(history.date).toLocaleString() }}
                </span>
              </v-tooltip>
            </v-chip>
          </template>
          <template #item.currentPrice="{ item }">
            <span>₱{{ parseFloat(item.currentPrice).toFixed(2) }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showConfirmDialog">
      <v-card>
        <v-card-text class="text-center" persistent>
          <div>Are you sure you want to delete?</div>
          <div>{{ itemToDelete?.name }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="showConfirmDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
const showConfirmDialog = ref(false);
const itemToDelete = ref(null);

const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Quantity", value: "quantity", sortable: true },
  { title: "Price", value: "currentPrice", sortable: true },
  { title: "Price History", value: "priceHistory", sortable: false },
  { title: "Barcode", value: "barcode", sortable: false },
  { title: "Actions", value: "actions", sortable: false },
];

const editItem = (item) => {
  useRouter().push(`/item/${item._id}`);
};
const deleteItem = async (item) => {
  showConfirmDialog.value = true;
  itemToDelete.value = item;
};
const confirmDelete = async () => {
  try {
    await itemsStore.deleteItem(itemToDelete.value);
    await itemsStore.fetchItems();
    showConfirmDialog.value = false;
    itemToDelete.value = null;
  } catch (e) {
    console.error(e);
  }
};

const printBarcode = (item) => {
  console.log(item);
};
</script>

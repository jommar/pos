<template>
  <div>
    <v-card>
      <v-card-title>
        <h2>Item Details</h2>
      </v-card-title>
      <v-card-text>
        <template v-if="item">
          <v-text-field label="Item Name" v-model="item.name"></v-text-field>
          <v-text-field
            label="Price"
            v-model="item.currentPrice"
          ></v-text-field>
          <v-text-field label="Quantity" v-model="item.quantity"></v-text-field>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">Delete</v-btn>
        <v-btn color="success">Update</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="viewHistory">View Price History</v-btn>
        <v-btn color="primary" to="/inventory">Back</v-btn>
      </v-card-actions>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      location="bottom"
      temporary
      width="800"
    >
      <v-card>
        <v-card-title>Price History</v-card-title>
        <v-card-text>
          <template v-if="item">
            <template v-for="history in item.priceHistory" :key="history._id">
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    {{ `₱${parseFloat(history.price).toFixed(2)}` }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Updated At: {{ new Date(history.date).toLocaleString() }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
          </template>
        </v-card-text>
        <v-card-actions class="bg-blue-lighten-4">
          <v-spacer />
          <v-btn color="black" @click="drawer = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const item = ref(null);
const drawer = ref(false);

const fetchItem = async () => {
  try {
    const res = await useItemsStore().fetchItemById(useRoute().params.id);
    item.value = res;
  } catch (error) {
    console.error(error);
  }
};

const viewHistory = () => {
  drawer.value = true;
};

onMounted(() => {
  fetchItem();
});
</script>

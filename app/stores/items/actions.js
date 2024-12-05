import axios from "axios";

export const actions = {
  async fetchItems() {
    try {
      const res = await axios.get("/api/items");

      this.items = res.data.items;
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  },
  async saveItem(item) {
    try {
      await axios.post("/api/items", item);
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  },
  async deleteItem(item) {
    try {
      await axios.delete("/api/items", { data: item });
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  },
};

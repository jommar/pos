export const actions = {
  toggle() {
    this.isOpen = !this.isOpen;
  },
  open() {
    this.isOpen = true;
  },
  close() {
    this.isOpen = false;
  },
};

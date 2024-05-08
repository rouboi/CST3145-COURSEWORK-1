var webstore = new Vue({
  el: "#open",
  data: {
    showProduct: true,
    lowHigh: "asc",
    subjects: mySub,
    cart: [],
    searchInput: "",
    sortBy: "title",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  methods: {
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    addToCart(subject) {
      this.cart.push(subject);
    },
    checkOut() {
      let show = this.cart;
      return show;
    },
    removeCartItem(id) {
      let showcart = this.cart;
      let less = this.subjects;
      for (let i = 0; i < showcart.length; i++) {
        if (id == showcart[i].id) {
          showcart.splice(i, 1);
        }
      }
      for (let i = 0; i < less.length; i++) {
        if (id == less[i].id) {
          less[i].stock += 1;
        }
      }
    },
    placeOrder() {
      if (this.validateUserName && this.validateUserPhone) {
        swal("Success!", "Order submitted successfully!", "success");
        this.firstName = "";
        this.lastName = "";
        this.phoneNumber = "";
        this.subjects = this.subjects.map((subject) => ({
          ...subject,
          availableInventory:
            subject.availableInventory -
            this.cart.filter((s) => s.id === subject.id).length,
        }));
        this.cart = [];
        this.showCheckout();
      } else {
        swal("Error!", "Fill all details!", "error");
      }
    },

    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
  },
  computed: {
    

    cartItemCount: function () {
      return this.cart.length;
    },

    validateUserName() {
      return (
        /^[a-zA-Z]+$/.test(this.firstName) && /^[a-zA-Z]+$/.test(this.lastName)
      );
    },

    validateUserPhone() {
      return /^\d+$/.test(this.phoneNumber);
    },
  },
});

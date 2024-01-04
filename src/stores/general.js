import { defineStore } from "pinia";
import { instance, telegramUrl } from "../axios";
import Swal from "sweetalert2";
import axios from "axios";
import router from "../router";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    loader: false,
    categories: null,
    showCart: false,
    cart: {},
    totalPrice: 0,
  }),
  actions: {
    async getCategory() {
      this.loader = true;
      await instance
        .get("/pos-category?photo=1&product=1")
        .then((result) => {
          this.categories = result.data;
          this.loader = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    priceView(price) {
      let pos = 0;
      if (price / 1000 < 10) {
        pos = 1;
      }
      if (price / 1000 >= 10 && price / 1000 < 100) {
        pos = 2;
      }
      if (price / 1000 >= 100 && price / 1000 < 1000) {
        pos = 3;
      }
      return price.toString().slice(0, pos) + " " + price.toString().slice(pos);
    },
    async PostOrderInTg(formData, phone, branchName, swalTitle, swalText) {
      let a = "";
      let total = 0;
      let paymentType;
      if (formData.payment === "Cash") {
        paymentType = "💵 " + formData.payment;
      } else {
        paymentType = "💳 " + formData.payment;
      }
      console.log(this.cart);
      for (const key in this.cart) {
        a =
          this.cart[key].name +
          "\n " +
          this.cart[key].quantity +
          " x " +
          this.priceView(this.cart[key].priceList.price) +
          " = " +
          this.priceView(
            this.cart[key].quantity * this.cart[key].priceList.price
          ) +
          " сум\n\n" +
          a;
        total =
          total + this.cart[key].quantity * this.cart[key].priceList.price;
      }

      const data =
        `Аддресс: ${formData.address}\n` +
        `Филиал: ${branchName}\n` +
        `Имя: ${formData.name}\n` +
        `Тел: ${phone}\n` +
        `Тип платежа: ${paymentType}\n\n` +
        `🛒 <b>Корзина:</b>\n${a}\n` +
        `<b>Итого</b>: ${this.priceView(total)} сум\n\n` +
        `-----------------------\n` +
        `Источник: WebSite`;
      await axios({
        method: "get",
        url: `${telegramUrl}`,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        params: {
          text: data,
        },
      })
        .then(async (res) => {
          this.cart = {};
          localStorage.removeItem("cart");
          await Swal.fire({
            icon: "success",
            title: `${swalTitle}`,
            text: `${swalText}`,
            showConfirmButton: true,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openOrCloseCart() {
      this.showCart = !this.showCart;
      if (this.showCart) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
    addCart(product, text) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      if (this.cart[product.id]) {
        this.cart[product.id].quantity++;
      } else {
        this.cart[product.id] = product;
        this.cart[product.id].quantity = 1;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      Toast.fire({
        icon: "success",
        title: `${product.name} ${text}`,
      });
    },
    delCart(product) {
      delete this.cart[product.id];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    minusCart(product) {
      if (this.cart[product.id].quantity > 1) {
        this.cart[product.id].quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    plusCart(product) {
      this.cart[product.id].quantity++;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    clearCart() {
      this.cart = {};
      localStorage.removeItem("cart");
    },
  },
  getters: {},
});

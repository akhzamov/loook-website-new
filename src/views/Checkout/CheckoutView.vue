<template>
  <section class="checkout">
    <h2 class="checkout-title">{{ $t("checkout.title") }}</h2>
    <form class="checkout-form" @submit.prevent>
      <div class="checkout-form__left">
        <div class="checkout-form__left-item">
          <h3 class="checkout-form__left-item-title">
            {{ $t("checkout.info") }}
          </h3>
          <div class="checkout-form__left-item-inputs">
            <input
              type="text"
              class="checkout-form__left-item-input"
              name="name"
              :placeholder="$t('checkout.infoName')"
              v-model="formDate.name"
              :class="{ valid: v$.$error }"
            />
            <input
              class="checkout-form__left-item-input"
              name="phone"
              v-model="formDate.phone"
              v-maska="phoneMasked"
              data-maska="+998 (##) ###-##-##"
              placeholder="+998 (##) ###-##-##"
              :class="{ valid: v$.$error }"
            />
          </div>
        </div>
        <div class="checkout-form__left-products" id="checkout-products">
          <h3 class="checkout-form__left-products-title">
            {{ $t("checkout.orders") }}
          </h3>
          <div class="checkout-form__left-products-items">
            <template v-for="product in cartItems" :key="product.id">
              <div class="checkout-form__left-products-item">
                <div class="checkout-form__left-products-item-left">
                  <img
                    v-lazy="
                      `https://sieveserp.ams3.cdn.digitaloceanspaces.com/${product.photo.path}/${product.photo.name}.${product.photo.format}`
                    "
                    alt=""
                    class="checkout-form__left-products-item-img"
                  />
                  <p class="checkout-form__left-products-item-name">
                    {{ product.name }}
                  </p>
                </div>
                <div class="checkout-form__left-products-item-right">
                  <span class="checkout-form__left-products-item-price">
                    {{
                      (
                        product.priceList.price * product.quantity
                      ).toLocaleString()
                    }}
                    <span>{{ $t("checkout.orderCurrency") }}</span>
                  </span>
                  <div class="checkout-form__left-products-item-plusOrMinus">
                    <button
                      class="checkout-form__left-products-item-minus"
                      @click="minusCart(product)"
                    >
                      <minus-icon width="15" height="15" fill="#000" />
                    </button>
                    <span class="checkout-form__left-products-item-count">{{
                      product.quantity
                    }}</span>
                    <button
                      class="checkout-form__left-products-item-plus"
                      @click="plusCart(product)"
                    >
                      <plus-icon width="15" height="15" fill="#000" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="checkout-form__left-item">
          <h3 class="checkout-form__left-item-title">
            {{ $t("checkout.address") }}
          </h3>
          <div class="checkout-form__left-item-inputs">
            <input
              type="text"
              class="checkout-form__left-item-input"
              :placeholder="$t('checkout.addressPlaceholder')"
              v-model="formDate.address"
              :class="{ valid: v$.$error }"
            />
          </div>
        </div>
        <div class="checkout-form__left-item checkout-form__left-last">
          <div class="checkout-form__left-last-top">
            <h1 class="checkout-form__left-last-top-title">
              {{ $t("checkout.paymentType") }}
            </h1>
          </div>
          <div class="checkout-form__left-last-payment">
            <div
              class="checkout-form__left-last-payment-type"
              v-for="payment in paymentType"
              :key="payment.id"
            >
              <label
                :for="payment.paymentId"
                :class="{
                  active: formDate.payment == payment.value,
                  valid: v$.$error,
                }"
              >
                <input
                  type="radio"
                  name="paymentType"
                  :id="payment.paymentId"
                  :value="payment.value"
                  v-model="formDate.payment"
                />

                <span class="checkout-form__left-last-payment-icon">
                  <payment-icon fill="#ffae00" />
                </span>
                <span class="checkout-form__left-last-payment-title">
                  {{ $t(`${payment.title}`) }}
                </span>
                <span
                  class="checkout-form__left-last-payment-select"
                  :class="{ active: formDate.payment == payment.value }"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-form__right">
        <div class="checkout-form__right-item">
          <div class="checkout-form__right-item-block">
            <h1 class="checkout-form__right-item-title">
              {{ $t("checkout.total") }}
            </h1>
            <div class="checkout-form__right-item-info">
              <div class="checkout-form__right-item-text">
                <p class="checkout-form__right-item-p1">
                  {{ $t("checkout.orderSum") }}
                </p>
                <p class="checkout-form__right-item-p2">
                  {{ totalPrice.toLocaleString() }}
                  <span>{{ $t("checkout.orderCurrency") }}</span>
                </p>
              </div>
              <div class="checkout-form__right-item-text">
                <p class="checkout-form__right-item-p1">
                  {{ $t("checkout.deliveryPrice") }}
                </p>
                <p class="checkout-form__right-item-p2">
                  {{ $t("checkout.unknown") }}
                </p>
              </div>
              <div class="checkout-form__right-item-text">
                <p class="checkout-form__right-item-p1">
                  {{ $t("checkout.deliveryTime") }}
                </p>
                <p class="checkout-form__right-item-p2">
                  {{ $t("checkout.dMinutes") }}
                </p>
              </div>
            </div>
            <div class="checkout-form__right-item-total">
              <span class="checkout-form__right-item-total-title">
                {{ $t("checkout.totalSum") }}
              </span>
              <span class="checkout-form__right-item-total-price">
                {{ totalPrice.toLocaleString() }}
                <span>{{ $t("checkout.orderCurrency") }}</span>
              </span>
            </div>
            <div class="checkout-form__right-item-accept">
              <button
                type="submit"
                class="checkout-form__right-item-accept-btn"
                @click="checkout"
              >
                {{ $t("checkout.confirm") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="checkout-pay" v-if="paymentModal">
      <div class="checkout-pay__modal">
        <div class="checkout-pay__modal-add" v-if="paymentSteps.one">
          <h3 class="checkout-pay__modal-title">
            <span>Введите карту</span>
          </h3>
          <div class="checkout-pay__modal-add-card">
            <label for="cardNumber" class="checkout-pay__modal-add-card-label">
              <span>Номер Карты</span>
              <div class="checkout-pay__modal-add-card-input">
                <input
                  type="text"
                  id="cardNumber"
                  v-maska="cardNumMasked"
                  data-maska="#### #### #### ####"
                  placeholder="1234 5678 9123 4567"
                />
                <div class="checkout-pay__modal-add-card-input-icons">
                  <uzcard-icon style="width: 20px; height: 20px" />
                  <humo-icon style="width: 20px; height: 20px" />
                </div>
              </div>
            </label>
            <label for="cardDate" class="checkout-pay__modal-add-card-label">
              <span>Срок действия</span>
              <div class="checkout-pay__modal-add-card-input">
                <input
                  type="text"
                  id="cardDate"
                  v-maska="cardDateMasked"
                  data-maska="##/##"
                  placeholder="12/23"
                />
              </div>
            </label>
          </div>
          <button class="checkout-pay__modal-btn">Продолжить</button>
        </div>
        <div class="checkout-pay__modal-code" v-if="paymentSteps.two">
          <h3 class="checkout-pay__modal-title">Введите код</h3>
          <p class="checkout-pay__modal-sub">
            Код отправлен на номер SMS информирования владельца карты
          </p>
          <div class="checkout-pay__modal-code-check">
            <v-otp-input
              focus-all
              placeholder="0"
              v-model="smsCode"
            ></v-otp-input>
          </div>
          <button class="checkout-pay__modal-btn">Продолжить</button>
        </div>
        <div class="checkout-pay__modal-success" v-if="paymentSteps.three">
          <h3 class="checkout-pay__modal-title">Успешно!</h3>
          <p class="checkout-pay__modal-sub">
            Вы успешно провели {{ totalPrice }} сум.
          </p>
          <button class="checkout-pay__modal-btn">Завершить</button>
        </div>
        <div class="checkout-pay__modal-loader" v-if="paymentSteps.loader">
          <span class="loader"></span>
        </div>
        <span class="checkout-pay__modal-powered">Powered by Global Pay</span>
        <span class="checkout-pay__modal-police">
          ✅ Согласен с
          <a href="https://global.uz/agreement" target="_blank">
            Публичной Офертой
          </a>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useGeneralStore } from "@/stores/general";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { vMaska } from "maska";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import axios from "axios";
import qs from 'qs';

const { t } = useI18n();

const formDate = reactive({
  name: "",
  phone: "",
  address: "",
  payment: "",
});
const rules = {
  name: { required },
  phone: { required },
  address: { required },
  payment: { required },
};
const v$ = useVuelidate(rules, formDate);
const phoneMasked = reactive({});
const cardNumMasked = reactive({});
const cardDateMasked = reactive({});
const smsCode = ref("");
const paymentSteps = reactive({
  one: true,
  two: false,
  three: false,
  loader: false,
});
const paymentModal = ref(false);

const generalStore = useGeneralStore();
let cartItems = computed(() => generalStore.cart);
const plusCart = (product) => generalStore.plusCart(product);
const minusCart = (product) => generalStore.minusCart(product);
const totalPrice = computed(() => {
  let totalPrice = 0;
  for (const key in generalStore.cart) {
    totalPrice +=
      generalStore.cart[key].priceList.price * generalStore.cart[key].quantity;
  }
  return totalPrice;
});
const paymentType = reactive([
  { id: 1, paymentId: "cash", value: "Cash", title: "checkout.paymentCash" },
  {
    id: 2,
    paymentId: "globalpay",
    value: "Global Pay",
    title: "checkout.paymentOnline",
  },
]);

const gPBU = "https://app.sievesapp.com/v1/public";

const getTokegGP = async () => {
  paymentSteps.one = false;
  paymentSteps.loader = true;
  axios({
    method: "POST",
    url: `${gPBU}/get-token-pay`,
    // data: {
    //   grant_type: "password",
    //   client_id: "cards",
    //   client_secret: "CCcmoAt8cI3NEY9HDN64SQD4qR8DanMh",
    //   username: "test_merchant@gmail.com",
    //   password: "test_password",
    //   scope: "openid",
    // },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

const checkout = async () => {
  const result = await v$.value.$validate();
  if (result && phoneMasked.completed) {
    Swal.fire({
      icon: "info",
      title: `${t("checkout.swal.checkOrder")}`,
      showDenyButton: true,
      confirmButtonText: `${t("checkout.swal.checkOrderYes")}`,
      denyButtonText: `${t("checkout.swal.checkOrderNo")}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (formDate.payment == "Cash") {
          generalStore.PostOrderInTg(
            formDate,
            phoneMasked.unmasked,
            t("checkout.swal.orderAcceptTitle"),
            t("checkout.swal.orderAcceptText")
          );
        } else {
          paymentModal.value = true;
          getTokegGP();
        }
      } else if (result.isDenied) {
        Swal.fire(`${t("checkout.swal.ordreCancel")}`, "", "info");
      }
    });
  } else if (!phoneMasked.completed && result) {
    Swal.fire({
      icon: "error",
      title: `${t("checkout.swal.oops")}`,
      text: `${t("checkout.swal.phoneErrorText")}`,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: `${t("checkout.swal.oops")}`,
      text: `${t("checkout.swal.formErrorText")}`,
    });
  }
};

onMounted(() => {
  generalStore.cart = JSON.parse(localStorage.getItem("cart")) || {};
});
</script>

<style lang="scss" scoped></style>

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
          <div id="map" style="height: 400px"></div>
          <button @click="getMyLocation">
            Поставить метку
          </button>
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
          <div class="checkout-pay__modal-btns">
            <button class="checkout-pay__modal-btn" @click="sendCard">
              Продолжить
            </button>
            <button
              class="checkout-pay__modal-btn close"
              @click="(paymentModal = false), (paymentSteps.one = false)"
            >
              Отменить
            </button>
          </div>
        </div>
        <div class="checkout-pay__modal-code" v-else-if="paymentSteps.two">
          <h3 class="checkout-pay__modal-title">Введите код</h3>
          <p class="checkout-pay__modal-sub">
            Код отправлен на номер <br />
            {{ smsNotificationNumber }}
          </p>
          <div class="checkout-pay__modal-code-check">
            <v-otp-input
              focus-all
              placeholder="0"
              v-model="smsCode"
            ></v-otp-input>
          </div>
          <button class="checkout-pay__modal-btn" @click="confirmCard">
            Продолжить
          </button>
          <button
            class="checkout-pay__modal-btn"
            @click="confirmCard"
            style="width: max-content; padding: 0 5px"
            disabled
            id="smsResendButton"
            v-if="smsResendButtonN"
          >
            Отправить код заново (<span id="countdown">
              {{ smsResendSeconds }}
            </span>
            сек)
          </button>
        </div>
        <div class="checkout-pay__modal-success" v-else-if="paymentSteps.three">
          <h3 class="checkout-pay__modal-title">Успешно!</h3>
          <p class="checkout-pay__modal-sub">
            Вы успешно провели {{ totalPrice }} сум.
          </p>
          <p class="checkout-pay__modal-sub">
            Пожалуйста сделайте скриншот чека.
          </p>
          <p class="checkout-pay__modal-sub">
            Для просмотра чека нажмите кнопку ниже.
          </p>
          <a
            class="checkout-pay__modal-btn"
            :href="qrcodeUrlFromGlobalPay"
            download=""
            target="_blank"
            @click="closePaymentGP"
          >
            Чек заказа
          </a>
        </div>
        <div class="checkout-pay__modal-loader" v-else-if="paymentSteps.loader">
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
import qs from "querystring";
import { v4 as uuidv4 } from "uuid";

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
  one: false,
  two: false,
  three: false,
  loader: true,
});
let paymentModal = ref(false);
const generalStore = useGeneralStore();
let cartItems = computed(() => generalStore.cart);
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
let smsNotificationNumber = ref(null);
const gPBU = "https://app.sievesapp.com/v1/public";
let cardToken = ref(null);
let uuid = ref(null);

const branches = {
  yunusabad: {
    grant_type: "password",
    client_id: "merchants",
    client_secret: "Z2Kl2hdwcM4gOB27KA72D2t0lX8ryMgZ",
    username: "yu-swizza-staging@globalpay.uz",
    password: "yUnkRDqoe72LFKmW3CZL",
    scope: "openid",
    serviceId: 26,
  },
  chilonzor: {
    grant_type: "password",
    client_id: "merchants",
    client_secret: "Z2Kl2hdwcM4gOB27KA72D2t0lX8ryMgZ",
    username: "ch-foodex-staging@globalpay.uz",
    password: "wtjLsvqzCYXMzMj3prJr",
    scope: "openid",
    serviceId: 27,
  },
  maximGorkiy: {
    grant_type: "password",
    client_id: "merchants",
    client_secret: "Z2Kl2hdwcM4gOB27KA72D2t0lX8ryMgZ",
    username: "m-smile-staging@globalpay.uz",
    password: "piJ1f6aJHwvrFdD8bDrk",
    scope: "openid",
    serviceId: 28,
  },
  beruniy: {
    grant_type: "password",
    client_id: "merchants",
    client_secret: "Z2Kl2hdwcM4gOB27KA72D2t0lX8ryMgZ",
    username: "b-burgera-staging@globalpay.uz",
    password: "Ti5G5kMZ9HPrfgzoH1Be",
    scope: "openid",
    serviceId: 29,
  },
  avaPizza: {
    grant_type: "password",
    client_id: "merchants",
    client_secret: "Z2Kl2hdwcM4gOB27KA72D2t0lX8ryMgZ",
    username: "ava-pizza-staging@globalpay.uz",
    password: "BrkF2yj0t262bkeWocd8",
    scope: "openid",
    serviceId: 30,
  },
};

let smsResendSeconds = ref(60);
let smsResendButtonN = ref(false);
let qrcodeUrlFromGlobalPay = ref("");

let apiKey = ref("38eaa498-7c2b-4962-8c2b-3b949a49504c");
let latitude = ref("");
let longitude = ref("");
let address = ref("");
let errorMessageLocation = ref("");
let errorMessageAddress = ref("");
let map = reactive({});
let marker = reactive({});
let ymaps = reactive({});
let myLocationPlacemark = reactive({});

const formData = qs.stringify({
  grant_type: branches.yunusabad.grant_type,
  client_id: branches.yunusabad.client_id,
  client_secret: branches.yunusabad.client_secret,
  username: branches.yunusabad.username,
  password: branches.yunusabad.password,
  scope: branches.yunusabad.scope,
});

// FUNC

const plusCart = (product) => generalStore.plusCart(product);
const minusCart = (product) => generalStore.minusCart(product);

const getUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
      },
      (error) => {
        console.error(
          "Ошибка получения текущего местоположения:",
          error.message
        );
      }
    );
  } else {
    console.error("Ваш браузер не поддерживает геолокацию.");
  }
};
const loadYandexMaps = () => {
  if (window.ymaps) {
    ymaps = window.ymaps;
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.onload = () => {
      ymaps = window.ymaps;
      initMap();
    };
    document.head.appendChild(script);
  }
};
const initMap = () => {
  map = new ymaps.Map("map", {
    center: [41.339828, 69.310191],
    zoom: 13,
  });
};
const getMyLocation = () => {
  if (ymaps && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLocation = [position.coords.latitude, position.coords.longitude];

      // Удаляем существующую метку, если она уже есть на карте
      if (myLocationPlacemark) {
        map.geoObjects.remove(myLocationPlacemark);
      }

      // Создаем новую метку и добавляем ее на карту
      myLocationPlacemark = new ymaps.Placemark(
        myLocation,
        { preset: "islands#geolocationIcon" },
        {
          draggable: true,
          iconColor: "#c00a27",
        }
      );

      // Обработчик события при завершении перемещения иконки
      myLocationPlacemark.events.add("dragend", (e) => {
        const coords = e.get("target").geometry.getCoordinates();
        console.log("Новые координаты:", coords);
        ymaps.geocode(coords).then((result) => {
          const firstGeoObject = result.geoObjects.get(0);
          address.value = firstGeoObject.getAddressLine();
          formDate.address = firstGeoObject.getAddressLine();
          console.log(firstGeoObject.getAddressLine());
        });
      });

      map.geoObjects.add(myLocationPlacemark);
      getAddressFromLocation(myLocation);
    });
  } else {
    alert("Геолокация не поддерживается вашим браузером или API не загружено.");
  }
};

const getAddressFromLocation = (coords) => {
  ymaps.geocode(coords).then((result) => {
    const firstGeoObject = result.geoObjects.get(0);
    myLocationAddress = firstGeoObject.getAddressLine();
  });
};
const getTokenGP = async () => {
  paymentSteps.loader = true;
  axios({
    method: "POST",
    url: `${gPBU}/get-token-pay`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData,
  })
    .then((res) => {
      sessionStorage.setItem("access_token", res.data.access_token);
      sessionStorage.setItem("id_token", res.data.id_token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      sessionStorage.setItem("token_type", res.data.token_type);
      paymentSteps.loader = false;
      paymentSteps.one = true;
    })
    .catch((err) => {
      console.error(err);
    });
};
const updateCountdown = () => {
  if (smsResendSeconds.value > 0) {
    smsResendSeconds.value -= 1;
    setTimeout(updateCountdown, 1000); // обновляем каждую секунду
  } else {
    document.getElementById("smsResendButton").removeAttribute("disabled");
    document.getElementById("smsResendButton").textContent = "Отправить код";
  }
};
const sendCard = async () => {
  paymentSteps.one = false;
  paymentSteps.loader = true;
  axios({
    method: "POST",
    url: `${gPBU}/send-card`,
    headers: {
      Authorization: `${sessionStorage.getItem("access_token")}`,
    },
    data: {
      cardNumber: cardNumMasked.unmasked,
      expiryDate:
        cardDateMasked.unmasked.substring(2) +
        cardDateMasked.unmasked.substring(0, 2),
      smsNotificationNumber: "",
    },
  })
    .then((res) => {
      if (res.data.detail && !res.data.cardToken) {
        Swal.fire({
          icon: "error",
          title: `Ошибка`,
          text: `Данные карты введены не правильно!`,
          showDenyButton: true,
          confirmButtonText: `Ввести заного`,
          denyButtonText: `Отменить`,
        }).then((result) => {
          if (result.isConfirmed) {
            paymentSteps.one = true;
            paymentSteps.loader = false;
          } else {
            paymentModal.value = false;
            paymentSteps.one = false;
            paymentSteps.two = false;
            paymentSteps.three = false;
          }
        });
      } else {
        paymentSteps.loader = false;
        paymentSteps.two = true;
        cardToken.value = res.data.cardToken;
        smsNotificationNumber.value = res.data.smsNotificationNumber;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const confirmCard = async () => {
  paymentSteps.two = false;
  paymentSteps.loader = true;
  axios({
    method: "POST",
    url: `${gPBU}/confirm-card`,
    headers: {
      Authorization: `${sessionStorage.getItem("access_token")}`,
      token: `${cardToken.value}`,
    },
    data: {
      code: smsCode.value,
    },
  })
    .then(async (res) => {
      if (res.data.detail && res.data.status) {
        Swal.fire({
          icon: "error",
          title: `Ошибка`,
          text: `Код из смс введен не правильно`,
          showDenyButton: true,
          confirmButtonText: `Ввести заного`,
          denyButtonText: `Отменить`,
        }).then((result) => {
          if (result.isConfirmed) {
            paymentSteps.loader = false;
            paymentSteps.two = true;
            smsCode.value = "";
            smsResendButtonN.value = true;
            updateCountdown();
          } else {
            paymentModal.value = false;
            paymentSteps.one = false;
            paymentSteps.two = false;
            paymentSteps.three = false;
          }
        });
      } else {
        sessionStorage.setItem("confirmToken", res.data.token);
        paymentInit();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const paymentInit = async () => {
  uuid.value = uuidv4();
  sessionStorage.setItem("externalId", uuid.value);
  axios({
    method: "POST",
    url: `${gPBU}/payment-init`,
    headers: {
      Authorization: `${sessionStorage.getItem("access_token")}`,
      token: `${cardToken.value}`,
    },
    data: {
      externalId: sessionStorage.getItem("externalId"),
      serviceId: branches.yunusabad.serviceId,
      paymentFields: [
        {
          value: "UZS",
          name: "currency",
        },
        {
          value: "100000",
          name: "amount",
        },
      ],
    },
  })
    .then((res) => {
      console.log(res.data);
      paymentPerform(res.data.id);
    })
    .catch((err) => {
      console.error(err);
    });
};
const paymentPerform = async (paymentInitID) => {
  axios({
    method: "POST",
    url: `${gPBU}/payment-perform`,
    headers: {
      Authorization: `${sessionStorage.getItem("access_token")}`,
      token: `${cardToken.value}`,
    },
    data: {
      externalId: sessionStorage.getItem("externalId"),
      id: paymentInitID,
      cardToken: cardToken.value,
    },
  })
    .then((res) => {
      qrcodeUrlFromGlobalPay.value = res.data.gnkFields.qrcodeUrl;
      paymentSteps.three = true;
      paymentSteps.loader = false;
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
          getTokenGP();
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
const closePaymentGP = async () => {
  paymentModal.value = false;
  paymentSteps.three = false;
  generalStore.PostOrderInTg(
    formDate,
    phoneMasked.unmasked,
    t("checkout.swal.orderAcceptTitle"),
    t("checkout.swal.orderAcceptText")
  );
};

const getGeoDetail = () => {
  axios({
    method: "GET",
    url: `${gPBU}/get-geocode`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  generalStore.cart = JSON.parse(localStorage.getItem("cart")) || {};
  getUserLocation();
  loadYandexMaps();
  // getGeoDetail()
});
</script>

<style lang="scss" scoped></style>

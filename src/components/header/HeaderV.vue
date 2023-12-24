<template>
  <header class="header">
    <nav class="lnav container">
      <div class="lnav__left">
        <router-link :to="{ name: 'home' }" class="lnav__logo">
          <img src="@ast/images/logo.svg" alt="" />
        </router-link>
        <button class="lnav__left-menu" @click="menuOpen = true">
          <menu-icon :width="'30'" :height="'30'" :fill="'#fff'" />
        </button>
        <ul class="lnav__left-list" :class="{ active: menuOpen }">
          <button class="lnav__left-close" @click="menuOpen = false">
            <times-icon :width="'30'" :height="'30'" :fill="'#fff'" />
          </button>
          <li @click="menuOpen = false">
            <router-link class="lnav__left-link" :to="{ name: 'home' }">
              {{ $t(`header.home`) }}
            </router-link>
          </li>
          <li v-for="link in navLinks" :key="link.id" @click="menuOpen = false">
            <router-link class="lnav__left-link" :to="`${link.path}`">
              {{ $t(`${link.title}`) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="lnav__right">
        <button
          class="lnav__right-cart"
          @click="generalStore.openOrCloseCart()"
        >
          <shoppingbag-icon :width="'30'" :height="'30'" :fill="'#fff'" />
          <span>{{ $t("header.cart") }}</span>
        </button>
        <div
          class="lnav__right-lang"
          @mouseleave="selectLang = false"
          :class="{ active: selectLang }"
        >
          <div
            class="lnav__right-lang-selected"
            @click="selectLang = !selectLang"
          >
            <img
              :src="locale == 'ru' ? ruImg : locale == 'en' ? enImg : uzImg"
              alt=""
            />
            <arrow-icon :width="'30px'" :height="'30px'" :fill="'#ffae00'" />
          </div>
          <div class="lnav__right-lang-selects">
            <div
              class="lnav__right-lang-selects-item"
              v-for="lang in selectLangArray"
              :key="lang.id"
              @click="
                switchLanguage(lang.value, lang.img), (selectLang = false)
              "
            >
              <img :src="lang.img" alt="" />
              <span>{{ lang.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Tr from "@/i18n/translation";
import { useGeneralStore } from "../../stores/general";
import uzImg from "@/assets/images/langs/uz.svg";
import ruImg from "@/assets/images/langs/ru.svg";
import enImg from "@/assets/images/langs/en.svg";

// ****

const router = useRouter();
const { locale } = useI18n();
const supportedLocales = ref(Tr.supportedLocales);
const generalStore = useGeneralStore();

const navLinks = reactive([
  { id: 1, title: "header.ourAddresses", path: "/address" },
  // { id: 2, title: "header.vacancy", path: "/vacancy" },
  { id: 3, title: "header.contacts", path: "/contacts" },
]);
const selectLangArray = reactive([
  {
    id: 1,
    title: "O'zbekcha",
    img: uzImg,
    value: "uz",
  },
  {
    id: 2,
    title: "Русский",
    img: ruImg,
    value: "ru",
  },
  {
    id: 3,
    title: "English",
    img: enImg,
    value: "en",
  },
]);
let selectLang = ref(false);
let menuOpen = ref(false);

const switchLanguage = ref(async (lang, img) => {
  const newLocale = lang;
  await Tr.switchLanguage(newLocale);
  try {
  } catch (e) {
    console.log(e);
    router.push("/");
  }
});
</script>

<style lang="scss"></style>

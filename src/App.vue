<template>
  <Loader v-if="loaderStatus" />
  <div class="wrapper" v-else>
    <HeaderV />
    <AsideCart />
    <main class="main container">
      <router-view />
    </main>
    <leftFixed />
  </div>
</template>

<script setup>
import HeaderV from "./components/header/HeaderV.vue";
import Loader from "./components/loader/Loader.vue";
import AsideCart from "./components/asideCart/AsideCart.vue";
import leftFixed from "./components/leftFixed/leftFixed.vue";
import { useGeneralStore } from "./stores/general";
import { computed, onBeforeMount, reactive, watch } from "vue";

const generalStore = useGeneralStore();
const loaderStatus = computed(() => generalStore.loader);
let showCart = computed({
  get() {
    return generalStore.showCart;
  },
  set(newValue) {
    return (generalStore.showCart = newValue);
  },
});

onBeforeMount(() => {
  generalStore.getCategory();
});
</script>

<style lang="scss" scoped></style>

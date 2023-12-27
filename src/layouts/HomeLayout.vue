<template>
  <div class="wrapper">
    <HeaderV />
    <AsideCart />
    <main class="main container">
      <router-view />
    </main>
    <leftFixed />
  </div>
</template>

<script setup>
import HeaderV from "@/components/header/HeaderV.vue";
import AsideCart from "@/components/asideCart/AsideCart.vue";
import leftFixed from "@/components/leftFixed/leftFixed.vue";
</script>

<style lang="scss" scoped></style>

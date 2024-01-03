<template>
  <div class="categories" v-if="$route.fullPath == '/'">
    <div class="categories__list">
      <template v-for="category in categories" :key="category.id">
        <div
          class="categories__item"
          v-if="
            !category.name.toLowerCase().includes('ava') &&
            category.products.length != 0 &&
            category.name != 'Festive (tog’ora)_11_T'
          "
          @click="scrollToCategory(category.id)"
        >
          <img
            :src="`${imgUrl}/${category.photo.path}/${category.photo.name}.${category.photo.format}`"
            alt=""
            class="categories__item-img"
          />
          <span class="categories__item-span">
            {{ category.name.slice(0, category.name.indexOf("_")) }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useGeneralStore } from "../../stores/general";
import axios from "axios";

const generalStore = useGeneralStore();
const categories = computed(() => generalStore.categories);
const imgUrl = ref("https://sieveserp.ams3.cdn.digitaloceanspaces.com");

let scrollToCategory;

onMounted(() => {
  scrollToCategory = (id) => {
    const selectedCategory = document.querySelector(`#category-${id}`);
    selectedCategory.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const objects = [
    { name: "Object1", distance: 5 },
    { name: "Object2", distance: 3 },
    { name: "Object3", distance: 9 },
    { name: "Object4", distance: 1 },
    { name: "Object5", distance: 7 },
  ];

  const minDistanceObject = objects.reduce((min, current) =>
    current.distance < min.distance ? current : min
  );

  console.log("Объект с минимальным значением distance:", minDistanceObject);
});
</script>

<style lang="scss"></style>

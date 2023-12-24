<template>
  <div
    class="categories"
    ref="categoriesDiv"
    :class="{ sticky: categoriesFixed }"
    id="categoriesDiv"
  >
    <div class="swiper-prev" @click="slider.slidePrev()">
      <leftarrow-icon :width="'35'" :height="'35px'" />
    </div>
    <swiper
      @swiper="onSwiper"
      :spaceBetween="35"
      :modules="modules"
      class="categories__swiper"
      :breakpoints="breakpoints"
    >
      <template v-for="category in categories" :key="category.id">
        <swiper-slide
          v-if="
            !category.name.toLowerCase().includes('ava') &&
            category.products.length != 0
          "
          class="categories__swiper-slider"
        >
          <li
            class="categories__swiper-item"
            @click="scrollToCategory(category.id)"
          >
            <span class="categories__swiper-item-span">
              {{ category.name.slice(0, category.name.indexOf("_")) }}
            </span>
          </li>
        </swiper-slide>
      </template>
    </swiper>
    <div class="swiper-next" @click="slider.slideNext()">
      <rightarrow-icon :width="'35'" :height="'35px'" />
    </div>
    <div
      class="categories-cart"
      v-if="categoriesFixed"
      @click="generalStore.openOrCloseCart()"
    >
      <shoppingbag-icon fill="#fff" />
      <span>{{ $t('header.cart') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useGeneralStore } from "../../stores/general";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const modules = reactive([Navigation]);
const generalStore = useGeneralStore();
const categories = computed(() => generalStore.categories);

const slider = ref(null);
const onSwiper = (swiper) => {
  slider.value = swiper;
};

const breakpoints = reactive({
  360: {
    slidesPerView: 1,
  },
  460: {
    slidesPerView: 2,
  },
  650: {
    slidesPerView: 3,
  },
  960: {
    slidesPerView: 4,
  },
  1100: {
    slidesPerView: 5,
  },
  1200: {
    slidesPerView: 6,
  },
  1300: {
    slidesPerView: 7,
  },
});
const categoriesDiv = ref(null);
let categoriesFixed = ref(false);
let scrollToCategory;

onMounted(() => {
  let categoriesOffset = categoriesDiv.value.offsetTop;
  window.addEventListener("resize", () => {
    categoriesOffset = categoriesDiv.value.offsetTop;
  });
  window.addEventListener("scroll", () => {
    categoriesFixed.value = window.scrollY >= categoriesOffset ? true : false;
  });

  scrollToCategory = (id) => {
    const selectedCategory = document.querySelector(`#category-${id}`);
    selectedCategory.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });
  };
});
</script>

<style lang="scss"></style>

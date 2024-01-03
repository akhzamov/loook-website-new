<template>
  <section class="home">
    <div class="home-swipers">
      <swiper
        :centeredSlides="true"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="home-swiper"
      >
        <swiper-slide
          v-for="slide in slides"
          :key="slide.id"
          class="home-swiper__slide"
        >
          <img :src="slide.image" alt="" class="home-swiper__slide-bg" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="products">
      <template v-for="category in categories">
        <div
          class="products__block"
          v-if="
            !category.name.toLowerCase().includes('ava') &&
            category.products.length != 0 &&
          category.name != 'Festive (tog’ora)_11_T'
          "
          :id="`category-${category.id}`"
        >
          <h3 class="products__title">
            {{ category.name.slice(0, category.name.indexOf("_")) }}
          </h3>
          <div class="products__list">
            <Product
              v-for="product in category.products"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import sliderImage1 from "@ast/images/slider/homepage-slider-1.jpg";
import sliderImage2 from "@ast/images/slider/homepage-slider-2.jpg";
import sliderImage3 from "@ast/images/slider/homepage-slider-3.jpg";
import sliderImage4 from "@ast/images/slider/homepage-slider-4.jpg";
import Product from "@/components/product/Product.vue";
import { useGeneralStore } from "../../stores/general";

const modules = reactive([Autoplay, Pagination]);
const slides = reactive([
  {
    id: 1,
    title: "PIZZA",
    image: sliderImage1,
  },
  {
    id: 2,
    title: "CHEESE NUGGETS",
    image: sliderImage2,
  },
  {
    id: 3,
    title: "FRIED CHICKEN",
    image: sliderImage3,
  },
  {
    id: 4,
    title: "",
    image: sliderImage4,
  },
]);
const generalStore = useGeneralStore();
const categories = computed(() => generalStore.categories);
</script>

<style lang="scss"></style>

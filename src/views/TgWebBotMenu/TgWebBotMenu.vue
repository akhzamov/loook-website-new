<template>
  <h1>Определение филиала</h1>
  <p>Кликните на карту, чтобы определить ваше местоположение.</p>

  <div id="map" style="height: 400px"></div>
</template>

<script setup>
import { onMounted } from "vue";

const branches = [
  { name: "Филиал 1", lat: 55.751244, lng: 37.618423 },
  { name: "Филиал 2", lat: 55.755814, lng: 37.617635 },
  // Добавьте дополнительные филиалы с их координатами
];

// Функция для определения ближайшего филиала по координатам
function determineNearestBranch(location) {
  let nearestBranch = null;
  let shortestDistance = Number.MAX_VALUE;

  branches.forEach((branch) => {
    const distance = calculateDistance(location, {
      lat: branch.lat,
      lng: branch.lng,
    });

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestBranch = branch;
    }
  });

  console.log("Ближайший филиал:", nearestBranch);
}

// Функция для расчета расстояния между двумя точками на глобусе
function calculateDistance(point1, point2) {
  const R = 6371; // Радиус Земли в километрах

  const lat1 = toRadians(point1.lat);
  const lon1 = toRadians(point1.lng);
  const lat2 = toRadians(point2.lat);
  const lon2 = toRadians(point2.lng);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

// Функция для преобразования градусов в радианы
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Функция для инициализации карты
async function initMap() {
  // Создаем карту с центром в определенной локации
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer } = ymaps3;
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById("map"),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [37.588144, 55.733842],

        // Уровень масштабирования
        zoom: 10,
      },
    }
  );
  // const map = new ymaps.Map('map', {
  //   center: [55.751244, 37.618423], // Начальные координаты (Москва, например)
  //   zoom: 10,
  // });

  // Добавляем обработчик события клика по карте
  map.events.add("click", (event) => {
    const location = event.get("coords");

    // Вызываем функцию для определения ближайшего филиала по координатам
    determineNearestBranch({ lat: location[0], lng: location[1] });
  });
}

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped></style>

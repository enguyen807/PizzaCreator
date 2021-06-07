<template>
  <div id="mapContainer"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "MapContainer",
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_ACCESSTOKEN,
    };
  },
  components: {},
  props: {},
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/enguyen807/ckpmlz6ua03il17ocym3ia1ow",
      center: [-90.76225, 33.39379],
      zoom: 12,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    const marker = new mapboxgl.Marker()
      .setLngLat([-90.76225, 33.39379])
      .addTo(map);
  },
};
</script>

<style scoped>
.mapboxgl-map {
  width: 100%;
  min-height: 250px;
  height: 100%;
}

@media screen and (max-width: 600px) {
  .mapboxgl-map {
    overflow: initial;
  }
}
</style>
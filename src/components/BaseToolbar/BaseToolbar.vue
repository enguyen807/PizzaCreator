<template>
  <v-app-bar app light elevation="20" clipped-left>
    <v-app-bar-nav-icon v-show="isMobile" @click="$emit('toggle-drawer')" />

    <router-link to="/">
      <v-img
        alt="Pizza Planet Logo"
        class="shrink mr-2"
        contain
        src="@/assets/images/pizza (1).png"
        transition="scale-transition"
        width="40"
        height="40"
      />
    </router-link>
    <v-spacer />

    <slot name="toolbar-items" />

    <v-spacer />

    <div class="isLoggedIn">
      <v-btn to="/login" text active-class="primary" class=""> Login </v-btn>
      <v-btn to="/register" text active-class="primary"> Register </v-btn>
    </div>
    <v-menu
      offset-y
      :close-on-content-click="false"
      rounded="b-xl"
      class="overflow-hidden"
      :disabled="basket.length === 0 ? true : false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-2" text icon color="primary" v-bind="attrs" v-on="on">
          <v-badge
            color="accent"
            overlap
            bordered
            :value="totalQuantity"
            :content="totalQuantity"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-container v-if="basket.length > 0" class="pa-0">
        <v-row dense>
          <v-col cols="12">
            <div class="card_wrapper">
              <v-card
                v-for="(item, index) in basket"
                :key="index"
                width="300px"
                tile
              >
                <div class="d-flex">
                  <v-card-title class="text-h6">
                    {{ item.name }}
                  </v-card-title>
                  <v-spacer />
                  <v-card-title class="text-subtitle-1">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </v-card-title>
                </div>
                <v-card-subtitle class="py-0">
                  <span class="font-weight-bold">Size: </span>{{ item.size }}"
                </v-card-subtitle>

                <v-card-actions class="pa-4">
                  <v-btn
                    icon
                    outlined
                    x-small
                    @click="$emit('remove-pizza', item)"
                  >
                    &#8722;
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn
                    icon
                    x-small
                    outlined
                    @click="$emit('add-pizza', item)"
                  >
                    &#43;
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
            <div class="order_section">
              <v-btn medium class="accent font-weight-bold text-h6" block>
                Place Order ${{ totalCost }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-menu>
    <template v-slot:extension>
      <v-tabs align-with-title hide-slider>
        <v-tab to="/about/history"> History </v-tab>
        <v-tab to="/about/delivery"> Delivery </v-tab>
        <v-tab to="/about/ordering-guide"> Ordering Guide </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppToolbar",
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    basket: {
      type: Array,
      default: function () {
        return [];
      },
    },
    totalCost: {
      type: String,
      default: "0",
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.v-sheet.v-app-bar.v-toolbar {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.v-toolbar__title {
  font-size: 2rem !important;
}

.v-card__title {
  word-break: break-word;
}

.card_wrapper {
  max-height: 485px;
  overflow-y: auto;
}

.v-card__title.text-subtitle-1 {
  white-space: nowrap;
  align-items: baseline;
}

.cart-notification {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 2;
  position: absolute;
  right: 3px;
  bottom: 10px;
}

.pop-enter-active {
  animation: pop-in 0.3s linear;
}

.pop-leave-active {
  animation: pop-in 0.3s linear reverse;
}

@keyframes pop-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
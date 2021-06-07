<template>
  <v-container fluid class="contact_wrapper py-7 px-9">
    <v-row class="h-250">
      <v-col
        sm="6"
        cols="12"
        class="d-flex flex-column justify-center align-center orange lighten-4"
      >
        <div class="text-center">
          <div class="text-h4">Get in Touch</div>
          <div class="text-body-1">
            Please fill out the form and we will be in touch ASAP.
          </div>
        </div>
      </v-col>
      <v-col sm="6" cols="12">
        <v-form>
          <v-text-field
            id="name"
            v-model="name"
            type="text"
            label="Name"
            placeholder="Name"
          />
          <v-text-field
            id="email"
            v-model="email"
            type="email"
            label="Email"
            placeholder="Email"
          />
          <v-textarea
            id="message"
            v-model="message"
            type="text"
            rows="3"
            label="Message"
            placeholder="Message"
          />
          <v-btn block class="accent">Send Message</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6" cols="12" order="2" class="text-center orange lighten-4">
        <address class="text-body-1 pa-4">
          <div>
            <div class="text-h4 font-weight-bold">Pizza Planet</div>
            <div>123 Lorem Ipsum Avenue</div>
            <div>FakeCity, CA 12235</div>
            <div>United States</div>
          </div>
          <div>
            <div class="font-weight-bold text-h5">Phone</div>
            (123) 456-7890
          </div>
          <div>
            <div>
              <div class="font-weight-bold text-h5">Email</div>
              <p>contact@pizzaplanet.com</p>
            </div>
          </div>
        </address>
      </v-col>
      <v-col sm="6" cols="12" order="1" class="pa-0">
        <MapContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MapContainer from "../components/MapContainer.vue";
export default {
  name: "Contact",
  components: {
    MapContainer,
  },
  data() {
    return {
      valid: false,
      name: "",
      email: "",
      message: "",
    };
  },
};
</script>

<style scoped>
.contact_wrapper {
  /* background: #f1e6da; */
  margin: 10px;
}

.h-250 {
  min-height: 250px;
}
</style>
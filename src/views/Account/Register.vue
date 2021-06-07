<template>
  <div class="register_wrapper">
    <h1>Register</h1>
    <h3>Fill in the form below to get instant access</h3>
    <form action="">
      <div class="mb-10">
        <label
          for="email"
          class="title"
        >Email Address</label>
        <label
          for="email"
          class="subtitle"
        >Eg. example@domain.com</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          autocomplete="username"
        >
      </div>
      <div class="mb-10">
        <label
          for="password"
          class="title"
        >Password</label>
        <label
          for="password"
          class="subtitle"
        >Must have at least 6 characters</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          autocomplete="new-password"
        >
      </div>
      <button
        type="button"
        class="btn_green"
        @click="registerUser"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { dbUserRef, firebaseAuth } from "@/firebase.js";

export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      actionCodeSettings: {
        url: "http://localhost:8080/",
        handleCodeInApp: true,
      },
    };
  },
  methods: {
    async registerUser() {
      const { email, password } = this.user;
      try {
        const userLoginResponse = await firebaseAuth.createUserWithEmailAndPassword(
          email,
          password
        );

        const user = {
          email: userLoginResponse.user.email,
          isVerified: userLoginResponse.user.emailVerified,
          uid: userLoginResponse.user.uid,
          isAdmin: false,
        };

        await dbUserRef.add(user);
        firebaseAuth.sendSignInLinkToEmail(email, this.actionCodeSettings);
        alert("User successfully created!");
        this.$router.push("/login");
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
  },
};
</script>

<style scoped>
.title {
  margin: 0px;
}

.subtitle {
  font-size: 14px;
  color: grey;
}

.mb-10 {
  margin-bottom: 10px;
}

.register_wrapper {
  width: 50%;
}

.form-group {
  margin: 10px 0;
}

label {
  display: block;
  margin: 0 0 10px 0;
}

input,
textarea,
fieldset {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background: rgb(254, 254, 252);
  border: solid 1px #f79e38;
}

.form_wrapper {
  width: 50%;
}
</style>
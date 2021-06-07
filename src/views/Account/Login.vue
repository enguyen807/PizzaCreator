<template>
  <div class="login_wrapper">
    <h1>Login</h1>
    <h3>Welcome back, please login to your account</h3>
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
          v-model="email"
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
          v-model="password"
          type="password"
          autocomplete="current-password"
        >
      </div>
      <button
        type="button"
        class="btn_green"
        @click.prevent="login"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { firebaseAuth, dbUserRef } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async test() {
      if (user) {
        console.log(user);
      }
    },
    async login() {
      try {
        const loggedInUser = await firebaseAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        );

        this.$store.state.isLoggedIn = true;

        const user = {
          email: loggedInUser.user.email,
          isVerified: loggedInUser.user.emailVerified,
        };

        localStorage.setItem("user", JSON.stringify(user));

        const currentUser = firebaseAuth.currentUser;
        const foundUser = await dbUserRef
          .where("uid", "==", currentUser.uid)
          .get();
        const isAdmin = foundUser.docs[0].data().isAdmin;
        this.$store.state.isAdmin = isAdmin;

        this.$router.push("/");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert(errorMessage);
        }
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

.login_wrapper {
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
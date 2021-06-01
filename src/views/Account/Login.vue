<template>
  <div class="login_wrapper">
    <h1>Login</h1>
    <h3>Welcome back, please login to your account</h3>
    <form action="">
      <div class="mb-10">
        <label for="email" class="title">Email Address</label>
        <label for="email" class="subtitle">Eg. example@domain.com</label>
        <input
          type="email"
          id="email"
          v-model="email"
          autocomplete="username"
        />
      </div>
      <div class="mb-10">
        <label for="password" class="title">Password</label>
        <label for="password" class="subtitle"
          >Must have at least 6 characters</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          autocomplete="current-password"
        />
      </div>
      <button type="button" class="btn_green" @click.prevent="login">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { firebaseAuth, dbUserRef } from "@/firebase";

export default {
  name: "login",
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

<style>
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
</style>
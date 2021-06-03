<template>
  <div class="verify_wrapper">
    <h1>Verify Email</h1>
    <h3>
      You're almost ready to start making pizzas. Enter your email address below
      and click the green button below to verify your email address.
    </h3>
    <form action="">
      <div class="mb-10">
        <label for="email" class="title">Email Address</label>
        <label for="email" class="subtitle">Eg. example@domain.com</label>
        <input id="email" type="email" />
      </div>
      <button type="button" class="btn_green">Resend verification link</button>
    </form>
  </div>
</template>

<script>
export default {};
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

.verify_wrapper {
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
<template>
  <!--begin::Wrapper-->
  <div class="d-flex justify-content-center align-items-center w-lg-500px p-10">
    <!--begin::Logo-->
    <div class="screen-1">
      <div class="d-flex flex-column justify-content-center align-items-center" width="80" height="80">
        <img alt="Vue logo" class="logo w-50 h-50 m-5" src="../../assets/logo.png" viewbox="0 0 640 480" />
      </div>

      <form @submit.prevent="onSubmitLogin">
        <div class="email">
          <label for="user">Email Address</label>
          <div class="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            <input v-model="user" type="text" name="user" placeholder="Username@gmail.com"/>
          </div>
        </div>
        <div class="password">
          <label for="password">Password</label>
          <div class="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input v-model="password" class="pas" type="password" name="password" placeholder="············"/>
            <ion-icon class="show-hide" name="eye-outline"></ion-icon>
          </div>
        </div>
        <button ref="submitButton" class="login">Login</button>
      </form>
    </div>
    <!--end::Logo-->
  </div>
  <!--end::Wrapper-->
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "sign-in",

  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const user = ref("");
    const password = ref("");
    const submitButton = ref(null);

    //Form submit function
    const onSubmitLogin = async () => {
      const values = { user: user.value, password: password.value };

      if (submitButton.value) {
        submitButton.value.disabled = true;
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "Logueo Correcto!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Continuar!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(() => {
          // Go to page after successfully login
          router.push("/inicio");
        });
      } else {
        store.logout();

        Swal.fire({
          text: error[0],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Intentarlo Nuevamente!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      submitButton.value.disabled = false;
    };

    return {
      user,
      password,
      onSubmitLogin,
      submitButton,
    };
  },
};
</script>

<style>
/* Mantén tus estilos como están */
</style>

<style>
* {
  font-family: "Poppins";
}

body {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dde5f4;
  height: 100vh;
}

.screen-1 {
  background: #f1f7fe;
  padding: 2em;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0 0 2em #e6e9f9;
  gap: 2em;
}
.screen-1 .logo {
  margin-top: -3em;
}
.screen-1 .email {
  background: white;
  box-shadow: 0 0 2em #e6e9f9;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 20px;
  color: #4d4d4d;
  margin-top: -3em;
}
.screen-1 .email input {
  outline: none;
  border: none;
}
.screen-1 .email input::-moz-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email input:-ms-input-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email input::placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .email ion-icon {
  color: #4d4d4d;
  margin-bottom: -0.2em;
}
.screen-1 .password {
  background: white;
  box-shadow: 0 0 2em #e6e9f9;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 20px;
  color: #4d4d4d;
}
.screen-1 .password input {
  outline: none;
  border: none;
}
.screen-1 .password input::-moz-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .password input:-ms-input-placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .password input::placeholder {
  color: black;
  font-size: 0.9em;
}
.screen-1 .password ion-icon {
  color: #4d4d4d;
  margin-bottom: -0.2em;
}
.screen-1 .password .show-hide {
  margin-right: -5em;
}
.screen-1 .login {
  padding: 1em;
  background: #3e4684;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
}
.screen-1 .footer {
  display: flex;
  font-size: 0.7em;
  color: #5e5e5e;
  gap: 14em;
  padding-bottom: 10em;
}
.screen-1 .footer span {
  cursor: pointer;
}

button {
  cursor: pointer;
}
</style>

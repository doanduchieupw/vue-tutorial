<template>
  <div class="container-auth">
    <form class="form-auth">
      <p>
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
      <h2 class="title-auth">Login to FireBlogs</h2>
      <div class="input-wrap">
        <input-auth v-model="email" placeholder="Email">
          <template v-slot:icon>
            <email-icon />
          </template>
        </input-auth>
        <input-auth v-model="password" type="password" placeholder="Password">
          <template v-slot:icon>
            <lock-icon />
          </template>
        </input-auth>
        <div v-if="Boolean(error)" class="error">{{ error }}</div>
      </div>
      <router-link to="/forgot-password" class="forgot-auth">
        Forgot your password?
      </router-link>
      <button-auth :click="handleLogin">Sign in</button-auth>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { InputAuth, ButtonAuth } from "../components";
import EmailIcon from "../assets/Icons/envelope-regular.svg";
import LockIcon from "../assets/Icons/lock-alt-solid.svg";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { router } from "../router";

export default {
  name: "Login",
  components: {
    "input-auth": InputAuth,
    "email-icon": EmailIcon,
    "lock-icon": LockIcon,
    "button-auth": ButtonAuth,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.email && this.password) {
        try {
          this.error = "";
          const user = await signInWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          router.push("/");
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.container-auth {
  height: 100vh;
  width: 100%;
  display: flex;
  color: #303030;
}
.form-auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 50px;
  flex: 1;
}
.form-auth > p {
  margin-bottom: 32px;
}
.title-auth {
  font-size: 40px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
}
.input-wrap {
  max-width: 350px;
  width: 100%;
}
.forgot-auth {
  color: #000;
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 32px;
}
.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/background.png");
  flex: 2;
}
</style>
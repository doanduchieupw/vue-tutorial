<template>
  <div class="container-auth">
    <form class="form-auth">
      <p>
        Already have an account?
        <router-link to="/login"> Login</router-link>
      </p>
      <h2 class="title-auth">Create Your FireBlog Account</h2>
      <div class="input-container">
        <input-auth v-model="firstName" placeholder="First name">
          <template v-slot:icon>
            <user-icon />
          </template>
        </input-auth>
        <input-auth v-model="lastName" placeholder="Last name">
          <template v-slot:icon>
            <user-icon />
          </template>
        </input-auth>
        <input-auth v-model="username" placeholder="Username">
          <template v-slot:icon>
            <user-icon />
          </template>
        </input-auth>
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
      <button-auth :click="handleRegister">Sign up</button-auth>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { InputAuth, ButtonAuth } from "../components";
import EmailIcon from "../assets/Icons/envelope-regular.svg";
import LockIcon from "../assets/Icons/lock-alt-solid.svg";
import UserIcon from "../assets/Icons/user-alt-light.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { router } from "../router";

export default {
  name: "Login",
  components: {
    "input-auth": InputAuth,
    "user-icon": UserIcon,
    "email-icon": EmailIcon,
    "lock-icon": LockIcon,
    "button-auth": ButtonAuth,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleRegister() {
      if (
        this.firstName &&
        this.lastName &&
        this.username &&
        this.email &&
        this.password
      ) {
        this.error = "";
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          await updateProfile(auth.currentUser, {
            displayName: this.firstName + " " + this.lastName,
          });
          const collectionRef = doc(db, "users", auth.currentUser.uid);
          await setDoc(collectionRef, {
            email: this.email,
            password: this.password,
            username: this.username,
            fullName: `${this.firstName} ${this.lastName}`,
            createdAt: serverTimestamp(),
          });
          router.push("/");
        } catch (error) {
          console.log(error);
          this.error = error.message;
        }
      } else {
        this.error = "Please fill out all required fields.";
      }
    },
  },
  watch: {},
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
.input-container {
  max-width: 350px;
  width: 100%;
  margin-bottom: 40px;
}
.error {
  color: #ff2b23;
}
.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/background.png");
  flex: 2;
}
</style>
import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import "./style.css";
import App from "./App.vue";
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from "./firebase";
import { router } from "./router";
import { store } from "./store";

const app = createApp(App);
app.use(VueFire, {
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});
app.use(router);
app.use(store);

app.mount("#app");

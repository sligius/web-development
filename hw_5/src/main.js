import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import CharacterList from "./components/CharacterList.vue";

createApp(App).component("CharacterList", CharacterList).mount("#app");

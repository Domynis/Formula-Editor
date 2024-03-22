import Vue from "vue";
import Vuetify from "vuetify/lib";

import { VTooltip } from "vuetify/lib";

Vue.use(Vuetify);
Vue.component("v-tooltip", VTooltip);

export default new Vuetify({
    components: {
        VTooltip
    }
});

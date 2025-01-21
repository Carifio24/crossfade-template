import Vue, { createApp, type Plugin } from "vue";

import { FundingAcknowledgement, IconButton, CreditLogos } from "@cosmicds/vue-toolkit";
import CrossfadeTemplate from "./CrossfadeTemplate.vue";

import vuetify from "../plugins/vuetify";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { WWTComponent, wwtPinia } from "@wwtelescope/engine-pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faRedo,
  faTimes,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBookOpen);
library.add(faRedo);
library.add(faTimes);
library.add(faVideo);

/** v-hide directive taken from https://www.ryansouthgate.com/2020/01/30/vue-js-v-hide-element-whilst-keeping-occupied-space/ */
// Extract the function out, up here, so I'm not writing it twice
const update = (el: HTMLElement, binding: Vue.DirectiveBinding) => el.style.visibility = (binding.value) ? "hidden" : "";

createApp(CrossfadeTemplate, {
  wwtNamespace: "crossfade-template",
  accentColor: "#F0AB52",

  // Here replace the URLs for image 1 and 2
  // You can also rename the layers
  wtml: {
    image1: "https://web.wwtassets.org/specials/2023/cosmicds-carina/collection/jwst_carina.wtml",
    image2: "https://web.wwtassets.org/specials/2023/cosmicds-carina/collection/carina_nebula.wtml",
  },

  // You should put in your own URLs/background name here
  // The story will automatically update
  url: "https://web.wwtassets.org/specials/2023/cosmicds-carina/",
  thumbnailUrl: "https://cdn.worldwidetelescope.org/thumbnails/jwst.jpg",
  backgroundWtml: "https://data1.wwtassets.org/packages/2022/07_jwst/smacs0723/jwst_smacs0723.wtml",
  backgroundName: "unwise"
})
 
  // Plugins
  .use(wwtPinia as unknown as Plugin<[]>)
  .use(vuetify)

  // Directives
  .directive(
    /**
    * Hides an HTML element, keeping the space it would have used if it were visible (css: Visibility)
    */
    "hide", {
      // Run on initialisation (first render) of the directive on the element
      beforeMount(el, binding, _vnode, _prevVnode) {
        update(el, binding);
      },
      // Run on subsequent updates to the value supplied to the directive
      updated(el, binding, _vnode, _prevVnode) {
        update(el, binding);
      }
    })

  // Components
  .component("WorldWideTelescope", WWTComponent)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('icon-button', IconButton)
  .component('funding-acknowledgement', FundingAcknowledgement)
  .component('credit-logos', CreditLogos)

  // Mount
  .mount("#app");

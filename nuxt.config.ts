// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  srcDir: "src/",
  css: ["~/assets/styles/colors.css", "~/assets/styles/elements.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Urql • Nuxt • Pokédex",
      meta: [
        { name: "description", content: "Explore Pokemons with Urql and Nuxt" },
      ],
      // link: [
      //   { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      //   {
      //     href: 'https://fonts.gstatic.com',
      //     rel: 'preconnect',
      //     crossorigin: '',
      //   },
      //   {
      //     href: 'https://fonts.googleapis.com/css2?family=Staatliches&family=VT323&display=swap',
      //     rel: 'stylesheet',
      //   },
      // ],
    },
  },
  imports: {
    imports: [
      { name: "graphql", from: "~/gql" },
      { name: "useFragment", from: "~/gql" },
      { name: "isFragmentReady", from: "~/gql" },
      { name: "makeFragmentData", from: "~/gql" },
      { name: "FragmentType", from: "~/gql", type: true },
    ],
  },
  experimental: {
    typedPages: true,
  },
  nitro: {
    imports: {
      dirs: ["src/server/graphql"],
    },
  },
  routeRules: {
    "/": { redirect: "/1" },
  },
  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/fontaine",
    "@bicou/nuxt-urql",
    "@vueuse/nuxt",
    "nuxt-lucide-icons",
  ],
  urql: {
    endpoint: "/api/graphql",
  },
  lucide: {
    namePrefix: "Icon",
  },
  image: {
    domains: ["raw.githubusercontent.com"],
    quality: 70,
  },
  fonts: {
    defaults: {
      preload: true,
    },
  },
});

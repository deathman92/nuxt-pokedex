// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  srcDir: "src/",
  css: ["~/assets/styles/colors.css", "~/assets/styles/elements.css"],
  app: {
    head: {
      title: "Urql • Nuxt • Pokédex",
      meta: [
        { name: "description", content: "Explore Pokemons with Urql and Nuxt" },
      ],
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
    ssr: {
      key: "__URQL_DATA__",
      staleWhileRevalidate: true,
    },
  },
  lucide: {
    namePrefix: "Icon",
  },
  image: {
    domains: ["raw.githubusercontent.com"],
  },
  fonts: {
    defaults: {
      preload: true,
    },
  },
  nitro: {
    compressPublicAssets: true,
    imports: {
      dirs: ["src/server/graphql"],
    },
  },
  routeRules: {
    "/": { redirect: "/1" },
    ...Array.from({ length: 151 })
      .map((_, i) => i)
      .reduce(
        (rules, i) => ({
          ...rules,
          [`/${i + 1}`]: { prerender: true },
        }),
        {}
      ),
  },
});

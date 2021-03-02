import Store from "electron-store";

const store = new Store({
  defaults: {
    application: {
      active: false,
    },
    tasks: [],
    settings: {
      application: {
        headerText: "",
      },
      apiBase: {
        url: "",
        enabled: false,
      },
      auth: {
        url: "",
        requestBody: "",
      },
    },
  },
  watch: true,
});

export default store;

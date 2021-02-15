import Store from "electron-store";

import axios from "./axios";
import session from "./session";
import snackbarHelper from "./snackbarHelper";

const store = new Store();

const handler = {
  success: (response) => response,
  error: async (error) => {
    const { response, config } = error;
    const { apiBase, auth } = store.get("settings");

    if (response) {
      switch (response.status) {
        case 401:
          if (auth.url !== config.url) {
            try {
              const response = await axios.post(
                auth.url,
                JSON.parse(auth.requestBody),
                {
                  baseURL: apiBase.enabled ? apiBase.url : undefined,
                }
              );

              const { token } = response.data;

              session.create({ token });
            } catch (e) {
              store.set("application.active", false);
              snackbarHelper.error("Authentication failed", {
                autoHideDuration: 3000,
              });
            }
          }

          break;
        default:
      }
    }

    return Promise.reject(error);
  },
};

export const { success, error } = handler;

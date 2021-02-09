import Store from "electron-store";

import axios from "./axios";
import session from "./session";

const store = new Store();

const handler = {
  success: (response) => response,
  error: async (error) => {
    const { response, config } = error;

    if (response) {
      switch (response.status) {
        case 401:
          const { apiBase, auth } = store.get("settings");

          if (auth.url !== config.url) {
            const response = await axios.post(
              auth.url,
              JSON.parse(auth.requestBody),
              {
                baseURL: apiBase.enabled ? apiBase.url : undefined,
              }
            );

            const { token } = response.data;

            session.create({ token });
          }

          break;
        default:
      }
    }

    return Promise.reject(error);
  },
};

export const { success, error } = handler;

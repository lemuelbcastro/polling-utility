import axios from "./axios";
import session from "./session";
import store from "./store";
import snackbarHelper from "./snackbarHelper";
import { createLogger } from "./logger";

const logger = createLogger();

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
            } catch (error) {
              store.set("application.active", false);

              snackbarHelper.error(
                "Authentication failed. Polling process terminated",
                {
                  autoHideDuration: 3000,
                }
              );

              logger.error("Authentication failed", { error });
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

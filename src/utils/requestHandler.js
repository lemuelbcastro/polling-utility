import session from './session';

const handler = {
  success: (config) => {
    const currentSession = session.get();

    if (currentSession && currentSession.token) {
      config.headers.authorization = `Bearer ${currentSession.token}`;
    }

    return config;
  },
  error: (error) => Promise.reject(error),
};

export const { success, error } = handler;

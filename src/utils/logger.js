import Store from "electron-store";
import { format, formatISO, isValid, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const createStore = (name) =>
  new Store({
    name,
    cwd: "Logs",
    defaults: {
      logs: [],
    },
  });

const log = (level, message, context) => {
  const store = createStore(format(new Date(), "MMddyyyy"));
  const logs = store.get("logs").concat({
    id: uuidv4(),
    date: formatISO(new Date()),
    level,
    message,
    context,
  });

  store.set("logs", logs);

  return logs;
};

const createLogger = (levels = ["error", "debug", "info", "warning"]) =>
  Object.fromEntries(
    levels.map((level) => [
      level,
      (message, context = null) => log(level, message, context),
    ])
  );

const fetchLogs = (date = null) => {
  const name = date
    ? date instanceof Date && isValid(date)
      ? date
      : isValid(parseISO(date))
      ? parseISO(date)
      : null
    : date;
  const store = createStore(format(name ? name : new Date(), "MMddyyyy"));

  return store.get("logs");
};

export { createLogger, fetchLogs };

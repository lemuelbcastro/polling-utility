import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Store from "electron-store";

const store = new Store({ watch: true });

const Title = () => {
  const [title, setTitle] = useState(store.get("settings.application.title"));

  useEffect(() => {
    store.onDidChange("settings.application.title", (newTitle) => {
      setTitle(newTitle);
    });
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Title;

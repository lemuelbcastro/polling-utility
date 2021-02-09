import React from 'react';
import { useSnackbar } from 'notistack';

const InnerSnackbarHelperConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar());

  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarHelperConfigurator = () => (
  <InnerSnackbarHelperConfigurator setUseSnackbarRef={setUseSnackbarRef} />
);

export default {
  success(message, options = {}) {
    this.toast(message, { ...options, variant: 'success' });
  },
  warning(message, options = {}) {
    this.toast(message, { ...options, variant: 'warning' });
  },
  info(message, options = {}) {
    this.toast(message, { ...options, variant: 'info' });
  },
  error(message, options = {}) {
    this.toast(message, { ...options, variant: 'error' });
  },
  toast(message, options = { variant: 'default' }) {
    useSnackbarRef.enqueueSnackbar(message, options);
  }
};

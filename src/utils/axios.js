import axios from "axios";

import {
  success as requestSuccessHandler,
  error as requestErrorHandler,
} from "./requestHandler";
import {
  success as responseSuccessHandler,
  error as responseErrorHandler,
} from "./responseHandler";

const instance = axios.create();

instance.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
instance.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);

export default instance;

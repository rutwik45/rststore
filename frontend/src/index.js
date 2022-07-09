import {Provider} from 'react-redux'
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import store from './store'
import App from "./App";

render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
  ,
  document.querySelector("#root")
);

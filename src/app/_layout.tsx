import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import RootNavigation from "./navigation/RootNavigation";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigation />
          </PersistGate>
        </Provider>
    </SafeAreaProvider>
  )
}

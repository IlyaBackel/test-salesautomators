import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigation from "../src/navigation/RootNavigation";
import { persistor, store } from "../src/store";

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

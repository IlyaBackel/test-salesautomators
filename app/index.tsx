import { Text, View } from "react-native";
import RootNavigation from "../src/navigation/RootNavigation";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <RootNavigation />
    </View>
  );
}

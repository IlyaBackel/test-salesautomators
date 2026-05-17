import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingView = ({ color, backgroundColor }: any) => (
  <View style={[styles.loader, { backgroundColor }]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

const styles = StyleSheet.create({
  loader: { height: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
});
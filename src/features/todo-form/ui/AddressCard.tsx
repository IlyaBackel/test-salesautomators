import { StyleSheet, Text, View } from 'react-native';

export const AddressCard = ({ address, backgroundColor, borderColor, textColor }: any) => (
  <View style={[styles.container, { backgroundColor, borderColor }]}>
    <Text style={[styles.text, { color: textColor }]} numberOfLines={2}>
      {address || 'Move the map to select location'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 8, borderRadius: 8, borderWidth: 1, marginBottom: 10 },
  text: { fontSize: 14, textAlign: 'center' },
});
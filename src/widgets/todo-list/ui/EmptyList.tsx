import { Image, StyleSheet, Text, View } from 'react-native';

export default function EmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Image source={require('@/assets/images/empty-list.png')} style={styles.image} />
        <View style={{ gap: 50 }}>
          <Text style={styles.text}>
            Judging by the empty list, you still have no tasks for today :(
          </Text>
          <Text style={styles.text}>
            Start by creating a new task!
          </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '70%',
  },
  image: {
    zIndex: -1,
    opacity: 0.2,
    position: 'absolute',
    width: 400
  },
  text: {
    fontSize: 22,
    fontWeight: 500,
    textAlign: 'center',
    color: '#000000b7'
  },
})

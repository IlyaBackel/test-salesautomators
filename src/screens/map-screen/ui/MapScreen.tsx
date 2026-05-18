import { useTheme } from '@/src/app/providers/ThemeProvider';
import { ITodo } from '@/src/entities/todo/model/ITodo';
import { formatExecutionDateTime } from '@/src/shared/lib/date';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useAppSelector } from '../../../store/hooks';

const DEFAULT_REGION: Region = {
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

export default function MapScreen() {
    const { colors } = useTheme();
    const todos = useAppSelector(state => state.todos.items);
    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);

    const tasksWithLocation = todos.filter(todo => todo.latitude && todo.longitude);

    useEffect(() => {
        if (tasksWithLocation.length > 0 && mapRef.current) {
            const coordinates = tasksWithLocation.map(todo => ({
                latitude: todo.latitude!,
                longitude: todo.longitude!,
            }));
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [tasksWithLocation]);

    const handleMarkerPress = (todo: ITodo) => {
        setSelectedTodo(todo);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={DEFAULT_REGION}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
            >
                {tasksWithLocation.map(todo => (
                    <Marker
                        key={todo.id}
                        coordinate={{ latitude: todo.latitude!, longitude: todo.longitude! }}
                        onPress={() => handleMarkerPress(todo)}
                        title={todo.title}
                        description={formatExecutionDateTime(todo.executionDateTime)}
                    />
                ))}
            </MapView>

            {tasksWithLocation.length === 0 && (
                <View style={styles.messageOverlay}>
                    <Text style={[styles.messageText, { color: colors.TEXT.SECONDARY }]}>
                        📍 No tasks with location yet
                    </Text>
                </View>
            )}

            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={[styles.modalContent, { backgroundColor: colors.BACKGROUND.CARD }]}>
                        {selectedTodo && (
                            <>
                                <Text style={[styles.modalTitle, { color: colors.TEXT.PRIMARY }]}>{selectedTodo.title}</Text>
                                <Text style={[styles.modalText, { color: colors.TEXT.SECONDARY }]}>
                                    🕒 {formatExecutionDateTime(selectedTodo.executionDateTime)}
                                </Text>
                                {selectedTodo.manualLocation && (
                                    <Text style={[styles.modalText, { color: colors.TEXT.SECONDARY }]}>
                                        📍 Manual: {selectedTodo.manualLocation}
                                    </Text>
                                )}
                                {selectedTodo.mapLocation && (
                                    <Text style={[styles.modalText, { color: colors.TEXT.SECONDARY }]}>
                                        📍 Map: {selectedTodo.mapLocation}
                                    </Text>
                                )}
                                <TouchableOpacity
                                    style={[styles.closeButton, { backgroundColor: colors.BUTTON.PRIMARY }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    messageOverlay: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    messageText: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
        fontSize: 14
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '80%',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    modalText: {
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center'
    },
    closeButton: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
});
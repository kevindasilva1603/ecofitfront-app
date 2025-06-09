import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const SessionDetailScreen = ({ route }) => {
  const { activity } = route.params;
  const path = activity.path ? JSON.parse(activity.path) : [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Détail de la session</Text>
      <Text style={styles.info}>Type : {activity.type}</Text>
      <Text style={styles.info}>Distance : {activity.distance.toFixed(2)} km</Text>
      <Text style={styles.info}>Durée : {activity.duration} min</Text>
      <Text style={styles.info}>Points : {activity.points}</Text>
      <Text style={styles.info}>Date : {new Date(activity.created_at).toLocaleString()}</Text>

      {path.length > 1 && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: path[0].latitude,
            longitude: path[0].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Polyline coordinates={path} strokeColor="#4caf50" strokeWidth={5} />
        </MapView>
      )}
    </ScrollView>
  );
};

export default SessionDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#33691e', textAlign: 'center' },
  info: { fontSize: 16, marginBottom: 8 },
  map: { width: Dimensions.get('window').width - 32, height: 300, borderRadius: 10, marginTop: 10 },
});

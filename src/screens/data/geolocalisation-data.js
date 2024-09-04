import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions,Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GeolocalisationMultiple = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Fetch locations from your API
      try {
        const response = await fetch('https://adores.tech/api/carte/geolocalisation-data.php');
        const data = await response.json();

        // Convert latitude and longitude to numbers if they are strings
        const parsedData = data.map(loc => ({
          ...loc,
          latitude: parseFloat(loc.latitude),
          longitude: parseFloat(loc.longitude),
          color: loc.couleur,
          matricule: loc.matricule
        }));

        setLocations(parsedData);
      } catch (error) {
        setErrorMsg('Location non trouvée');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          {locations.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              title={loc.matricule}
              pinColor={loc.color}
              onPress={() => Alert.alert('Info voiture',loc.matricule)}
            />
          ))}
        </MapView>
      ) : (
        <Text>{errorMsg ? errorMsg : "Chargement en cours..."}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default GeolocalisationMultiple;

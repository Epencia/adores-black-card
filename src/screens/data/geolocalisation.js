import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions,Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { GlobalContext } from '../../global/GlobalState';

const Geolocalisation = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useContext(GlobalContext);

  const [region, setRegion] = useState({
    latitude: 7.6717026,
    longitude: -5.0162297,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocation();
    navigation.setOptions({title: 'Ma position'});
  }, []);


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission de localisation refusée');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    // Envoyer les données de localisation à l'API
    try {
      await axios.post('https://adores.tech/api/carte/geolocalisation.php', {
        matricule: user[0].matricule,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Message","Erreur lors de l'envoi des données de localisation");
    }
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Vous etes ici"
          />
          {locations.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              title={loc.title}
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
  error: {
    marginTop: 20,
    color: 'red',
  },
});

export default Geolocalisation;

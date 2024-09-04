import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FeatherIcon from 'react-native-vector-icons/Feather';

const GeolocalisationRecherche = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setErrors({ searchText: 'Veuillez saisir des mots clés valides.' });
      return;
    }

    // Fetch locations from your API using searchText
    try {
      const response = await fetch(`https://adores.tech/api/carte/geolocalisation-recherche.php?matricule=${encodeURIComponent(searchText.trim())}`);
      const data = await response.json();

      // Convert latitude and longitude to numbers if they are strings
      const parsedData = data.map(loc => ({
        ...loc,
        latitude: parseFloat(loc.latitude),
        longitude: parseFloat(loc.longitude),
        color: loc.couleur,
        matricule: loc.matricule
      }));

      setSearchedLocation(parsedData);
      setErrors({});
    } catch (error) {
      setSearchedLocation(null);
      setErrorMsg('Location non trouvée');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchTopContainer}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { borderColor: errors.searchText ? 'red' : '#2593B6' }]}>
            <TextInput
              style={styles.input}
              placeholder="Saisir les mots clés..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                if (text) {
                  setErrors({ searchText: '' });
                }
              }}
              onSubmitEditing={handleSearch} // Trigger search on submit
            />
            <TouchableOpacity onPress={handleSearch}>
              <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          {errors.searchText ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{errors.searchText}</Text>
          ) : null}
        </View>
      </View>
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
 
          {searchedLocation && (
            searchedLocation.map((loc, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                title={loc.matricule}
                pinColor={loc.color}
              />
            ))
          )}
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
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100, // Adjust height for search bar
  },
  searchTopContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2593B6',
    width: '100%',
  },
  searchIcon: {
    padding: 8,
    backgroundColor: '#2593B6',
    color: 'white',
    borderRadius: 6,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
});

export default GeolocalisationRecherche;

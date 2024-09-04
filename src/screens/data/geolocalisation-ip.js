import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

export default function GeolocalisationIp({})  {

  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
   try {
    const response = await fetch(`https://ipapi.co/json/`, {
      headers: {
        //'Cache-Control': 'no-cache',
      },
    });
    const newData = await response.json();
    setLocationData(newData);
  } catch (error) {
    Alert.alert('Message','Erreur lors de la récupération des données de géolocalisation');
  }
  }

  return (
    <View style={styles.container}>
      {locationData ? (
        <View>
          <Text>Pays : {locationData.country_name ? locationData.country_name: 'en cours...'}</Text>
          <Text>Ville : {locationData.city}</Text>
          <Text>Latitude : {locationData.latitude}</Text>
          <Text>Longitude : {locationData.longitude}</Text>
          <Text>Adresse IP : {locationData.ip}</Text>
          {/* Ajoutez d'autres informations disponibles si nécessaire */}
        </View>
      ) : (
        <Text>Chargement des données de géolocalisation...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});


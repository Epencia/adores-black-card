import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,Alert} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function GeolocalisationRepere({navigation,item}){

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user, setuser] = useContext(GlobalContext);
  const [region, setRegion] = useState({
    latitude: 7.6717026,
    longitude: -5.0162297,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

   // toogle
  const [expandedItems, setExpandedItems] = useState([]);
  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  useEffect(()=>{
    navigation.setOptions({title: 'Localiser mes appareils'});
    getListeObjets(); 
  },[])

  // liste
  const getListeObjets = async () => {
    try {
      const response = await fetch(`https://adores.tech/api/carte/liste-objet-catalogue.php?matricule=${user[0].matricule}`, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setError(error);
    }
  }

  // affichage en fonction 
  const AffichageLocalisation = async (param) => {
    // Fetch locations from your API using searchText
    try {
      const response = await fetch(`https://adores.tech/api/carte/geolocalisation-objet.php?matricule=${encodeURIComponent(param)}`);
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
      if (parsedData.length > 0) {
        const { latitude, longitude } = parsedData[0];
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setRegion({
            ...region,
            latitude,
            longitude,
          });
        }
      }
    } catch (error) {
      setSearchedLocation(null);
      Alert.alert('Message','Localisation non trouvée');
    }
  };

  // validation
const ValidationDeclarationObjet = (param1,param2) =>{
      
  fetch(`https://adores.tech/api/carte/validation-declaration-objet.php?code=${param1}&etat=${param2}`,{
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
   .then((responseJson)=>{
    Alert.alert('Message',responseJson);
        }
   )
   .catch((error)=>{
    Alert.alert('Message','Erreur lors de la declaration');
   });
  
  
  }

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
      <MapView style={styles.map} region={region}>
{searchedLocation && (
            searchedLocation.map((loc, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(loc.latitude),
                  longitude: parseFloat(loc.longitude),
                }}
                title={loc.appareil}
                pinColor={loc.color}
                onPress={() => handleMarkerPress(loc)}
              />
            ))
          )}

        </MapView>
        {selectedLocation && (
        <Text style={styles.ipAddress}>
          Longitude: {selectedLocation.longitude} - Latitude: {selectedLocation.latitude}
        </Text>
      )}
      </View>
      <View style={styles.devicesList}>
        <Text style={styles.devicesTitle}>Vos appareils</Text>
        {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.code_objet}
          renderItem={({item}) => (
            <View style={styles.experienceItem}>
              <TouchableOpacity onPress={() => toggleItem(item.code_objet)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.cardIcon, { backgroundColor: "white" }]}>
                    {item.categorie_objet === 'Telephone' ? (
                      <MaterialCommunityIcons color="#007BFF" name='phone' size={35} />
                    ) : item.categorie_objet === 'Ordinateur' ? (
                      <MaterialCommunityIcons color="#007BFF" name='laptop' size={35} />
                    ) : item.categorie_objet === 'Moto' ? (
                      <MaterialCommunityIcons color="#007BFF" name='motorbike' size={35} />
                    ) : item.categorie_objet === "Piece d'identite" ? (
                      <MaterialCommunityIcons color="#007BFF" name='file-outline' size={35} />
                    ) : (
                      <MaterialCommunityIcons color="#007BFF" name='fire-circle' size={35} />
                    )}
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.marque_objet} {item.modele_objet}</Text>
                    <Text style={styles.userCode}>{item.categorie_objet} - {item.etat_objet}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {expandedItems.includes(item.code_objet) && (
                <View>
                  <View style={{ marginBottom: 10 }}></View>
                  <Text style={styles.description}>Référence : {item.reference_objet}</Text>
                  <Text style={styles.description}>Propriétaire : {item.nom_prenom}</Text>
                  <Text style={styles.description}>Téléphone : {item.telephone}</Text>
                  <Text style={styles.description}>Description : {item.details_objet}</Text>
                  <View style={{ marginBottom: 20 }}></View>
                  <TouchableOpacity
                    style={styles.followButton} onPress={() => AffichageLocalisation(item.code_objet)}>
                    <Text style={styles.followButtonText}>Afficher la localisation</Text>
                  </TouchableOpacity>
                  <View style={{ marginBottom: 10 }}></View>
                  {(item.etat_objet === 'Normal' || item.etat_objet === 'Retrouve') && (
       <>
    <TouchableOpacity
      style={styles.followButton} onPress={() => ValidationDeclarationObjet(item.code_objet,'Perte')}>
      <Text style={styles.followButtonText}>Déclaration de perte</Text>
    </TouchableOpacity>
    <View style={{marginBottom:10}}></View>
    <TouchableOpacity
      style={styles.followButton} onPress={() => ValidationDeclarationObjet(item.code_objet,'Vol')}>
      <Text style={styles.followButtonText}>Déclaration de vol</Text>
    </TouchableOpacity>
    <View style={{marginBottom:10}}></View>
    </>
    )}
    {(item.etat_objet === 'Perte' || item.etat_objet === 'Vol') && (
       <>
    <TouchableOpacity
      style={styles.followButton} onPress={() => ValidationDeclarationObjet(item.code_objet,'Retrouve')}>
      <Text style={styles.followButtonText}>Déclaration de retrouvaille</Text>
    </TouchableOpacity>
    <View style={{marginBottom:10}}></View>
    </>
    )}
                  <TouchableOpacity
                    style={styles.followButton2} onPress={() => navigation.navigate('Declaration objet',{item})}>
                    <Text style={styles.followButtonText2}>Voir les détails</Text>
                  </TouchableOpacity>
                  <View style={{ marginBottom: 10 }}></View>
                </View>
              )}
            </View>
          )}
        />
        ) : (
          <View style={{marginTop: 10, marginRight:15,marginLeft:15,
            elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
          }}>
          <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
            marginBottom:15,color:'#888',textAlign:'center'
          }}>Aucun appareil enregistré</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    height: 56,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  mapContainer: {
    height: '50%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  devicesList: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  devicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    color: '#007bff',
  },
  //nouveau
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    //fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: '#ccc',
  },
  followButtonText: {
    color: 'white',
  },
  followingButtonText: {
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop:5
  },
  experienceItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding:12,

  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth : 1,
    borderColor : '#007BFF',
    marginRight: 10

  },
  followButton2: {
    backgroundColor: 'white',
    borderColor:'#007BFF',
    borderWidth:1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButtonText2: {
    color: '#007BFF',
  },
  ipAddress: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
});

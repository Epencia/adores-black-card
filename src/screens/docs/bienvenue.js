import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, Text, StatusBar, Alert,ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function Bienvenue({navigation}) {

  const [searchText, setSearchText] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  // variable
  const [telephone, setTelephone] = useState([]);
  const [ordinateur, setOrdinateur] = useState([]);
  const [moto, setMoto] = useState([]);
  const [papier, setPapier] = useState([]);
  const [count, setCount] = useState([]);

  const { width: windowWidth } = useWindowDimensions();

  const ignoredDomTags = ['o:p','v:shape','v:shapetype','u1:p','font','color'];


  useEffect(()=>{
    // nouveau
    getTelephone();
    getOrdinateur();
    getMoto();
    getPapier();
    getNombreNotification();
    const intervalId = setInterval(getNombreNotification, 1000);
    return () => clearInterval(intervalId);
  },[])

  const handleSearch = (param) => {

    if (!searchText) {
        setErrors({
          // Update error state with appropriate error messages
          searchText: !searchText ? 'Veuillez renseigner obligatoirement ce champ' : '',
        });
        return;
      }

    setIsSubmitting(true);

    fetch(`https://adores.tech/api/carte/registre-controle.php?matricule=${param}`,{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
    .then((result) => {
      setMessage(result);
      setIsSubmitting(false);
        }
   )
   .catch((error)=>{
    setError(error);
    setIsSubmitting(false);
   });
  };

  // telephone
  const getTelephone = () =>{
    fetch(`https://adores.tech/api/carte/information-telephone.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setTelephone(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

    // Ordinateur
  const getOrdinateur = () =>{
    fetch(`https://adores.tech/api/carte/information-ordinateur.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setOrdinateur(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

    // telephone
  const getMoto = () =>{
    fetch(`https://adores.tech/api/carte/information-moto.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setMoto(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

    // telephone
  const getPapier = () =>{
    fetch(`https://adores.tech/api/carte/information-papier.php`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setPapier(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
    }

    // Fetch notifications count
  const getNombreNotification = () => {
    fetch(`https://adores.tech/api/carte/nombre-objet-disparus.php`, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setCount(result);
        }
      )
      .catch((error) => {
        alert(error);
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container2}>
        <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.appButton2} onPress={() => navigation.navigate('Exemple')}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appButton2} 
                  onPress={()=>{ Alert.alert(ordinateur[0] ? ordinateur[0].titre : 'Aucun titre',ordinateur[0] ? ordinateur[0].details : 'Aucun contenu');
          }}>
            <MaterialCommunityIcons name="laptop" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appButton2} 
                    onPress={()=>{Alert.alert(telephone[0] ? telephone[0].titre : 'Aucun titre',telephone[0] ? telephone[0].details : 'Aucun contenu');
           }}>
          <MaterialCommunityIcons name="phone" size={24} color="black"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appButton2} onPress={()=>{ Alert.alert(papier[0] ? papier[0].titre : 'Aucun titre',papier[0] ? papier[0].details : 'Aucun contenu');
           }}>
        <MaterialCommunityIcons name="motorbike" size={24} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appButton2} 
                         onPress={()=>{ Alert.alert(moto[0] ? moto[0].titre : 'Aucun titre',moto[0] ? moto[0].details : 'Aucun contenu');
         }}>
        <MaterialCommunityIcons name="car" size={24} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appButton2} onPress={() => navigation.navigate('Inscription')}>
            <MaterialCommunityIcons name="pencil" size={24} color="black"/>
          </TouchableOpacity>
        <TouchableOpacity style={styles.appButton2} onPress={() => navigation.navigate('Connexion')}>
            <MaterialCommunityIcons name="lock" size={24} color="black"/>
          </TouchableOpacity>
        <TouchableOpacity style={styles.appButton2} onPress={() => navigation.navigate('Liste objets disparus')}>
        <MaterialCommunityIcons name="bell" size={24} color="black"/>
          {count > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: 8,
                backgroundColor: 'red',
                borderRadius: 50,
                width: 15,
                height: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 8 }}>{count > 99 ? '99+' : count}</Text>
            </View>
          )}
        </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/logo-adores-business2.jpeg")}
          style={styles.logo}
        />
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { borderColor: errors.searchText ? 'red' : '#2593B6' }]}>
            <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Saisir l'identifiant de l'appareil"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                if (text) {
                  setErrors({ searchText: '' });
                }
              }}
            />
          </View>
        </View>
        {errors.searchText ? (
          <Text style={{ color: 'red', marginTop: -25, marginBottom: 10 }}>{errors.searchText}</Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
        {/* Jauge */}
        {isSubmitting && (
           <ActivityIndicator size="large" color="blue" />
        )}
        {/* Display Thoughts of the Day */}
        <View style={styles.thoughtsContainer}>
          <HTML source={{ html: message }} contentWidth={windowWidth} ignoredDomTags={ignoredDomTags}
      />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',  // Alignement à droite
    alignItems: 'center',  // Alignement vertical au centre
    position: 'absolute',
    top: 10,
    right: 10,
    width: '80%',  // Ajustez la largeur selon vos besoins
    zIndex:999
  },
  appButton: {
    marginLeft: 10,  // Espacement entre les boutons si nécessaire
  },
  appButton3: {
    paddingHorizontal: 20,  // Espacement horizontal pour le premier bouton
  },
  appButton2: {
    marginLeft: 10,  // Espacement entre les boutons si nécessaire
  },
  logo: {
    width: 272,
    height: 92,
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    width: 120,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize:13
  },
  thoughtsContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thoughtsText: {
    color: '#2593B6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  thoughtsContent: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    width: 190,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonText2: {
    color: '#fff',
    textAlign: 'center',
  },
  profileImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: -20,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

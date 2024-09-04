import React, { useEffect,useState, useContext } from "react";
import {
  StyleSheet,SafeAreaView,View,Image,Text,TextInput,TouchableOpacity, ScrollView ,Alert,Linking, ActivityIndicator 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialIcons } from '@expo/vector-icons';

export default function Statistiques({navigation}) {


    const [NombreCarte, setNombreCarte] = useState('');  
    const [NombreObjet, setNombreObjet] = useState('');
    const [NombreObjetVoles, setNombreObjetVoles] = useState('');
    const [NombreObjetPerdus, setNombreObjetPerdus] = useState('');
    const [NombreObjetRetrouves, setNombreObjetRetrouves] = useState('');
    const [SommePaiement, setSommePaiement] = useState('');
    const [SommeRechargement, setSommeRechargement] = useState('');
    const [SommeRetrait, setSommeRetrait] = useState('');
    const [SommeTransfertRecus, setSommeTransfertRecus] = useState('');
    const [SommeTransfertEnvoies, setSommeTransfertEnvoies] = useState('');

    const [user, setUser] = useContext(GlobalContext);


    useEffect(()=>{
        // nouveau
        getSommePaiement();
        getSommeRechargement();
        getSommeRetrait(); 
        getSommeTransfertRecus();
        getSommeTransfertEnvoies();
        getNombreObjet();
        getNombreObjetPerdus();
        getNombreObjetRetrouves();
        getNombreCarte();
        getNombreObjetVoles();
  
        
      },[])

  // somme rechargement
  const getSommePaiement = () =>{

    fetch(`https://adores.tech/api/carte/somme-paiement.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setSommePaiement(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

    // somme rechargement
  const getSommeRechargement = () =>{

    fetch(`https://adores.tech/api/carte/somme-rechargement.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setSommeRechargement(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

       // somme rechargement
  const getSommeRetrait = () =>{

    fetch(`https://adores.tech/api/carte/somme-retrait.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setSommeRetrait(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

        // somme rechargement
  const getSommeTransfertRecus = () =>{

    fetch(`https://adores.tech/api/carte/somme-transfert-recus.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setSommeTransfertRecus(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

        // somme rechargement
  const getSommeTransfertEnvoies = () =>{

    fetch(`https://adores.tech/api/carte/somme-transfert-envoies.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setSommeTransfertEnvoies(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

            // somme rechargement
  const getNombreCarte = () =>{

    fetch(`https://adores.tech/api/carte/nombre-carte.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreCarte(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }


        // somme rechargement
  const getNombreObjet = () =>{

    fetch(`https://adores.tech/api/carte/nombre-objet.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreObjet(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

        // somme rechargement
  const getNombreObjetVoles = () =>{

    fetch(`https://adores.tech/api/carte/nombre-objet-voles.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreObjetVoles(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

        // somme rechargement
  const getNombreObjetPerdus = () =>{

    fetch(`https://adores.tech/api/carte/nombre-objet-perdus.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreObjetPerdus(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }



        // somme rechargement
  const getNombreObjetRetrouves = () =>{

    fetch(`https://adores.tech/api/carte/nombre-objet-retrouves.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombreObjetRetrouves(result);
          }
     )
     .catch((error)=>{
      Alert.alert("Message","Erreur d'affichage");
     });
  
    }

  return (
    <ScrollView style={{backgroundColor:'white'}}>
       <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Nombre d'appareils</Text>
          <Text style={styles.statValue}>{NombreObjet || '0'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Paiements</Text>
          <Text style={styles.statValue}>
  {SommePaiement[0] ? !isNaN(parseFloat(SommePaiement[0].somme)) ? parseFloat(SommePaiement[0].somme).toLocaleString("fr-FR") : '0' : '0'}
           </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Appareils volés</Text>
          <Text style={styles.statValue}>{NombreObjetVoles || '0'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Rechargements</Text>
          <Text style={styles.statValue}>
  {SommeRechargement[0] ? !isNaN(parseFloat(SommeRechargement[0].somme)) ? parseFloat(SommeRechargement[0].somme).toLocaleString("fr-FR") : '0' : '0'}
           </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Appareils retrouvés</Text>
          <Text style={styles.statValue}>{NombreObjetRetrouves || '0'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Retraits</Text>
          <Text style={styles.statValue}>
  {SommeRetrait[0] ? !isNaN(parseFloat(SommeRetrait[0].somme)) ? parseFloat(SommeRetrait[0].somme).toLocaleString("fr-FR") : '0' : '0'}
           </Text>
        </View>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
          <Text style={styles.statTitle}>Appareils perdus</Text>
          <Text style={styles.statValue}>{NombreObjetPerdus || '0'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Transferts récus</Text>
          <Text style={styles.statValue}>
  {SommeTransfertRecus[0] ? !isNaN(parseFloat(SommeTransfertRecus[0].somme)) ? parseFloat(SommeTransfertRecus[0].somme).toLocaleString("fr-FR") : '0' : '0'}
           </Text>
        </View>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
          <Text style={styles.statTitle}>Nombre de cartes</Text>
          <Text style={styles.statValue}>{NombreCarte || '0'}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statTitle}>Transferts envoiés</Text>
          <Text style={styles.statValue}>
  {SommeTransfertEnvoies[0] ? !isNaN(parseFloat(SommeTransfertEnvoies[0].somme)) ? parseFloat(SommeTransfertEnvoies[0].somme).toLocaleString("fr-FR") : '0' : '0'}
           </Text>
        </View>
      </View>
    </View>
   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    width: '45%',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'gray',
    padding:10,
    borderRadius:5,
    shadowRadius: 5,
  },
  statTitle: {
    fontSize: 12,
    color: 'gray',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

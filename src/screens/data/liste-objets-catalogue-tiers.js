import React , {useEffect, useState, useContext, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput,Linking} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ListeObjetsCatalogueTiers({navigation,item}){

  const [searchTerm, setSearchTerm] = useState('');

  // liste des inscrits pour le stage
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [user, setuser] = useContext(GlobalContext);


const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  getListeObjetsDisparus(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};

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
  navigation.setOptions({title: "Appareils d'un tiers"});
   // Exécuter la fonction avec cache
   const delay = 10000; // Définir le délai à 1 minute
   getListeObjetsDisparus(); 
   // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
   const intervalId = setInterval(getListeObjetsDisparus2, delay);
   // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
   return () => clearInterval(intervalId);
},[])


// liste
const getListeObjetsDisparus = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/carte/liste-objet-catalogue-tiers.php?matricule=${user[0].matricule}`, {
    headers: {
      //'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
 setIsLoading(false);
} catch (error) {
  setIsLoading(false);
  setError(error);
}
}
// liste 
const getListeObjetsDisparus2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/carte/liste-objet-catalogue-tiers.php?matricule=${user[0].matricule}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setData(newData);
} catch (error) {
  setError(error);
}
}

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
        alert(responseJson);
        }
   )
   .catch((error)=>{
    alert(error);
   });
  
  
  }

// api recherche
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categorie_objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marque_objet.toLowerCase().includes(searchTerm.toLowerCase())||
    item.modele_objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reference_objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code_objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.etat_objet.toLowerCase().includes(searchTerm.toLowerCase())||
    item.details_objet.toLowerCase().includes(searchTerm.toLowerCase())||
    item.telephone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};
}, [data, searchTerm]);
// api recherche

  // Erreur et Chargement --debut--
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
        <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
        <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
        Pas de connexion internet !
        </Text>
        <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
          <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }
// Erreur et Chargement --fin--

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>

{data.length > 0 ? (
 <View style={styles.searchBar}>
 <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
 <TextInput
   style={styles.input}
   placeholder="Rechercher..."
   onChangeText={text => setSearchTerm(text)}
value={searchTerm}
 />
</View>
) : (
    <View style={{marginTop: 25, marginRight:15,marginLeft:15,
        elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
      }}>
      <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
        marginBottom:15,color:'#888',textAlign:'center'
      }}>Aucune donnée disponible</Text>
      </View>
    )}

    <FlatList
      data={searchTerm ? searchItems() : data}
      keyExtractor={(item) => item.code_objet}
      renderItem={({item}) => (
        <View style={styles.experienceItem}>
          
        <TouchableOpacity  onPress={() => toggleItem(item.code_objet)}>
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
       )
       }
            </View>

     
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.marque_objet} {item.modele_objet}</Text>
          <Text style={styles.userCode}>{item.categorie_objet} - {item.etat_objet}</Text>
        </View>
        </View>
        {expandedItems.includes(item.code_objet) && (
          <View>
            <View style={{marginBottom:10}}></View>
        <Text style={styles.description}>Référence : {item.reference_objet}</Text>
        <Text style={styles.description}>Propriétaire : {item.nom_prenom}</Text>
        <Text style={styles.description}>Téléphone : {item.telephone}</Text>
        <Text style={styles.description}>Description : {item.details_objet}</Text>
        <View style={{marginBottom:20}}></View>
    <TouchableOpacity
      style={styles.followButton2} onPress={() => navigation.navigate('Declaration objet tiers',{item})}>
      <Text style={styles.followButtonText2}>Voir les détails</Text>
    </TouchableOpacity>
        </View>
      )}
   
      </TouchableOpacity>
      </View>


      )}/>
      </View>

<View style={styles.overlay}>
        <View
          style={{ flex: 1, paddingHorizontal: 4 }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Declaration objet tiers')}>
          <Text style={styles.btnText}>
        Déclarer un objet
      </Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
    marginBottom:60
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white', // Fond blanc pour la barre de recherche
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.45,
  },
});


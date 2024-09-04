import React , {useEffect, useState, useMemo } from 'react';
import {SafeAreaView,StyleSheet,View,FlatList,Image,Text,TouchableOpacity,ActivityIndicator,TextInput} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Reseau({navigation,item}){

  // liste des services mobile
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true); // Indiquer que le rafraîchissement est en cours
    getReseau(); // Appeler la fonction de récupération des données
    setRefreshing(false); // Indiquer que le rafraîchissement est terminé
  };

useEffect(()=>{
  navigation.setOptions({ title: 'Dépot des fonds' });
 // Exécuter la fonction avec cache
 const delay = 10000; // Définir le délai à 1 minute
 getReseau(); 
 // Définir un intervalle pour exécuter la fonction sans cache toutes les 1 minute
 const intervalId = setInterval(getReseau2, delay);
 // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'effet se réexécute
 return () => clearInterval(intervalId);
},[])

// liste
const getReseau = async () => {
  setIsLoading(true);
 try {
  const response = await fetch(`https://adores.tech/api/carte/service.php`, {
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
const getReseau2 = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/carte/service.php`, {
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
// In des mobile money

// api recherche
const searchItems = useMemo(() => {
  return () => {
  const filteredData = data.filter(item =>
    item.reseau.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pays.toLowerCase().includes(searchTerm.toLowerCase()) 
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
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.userContainer}>

           {item.photo64 ? (
            <Image
alt=""
source={{ uri: `data:${item.type};base64,${item.photo64.toString('base64')}` }}
style={styles.userPhoto}
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.userPhoto}
/>
  )}

     
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.reseau}</Text>
          <Text style={styles.userCode}>{item.pays}</Text>
        </View>
        
        <View style={styles.buttonContainer}>

        {item.etat === "Actif" ? (
        <TouchableOpacity
          style={[styles.followButton2, styles.rejectButton]} onPress={() => navigation.navigate('Rechargement direct',{item})}>
          <Text style={styles.followButtonText2}>
            Directe
          </Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity
          style={[styles.followButton2, styles.rejectButton]} onPress={() => alert('Ce service est actuellement indisponible !')}>
          <Text style={styles.followButtonText2}>
            Directe
          </Text>
        </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.followButton2} onPress={() => navigation.navigate('Rechargement indirect',{item})}>
          <Text style={styles.followButtonText}>
            Indirecte
          </Text>
        </TouchableOpacity>

        
      </View>
        
      </View>



      )}/>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Fond blanc
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
    marginBottom: 10,
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
    fontWeight: 'bold',
  },
  userCode: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#2593B6',
    borderColor:'#2593B6',
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
    fontSize: 12,

  },
  followButtonText2: {
    color: '#2593B6',
    fontSize: 12,
  },
  followingButtonText: {
    color: '#333',
  },
  followButton2: {
    backgroundColor: '#2593B6',
    borderColor:'#2593B6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width:90,
    marginBottom: 8, // Espacement entre les boutons
  },
  rejectButton: {
    backgroundColor: 'gray', // Couleur pour le bouton "Refuser"
    borderWidth: 1,
    borderColor:'#2593B6',
    backgroundColor: 'white',

  },
});


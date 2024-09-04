import React , {useEffect, useState, useContext , useMemo } from 'react';
import { SafeAreaView,View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput,ActivityIndicator, Linking } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function ListeProduit({navigation, item}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [contact, setContact] = useState([]);

  const handleRefresh = () => {
    setRefreshing(true);
    getPrestation();
    setRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({title: 'Nos articles'});
    getContact();
    const delay = 10000;
    getPrestation();
    const intervalId = setInterval(getPrestation2, delay);
    return () => clearInterval(intervalId);
  }, []);

  const getPrestation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://adores.tech/api/carte/nos-produits.php`, {
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
  };

  const getPrestation2 = async () => {
    try {
      const response = await fetch(`https://adores.tech/api/carte/nos-produits.php`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setError(error);
    }
  };

  // liste
const getContact = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/carte/lien-contact.php`, {
    headers: {
      //'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setContact(newData);
} catch (error) {
  setError(error);
}
}

  const searchItems = useMemo(() => {
    return () => {
      const filteredData = data.filter(item =>
        item.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prix.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredData;
    };
  }, [data, searchTerm]);
  
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (

        <TouchableOpacity style={styles.videoContainer} onPress={() => navigation.navigate("Details produit", { item })}>
                       {item.photo64 ? (
            <Image
alt=""
resizeMode="cover"
source={{ uri: `data:${item.type_photo};base64,${item.photo64.toString('base64')}` }}
style={styles.videoThumbnail}
/>
) : (
<Image
alt=""
resizeMode="cover"
source={require("../../assets/images/user.jpg")}
style={styles.videoThumbnail}
/>
  )}
      

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.libelle}</Text>
        <Text style={styles.videoChannel}>Prix : {parseFloat(item.prix).toLocaleString("fr-FR")} F</Text>
        <Text style={styles.videoViews}>{item.statut}</Text>
      </View>
    </TouchableOpacity>

      )}/>


    </View>
     <View style={styles.overlay}>
     <View style={styles.footer}>
       <TouchableOpacity onPress={() => { Linking.openURL(`tel:${contact}`); }} style={{ flex: 1 }}>
         <View style={styles.btnAppel}>
           <MaterialCommunityIcons color="#fff" name="phone" size={25} />
         </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => { Linking.openURL(`sms:${contact}`); }} style={{ flex: 1, paddingHorizontal: 8 }}>
         <View style={styles.btnSms}>
           <MaterialCommunityIcons color="#fff" name="message-processing" size={25} />
         </View>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => { Linking.openURL(`https://wa.me/${contact}`); }} style={{ flex: 1 }}>
         <View style={styles.btnWhatsapp}>
           <MaterialCommunityIcons color="#fff" name="whatsapp" size={25} />
         </View>
       </TouchableOpacity>
     </View>
   </View>
 </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 80,
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
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8, // Bordures arrondies
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
  },
  videoThumbnail: {
    width: 88,
    height: 88,
    borderRadius: 12,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoChannel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  videoViews: {
    fontSize: 14,
    color: 'black',
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
  footer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  btnWhatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#4FB048',
    borderColor: '#4FB048',
    height: 52,
    //marginRight:10
  },
  btnAppel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#D64430',
    borderColor: '#D64430',
    height: 52,
    //marginRight:10
  },
  btnSms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    height: 52,
    //marginRight:10
  },
});


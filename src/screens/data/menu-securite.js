import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'pencil-box-outline',
    titre: "DÉCLARATION D'UN APPAREIL",
    libelle: "Enregistrer vos appareils",
    src : 'Declaration objet'
  },
  {
    id: '2',
    image: 'devices',
    titre: "MES APPAREILS",
    libelle: "Localiser mes appareils",
    src : 'Geolocalisation Repere'
  },
  {
    id: '3',
    image: 'transit-transfer',
    titre: "TRANSFERT D'APPAREILS",
    libelle: 'Transférer les appareils',
    src : 'Transfert objet'
  },
  {
    id: '4',
    image: 'account-multiple-plus-outline',
    titre: 'REGISTRE DE CONTROLE',
    libelle: "Vérifier les contours d'un appareil",
    src : 'Registre de controle'
  },
  {
    id: '5',
    image: 'fire-alert',
    titre: 'APPAREILS PERDUS / VOLÉS',
    libelle: 'Voir la liste des appareils disparus',
    src : 'Liste objets disparus'
  },
  {
    id: '6',
    image: 'bag-personal-outline',
    titre: 'APPAREILS RETROUVÉS',
    libelle: 'Voir la liste appareils retrouvés',
    src : 'Liste objets retrouves'
  },
  {
    id: '7',
    image: 'map-marker-radius-outline',
    titre: "MA POSITION",
    libelle: "Déterminer mon emplacement",
    src : 'Geolocalisation'
  },
];

export default function MenuSecurite({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );


  useEffect(()=>{
    navigation.setOptions({ title: 'Menu sécurité' });
},[])

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FeatherIcon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(item.src)}>
          <View style={styles.cardIcon}>
                    <MaterialCommunityIcons color="#000" name={item.image} size={24}/>
                    </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.titre}</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>{item.libelle}</Text>
            </View>

          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8, // Bordures arrondies
    backgroundColor: 'white', // Fond gris clair
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  dataText: {
    fontSize: 14,
    color: 'gray',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
    marginRight: 16,
  },
});




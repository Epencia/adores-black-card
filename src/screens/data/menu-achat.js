import React , {useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    image: 'cash-100',
    titre: "PAIEMENT MARCHAND",
    libelle: "Faire un achat dans une boutique",
    src : 'Scanner QRCode'
  },
  {
    id: '2',
    image: 'diamond-stone',
    titre: "DEMANDE D'ESPÈCES",
    libelle: "Demander à recevoir de l'espèce",
    src : 'Paiement espece'
  },
  {
    id: '3',
    image: 'credit-card-minus-outline',
    titre: "RÉSUMÉ DES ACHATS",
    libelle: "Voir la liste de vos achats",
    src : 'Liste transaction achat'
  },
  {
    id: '4',
    image: 'credit-card-plus-outline',
    titre: "RÉSUMÉ DES VENTES",
    libelle: "Voir la liste de vos ventes",
    src : 'Liste transaction vente'
  },
  {
    id: '5',
    image: 'cash-multiple',
    titre: "RÉGLEMENT DES CRÉDITS",
    libelle: "Voir l'historique des réglements",
    src : 'Liste transaction reglement'
  },
  {
    id: '6',
    image: 'store-outline',
    titre: "NOS BOUTIQUES",
    libelle: "Découvrir nos boutiques partenaires",
    src : 'Catalogue'
  },
  {
    id: '7',
    image: 'bag-personal-outline',
    titre: "NOS ARTICLES",
    libelle: "Découvrir nos articles vendus",
    src : 'Produits'
  },
  {
    id: '8',
    image: 'card-account-details-outline',
    titre: "MES BLACK CARTES",
    libelle: "Voir vos cartes de fidelité",
    src : 'Ma carte'
  },
];

export default function MenuAchat({navigation}) {

  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item.titre.toLowerCase().includes(searchText.toLowerCase())||
    item.libelle.toLowerCase().includes(searchText.toLowerCase())   
  );

  useEffect(()=>{
    navigation.setOptions({ title: 'Menu achat' });
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




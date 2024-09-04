import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity,Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Svg, { Rect, Image } from 'react-native-svg';
import { GlobalContext } from '../../global/GlobalState';

const { width } = Dimensions.get('window');

export default function MaCarte({ navigation }) {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setuser] = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({ title: "Mes cartes" });
    fetch(`https://adores.tech/api/carte/liste-carte.php?matricule=${user[0].matricule}`) // Remplacez par votre URL d'API
      .then(response => response.json())
      .then(data => {
        setCardsData(data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert("Message", error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (currentIndex < cardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderCard = ({ item, index }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContainer}>
        {/* Recto de la carte */}
        <Svg width={width * 0.8} height={180}>
          {/* Rectangle noir représentant la carte */}
          <Rect x="10" y="10" width={width * 0.8 - 20} height={170} fill="#000" rx="15" />

          {/* Numéro de carte */}
          <Text style={styles.cardNumber}>{item.numero_carte.replace(/(.{4})/g, '$1 ').trim()}</Text>

          {/* Nom du titulaire de la carte */}
          <Text style={styles.cardHolderName}>{item.nom_prenom}</Text>

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={item.qrValue}
              size={80}
              color="black"
              backgroundColor="white"
            />
          </View>
        </Svg>

        {/* Verso de la carte */}
        <Svg width={width * 0.8} height={180}>
          {/* Rectangle blanc représentant le verso de la carte */}
          <Rect x="10" y="10" width={width * 0.8 - 20} height={170} fill="#000" rx="15" />

          {/* Logo centré */}
          <Image
            x="15%"
            y="-5%"
            width="200"
            height="200"
            href={require('../../assets/blob.jpeg')}
          />
        </Svg>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Carte : {index + 1}</Text>
        <Text style={styles.detailsText}>Numéro : {item.numero_carte.replace(/(.{4})/g, '$1 ').trim()}</Text>
        <Text style={styles.detailsText}>Bénéficiaire: {item.nom_prenom}</Text>
        <Text style={styles.detailsText}>Solde : {parseFloat(item.solde_carte).toLocaleString("fr-FR")} F</Text>
        <Text style={styles.detailsText}>Matricule : {item.matricule}</Text>
        <Text style={styles.detailsText}>Statut : {item.etat_carte}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cardsData.length > 0 && (
        <>
          <FlatList
            data={[cardsData[currentIndex]]}
            renderItem={({ item }) => renderCard({ item, index: currentIndex })}
            keyExtractor={item => item.numero_carte}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.navigationContainer}>
            <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
              <Text style={[styles.navigationText, currentIndex === 0 && styles.disabledText]}>Précédent</Text>
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>{`${currentIndex + 1} sur ${cardsData.length}`}</Text>
            <TouchableOpacity onPress={handleNext} disabled={currentIndex === cardsData.length - 1}>
              <Text style={[styles.navigationText, currentIndex === cardsData.length - 1 && styles.disabledText]}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  cardWrapper: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  cardHolderName: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    top: 90,
    left: 20,
  },
  qrCodeContainer: {
    position: 'absolute',
    top: 45,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    width: width * 0.8,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  navigationText: {
    fontSize: 16,
    color: '#0000ff',
  },
  disabledText: {
    color: '#cccccc',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#000',
  },
});

import React , {useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity, Image,Alert
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalContext } from '../../global/GlobalState';

const items = [
  {
    img: 'account-cash-outline',
    name: 'Dépot',
    src : 'Moyens de rechargement',
  },
  {
    img: 'cash-fast',
    name: 'Retrait',
    src : 'Retrait',
  },
  {
    img: 'bank-transfer',
    name: 'Transfert',
    src : 'Transfert',
  },
  {
    img: 'card-account-details',
    name: 'Transactions',
    src : 'Transactions',
  },

];

export default function MonCompte({navigation}) {


  // liste des cartes
  const [user, setuser] = useContext(GlobalContext);
  const [SoldeTotal, setSoldeTotal] = useState([]);
  
  const [showBalance, setShowBalance] = useState(false);


  const qrValue = `https://adores.tech/produit/AccueilScan/${user?.[0]?.matricule}${user?.[0]?.login}${user?.[0]?.mdp}`;



useEffect(() => {
  navigation.setOptions({title: 'Mon compte'});
  getSolde();
  const intervalId = setInterval(getSolde, 1000);
  return () => clearInterval(intervalId); // Clean up the interval on component unmount
}, []);




// Solde total epargne
const getSolde = () =>{
 
  fetch(`https://adores.tech/api/carte/affichage-profil.php?matricule=${user[0].matricule}`,{
  
    method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
      
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        if(result !== null) {
          setSoldeTotal(result);
        } else {
          setSoldeTotal([]); // Set an empty array if the result is null
        }
        }
   )
   .catch((error)=>{
    Alert.alert('Error:', error); 
   });
  
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

<View style={styles.container}>

        <ScrollView>
        {user[0].profil ? (
        <Text style={styles.balanceTitle2}>Formule *{user[0].profil}*</Text>
        ) : (
       <Text style={styles.balanceTitle2}>Aucune formule</Text>
          )}

        <TouchableOpacity style={styles.balance} onPress={() => setShowBalance(!showBalance)}>
        <View>
            <Text style={styles.balanceText}>Solde Principal</Text>
            {SoldeTotal[0] ? (
            <Text style={styles.balanceTitle}>
              {showBalance
          ? SoldeTotal[0].solde.toString().replace(/\d/g, '*')
          : parseFloat(SoldeTotal[0].solde).toLocaleString('fr-FR')}{' '}
         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>F </Text>
            </Text>
            ) : (
              <Text style={styles.balanceTitle}>0{' '} 
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>F </Text>
              </Text>
            )}
        </View>
        </TouchableOpacity>

         

          <TouchableOpacity style={styles.balance2} 
        onPress={() => Alert.alert("Message","Votre matricule est : "+user[0].matricule)}>
              <QRCode size={200}  value={qrValue} />
        </TouchableOpacity>


         
          <View style={styles.categories}>
            <ScrollView
              contentContainerStyle={styles.categoriesContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {items.map(({ img, name,src }, index) => {
                return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate(src)}>
                  <View style={[styles.card, {  borderWidth: 1,backgroundColor: 'white',borderColor: '#2593B6',}]}>
                  <MaterialCommunityIcons
                  color="#2593B6"
                  name={img}
                  size={40}
                />
                    <Text style={styles.cardLabel} numberOfLines={1}>{name}</Text>
                  </View>
                </TouchableOpacity>
               );
              })}
            </ScrollView>
          </View>

         
        </ScrollView>
</View>

      
      <View style={styles.overlay}>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ma carte')}
            style={{ flex: 1, paddingHorizontal: 8 }}>
            <View style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Voir mes cartes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
    padding: 16,
    marginBottom:60
  },
  balance3: {
    backgroundColor: '#266EF1',
    borderRadius: 24,
    marginTop: 22,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance2: {
    //backgroundColor: '#f99027',
    borderRadius: 24,
    marginTop: 32,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTitle3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  balanceTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2593B6',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textAlign:'center'
  },
  balanceValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  send: {
    marginVertical: 32,
  },
  sendTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sendScroll: {
    marginHorizontal: -8,
  },
  sendUser: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginBottom: 1,
    color:"#4169E1",
    //borderWidth:1,
    //borderColor:"#4169E1",
  },
  sendUserName: {
    fontSize: 12,
    color: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    //fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBadge: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#a3a3a3',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#121212',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    top: 0,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: '#d1d5db',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 2,
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
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    height: 52,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    height: 52,
  },
  btnSecondaryText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#fff',
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
  categoriesContent: {
    paddingVertical: 12,
    //paddingHorizontal: 14,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  categoriesAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  categoriesActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
  },
  card: {
    width: 100,
    paddingVertical: 15,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  cardLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
    color: '#252117',
  },
  categories: {
    marginTop: 10,
    //marginBottom: 100,
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    backgroundColor:'#2593B6',
    borderRadius: 24,
    padding: 23,
    marginTop: 22,
    textAlign:'center'
  },
  balanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center'
  },
  balanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
    textAlign:'center'
  },
  balanceButton: {
    width: 42,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
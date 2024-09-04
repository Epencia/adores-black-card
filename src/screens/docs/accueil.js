import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalContext } from '../../global/GlobalState';
import { useHeaderHeight } from '@react-navigation/elements';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);
const screenHeight = Dimensions.get("window").height; // Récupérez la hauteur de l'écran

export default function AccueilMobile({navigation}) {

    const headerHeight = useHeaderHeight();
  // Calculer la hauteur restante
  const remainingHeight = screenHeight - headerHeight + StatusBar.currentHeight;

    const [user, setUser] = useContext(GlobalContext);
    const [count, setCount] = useState([]);
    const [nombre, setNombre] = useState([]);

    const [NombreCommande, setNombreCommande] = useState([]);
    const [NombrePrestation, setNombrePrestation] = useState([]);
    const [NombreObjet, setNombreObjet] = useState([]);


    useEffect(()=>{

      // nouveau
      //getNombrePrestation();
      //getNombreCommande();
      getNombreObjet();


    const updateData = () => {
      getNombreNotification();
      getNombreMessage();
    };
    updateData(); // Appeler la fonction immédiatement au montage
    const intervalId = setInterval(updateData, 1000);
    return () => clearInterval(intervalId);
    },[])
  
  
 

  // Notification debut
  const getNombreNotification = () =>{

    fetch(`https://adores.tech/api/carte/nombre-notification.php?id=${user[0].id}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setCount(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }

  // fin notification
    // messages
    const getNombreMessage = () =>{

      fetch(`https://adores.tech/api/carte/nombre-message.php?id=${user[0].id}`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombre(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
      }

  // nombre de beneficiaires
  const getNombrePrestation = () =>{

    fetch(`https://adores.tech/api/carte/nombre-prestation.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
          setNombrePrestation(result);
          }
     )
     .catch((error)=>{
      alert(error);
     });
  
    }

    // nombre de stagiaires
    const getNombreCommande = () =>{

      fetch(`https://adores.tech/api/carte/nombre-commande.php?matricule=${user[0].matricule}`,{
        method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          
      })
      .then((response) => response.json())
       .then(
           (result)=>{
            setNombreCommande(result);
            }
       )
       .catch((error)=>{
        alert(error);
       });
    
      }


      // total formation
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
      alert(error);
     });
    }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', minHeight: remainingHeight }}>

<StatusBar backgroundColor="white" barStyle="dark-content" />

        <ScrollView>

      <View style={styles.container}>
        <View style={styles.header}>

        <View style={styles.headerAction}>
        <Image
alt=""
source={require('../../assets/logo2.png')}
style={styles.avatarImg2}
/>
</View>
<Text style={{color: '#414d63',fontSize: 20,fontWeight: 'bold',marginRight:60}}>Adorès</Text> 

    <View style={styles.headerAction}>
    <TouchableOpacity onPress={() => navigation.navigate('Mon compte')}>
    <Icon name="credit-card" size={24} color="#414d63" style={{marginRight: 15}} />
    </TouchableOpacity>
    </View>

    <View style={styles.headerAction}> 
    <TouchableOpacity onPress={() => navigation.navigate('Liste des messages')}>
    <Icon name="comment" size={24} color="#414d63" style={{marginRight: 15}} />
    {nombre > 0 && (
          <View
          style={{
            position: 'absolute',
            top: -5,
            right: 7,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 8 }}>{nombre}</Text>
        </View>
        )}
    </TouchableOpacity>
    </View>
    
    <View style={styles.headerAction}>
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
    <Icon name="notifications" size={24} color="#414d63" style={{marginRight: 1}} />
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
          <Text style={{ color: 'white', fontSize: 8 }}>{count}</Text>
        </View>
        )}
    </TouchableOpacity>
    </View>

       <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Deconnexion')}>
              <Icon name="lock" size={24} color="#414d63" style={{marginRight: 1}} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profil')}>
            {user[0].photo64 ? (
              <Image
                alt=""
                source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
                style={styles.avatarImg}
              />
              ) : (
                <Image
                alt=""
                source={require("../../assets/images/user.jpg")}
                style={styles.avatarImg}
              />
              )}


              <View style={styles.avatarNotification} />
            </TouchableOpacity>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle} numberOfLines={2}>{user[0].nom_prenom}</Text>

              <Text style={styles.profileSubtitle}>
              {user[0].role}
                {' · '}
                <Text style={{ color: '#266EF1' }}>{user[0].matricule}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.profileDescription} numberOfLines={3}>
          {user[0].description}
          </Text>

  
        </View>

        <View style={styles.stats}>
          {[
            { label: 'Credits', value: NombreObjet || '0', src:'Prestations'  },
            { label: 'Achats', value: NombreObjet || '0', src:'Liste commandes'  },
            { label: 'Appareils', value: NombreObjet || '0', src:'Liste objets catalogue' },
          ].map(({ label, value,src }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(src)}
              style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}>

              <Text style={styles.statsItemText}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btnGroup}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Menu localisation')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Credits</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Menu compte')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText} numberOfLines={1}>Compte</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Menu services')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Sécurité</Text>
            </View>
          </TouchableOpacity>
          
        </View>

        <View style={styles.list}>
          <View style={styles.listHeader}></View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {[
              {
                icon: 'account-tie-outline',
                label: 'Menu commerce',
                company: 'Cliquez-ici',
                jobType: 'Découvrez ce menu pour le commerce',
                src: 'Menu commerce',

              },
              {
                icon: 'certificate-outline',
                label: 'Menu compte',
                company: 'Cliquez-ici',
                jobType: 'Découvrez ce menu pour votre compte',
                src: 'Menu compte',

              },
              {
                icon: 'shield-account-outline',
                label: 'Menu sécurité',
                company: 'Cliquez-ici',
                jobType: 'Découvrez ce menu pour la sécurité',
                src: 'Menu services',

              },

            ].map(({ icon, label, company, jobType, src }, index) => (
                
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(src)}>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name={icon} size={24}/>
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.list2}>
              <View>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="credit-card-outline" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Gestion du compte</Text>
                      <Text style={styles.cardSubtitle}>Suivez l'activité de votre compte</Text>
                    </View>
                  </View>


                  <View style={styles.btnGroup2}>

                  <TouchableOpacity
            onPress={() => navigation.navigate('Mon compte')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Solde</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Moyens de rechargement')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Dépot</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Retrait')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Retrait</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Transfert')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Transfert</Text>
            </View>
          </TouchableOpacity>
          
        </View>
                </View>
              </View>
        </View>


        <View style={styles.list2}>
              <View>
                <View style={styles.card2}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <MaterialCommunityIcons color="#000" name="laptop" size={24}/>
                    </View>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>Gestion des produits</Text>
                      <Text style={styles.cardSubtitle}>Explorez votre parcours professionnel</Text>
                    </View>
                  </View>


                  <View style={styles.btnGroup2}>

                  <TouchableOpacity
            onPress={() => navigation.navigate('Nouvelle prestation')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Nouveau</Text>
            </View>
          </TouchableOpacity>

         
          <TouchableOpacity
            //onPress={() => sheet.current.open()}
            onPress={() => navigation.navigate('Prestations')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Liste</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Liste client')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Clients</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Badge professionnel')}
            style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} numberOfLines={1}>Badge</Text>
            </View>
          </TouchableOpacity>
          
        </View>
                </View>
              </View>
        </View>





      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#2593B6',
  },
  list: {
    marginTop: 18,
    marginHorizontal: -6,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: CARD_WIDTH,
  },
  card2: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    //marginHorizontal: 6,
    //shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    //shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
    width: '100%',
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#778599',
    textAlign: 'justify'
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    //fontWeight: '500',
    lineHeight: 18,
    color: 'gray',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#121a26',
  },
  btnText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#2593B6',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
  },
  btnPrimaryText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    //fontWeight: 'bold',
    lineHeight: 20,
    color: 'gray',
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    //fontWeight: 'bold',
    lineHeight: 18,
    color: 'gray',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
    color: 'gray',
  },
  userContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 8,
    fontSize: 13,
    color: '#778599',
    //fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  done: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6a55',
  },
  radio: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 0,
    height: 44,
  },
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  radioLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    marginLeft: 12,
    marginRight: 'auto',
  },
  avatarImg2: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    borderWidth:1,
    borderColor:'gray'
  },
  btnGroup2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -10,
    marginTop: 18,
    paddingHorizontal : 2,
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'gray',
  },
  list2: {
    marginTop: 18,
    //paddingHorizontal : 12,
  },
  btnText2: {
    fontSize: 12,
    lineHeight: 20,
    //fontWeight: 'bold',
    color: 'black',
  },
});
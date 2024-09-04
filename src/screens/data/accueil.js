import React, {useEffect, useState, useContext,useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Animated,Linking } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../../global/GlobalState';
import { Camera } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg';

export default function AccueilMobile({navigation}) {


    const [user, setUser] = useContext(GlobalContext);
    const [count, setCount] = useState([]);
    const [nombre, setNombre] = useState([]);
    const [carte, setCarte] = useState([]);
    const [contact, setContact] = useState([]);


    useEffect(()=>{
    // carte
    getCarte();
    getContact();
    const updateData = () => {
      getNombreNotification();
      getNombreMessage();
    };
    updateData(); // Appeler la fonction immédiatement au montage
    const intervalId = setInterval(updateData, 1000);
    return () => clearInterval(intervalId);
    },[])
  
  // animation
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    blink.start();

    return () => blink.stop();
  }, [opacity]);

  // ma carte
  // Rechercher par api
const getCarte = async () => {
  try {
   const response = await fetch(`https://adores.tech/api/carte/liste-carte.php?matricule=${user[0].matricule}`, {
     headers: {
       'Cache-Control': 'no-cache',
     },
   });
   const newData = await response.json();
   setCarte(newData);
 } catch (error) {
   setError(error);
 }
 }
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

          const logo = user[0]?.photo64 ? { uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` } : require('../../assets/images/user.jpg');

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerAction}>
        <Image
alt=""
source={require('../../assets/logo2.png')}
style={styles.profilePicture}
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
              <Ionicons name="log-out" size={24} color="#414d63" style={{marginRight: 1}} />
            </TouchableOpacity>
          </View>
        </View>


      {/* QR Code */}
      

      <View style={styles.content}>
      {carte > 0 && (
      <TouchableOpacity style={styles.btn2} onPress={() => { Linking.openURL(`https://wa.me/${contact}`); }}>
      <Animated.Text style={[styles.btnText2, { opacity }]}>
        Cliquez-ici pour activer votre carte
      </Animated.Text>
    </TouchableOpacity>
    )}
      <Text style={styles.text}>{user[0].nom_prenom ? user[0].nom_prenom : "Aucun"}</Text>
      <View>
        <Image
          source={logo} // Remplacez par l'URL de votre photo de profil
          style={styles.profilePic}
        />
        <View style={styles.active}></View>
                    <View style={styles.add}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
                        <Ionicons name="add" size={24} color="#DFD8C8"></Ionicons>
                    </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Scanner QRCode')}>
        <QRCode
                    value={user[0].matricule}
                    size={200}
                    logoBackgroundColor="transparent"
        />
        </TouchableOpacity>
        <Text style={styles.text2}>Scanner le QR Code</Text>
      </View>



      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Menu achat')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Achat</Text>
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
            onPress={() => navigation.navigate('Menu securite')}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText} numberOfLines={1}>Sécurité</Text>
            </View>
          </TouchableOpacity>
      </View>


      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    //backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notification: {
    padding: 10,
  },
  notificationText: {
    fontSize: 24,
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 18,
    color: '#007BFF',
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
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#007BFF',
    backgroundColor:'#007BFF'
  },
  btnText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#2593B6',
  },
  btnText2: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    color: 'white',
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
  profile: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth:1,
    borderColor:'#2593B6'
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#778599',
    textAlign: 'center',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: '#778599',
    textAlign: 'center',
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
  active: {
    backgroundColor: "#22C55E",
    position: "absolute",
    bottom: 28,
    left: 5,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
},
add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 20,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
},
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text2: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});


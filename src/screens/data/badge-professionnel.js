import React , {useEffect, useState, useContext, useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking,FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../global/GlobalState';
import FeatherIcon from 'react-native-vector-icons/Feather';


    export default function BadgeProfessionnel({navigation}) {


  const [produit, setProduit] = useState([]);
  const [ReseauSocial, setReseauSocial] = useState([]);
  const [user, setUser] = useContext(GlobalContext);
  const [error, setError] = useState(null);


  useEffect(() => {
    navigation.setOptions({ title: 'Badge professionnel' });
    getProduit(); 
    getReseauSocial();
  }, []);


      // Produits
      const getProduit = async () => {
        try {
         const response = await fetch(`https://adores.tech/api/carte/produit.php?matricule=${user[0].matricule}`, {
           headers: {
             'Cache-Control': 'no-cache',
           },
         });
         const newData = await response.json();
         setProduit(newData);
       } catch (error) {
         setError(error);
       }
       }


    // Reseau social
    const getReseauSocial = async () => {
        try {
         const response = await fetch(`https://adores.tech/api/carte/liste-reseau-social.php?matricule=${user[0].matricule}`, {
           headers: {
             'Cache-Control': 'no-cache',
           },
         });
         const newData = await response.json();
         setReseauSocial(newData);
       } catch (error) {
         setError(error);
       }
       }
  // Fonction pour obtenir le nom de l'icône FontAwesome5 en fonction du libellé du réseau social
  const getIconName = (libelle) => {
    switch (libelle.toLowerCase()) {
      case 'facebook':
        return 'facebook-f';
      case 'youtube':
        return 'youtube';
      case 'tiktok':
        return 'tiktok';
      case 'whatsapp':
        return 'whatsapp';
      case 'github':
        return 'github';
      case 'snapchat':
        return 'snapchat-ghost';
      case 'linkedin':
        return 'linkedin';
      case 'instagram':
        return 'instagram';
      default:
        return 'globe';
    }
  };

  const getIconColor = (libelle) => {
    switch (libelle.toLowerCase()) {
      case 'facebook':
        return '#1877f2'; // Bleu Facebook
      case 'youtube':
        return '#ff0000'; // Rouge YouTube
      case 'tiktok':
        return '#000000'; // Noir TikTok
      case 'whatsapp':
        return '#25D366'; // Vert WhatsApp
      case 'github':
        return '#171515'; // Noir GitHub
      case 'snapchat':
        return '#FFFC00'; // Jaune Snapchat
      case 'linkedin':
        return '#0A66C2'; // Bleu LinkedIn
      case 'instagram':
        return '#833AB4'; // Violet Instagram
      default:
        return '#007BFF'; // Orange par défaut
    }
  };
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>

          {user[0].photo64 ? (
            <Image
source={{ uri: `data:${user[0].type};base64,${user[0].photo64.toString('base64')}` }}
style={styles.logo}
/>
) : (
<Image
source={require("../../assets/images/user.jpg")}
style={styles.logo}
/>
  )}
          <Text style={styles.name}>{user[0].nom_prenom ? user[0].nom_prenom : "Aucun"}</Text>
<Text style={styles.sectionTitle}>{user[0].profession ? user[0].profession : "Aucun"}</Text>
<Text style={styles.description}>{user[0].description ? user[0].description : "Aucun"}</Text>

        </View>

        
        <View style={styles.section}>
        <FlatList
    horizontal
    data={ReseauSocial}
    keyExtractor={(item) => item.code}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[styles.socialMediaButton]}
        onPress={() => Linking.openURL(item.url)}
      >
        <FontAwesome5 name={getIconName(item.libelle)} size={30} color={getIconColor(item.libelle)} />
      </TouchableOpacity>
    )}
  />
</View>
        

     

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous vous proposons :</Text>
          {produit.map(product => (
            <View key={product.code} style={styles.product}>
              <Image source={require("../../assets/images/user.jpg")} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.libelle}</Text>
                <Text style={styles.productDescription}>{parseFloat(product.prix).toLocaleString("fr-FR")} F</Text>
                <TouchableOpacity onPress={() => alert(product.details)}>
                        <Text style={styles.productDescription2}>Description</Text>
                </TouchableOpacity>
              </View>
              
                <TouchableOpacity style={styles.followButton} onPress={() => navigation.navigate('Messages',{item})}>
                <MaterialCommunityIcons
                color="#2593B6"
                name="cart"
                size={25}
              />
                </TouchableOpacity>
              
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.overlay}>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={()=>{Linking.openURL(`tel:${user[0].telephone}`);}}
            style={{ flex: 1, marginRight: 8 }}>
            <View style={styles.btnSecondary}>
              <MaterialCommunityIcons
                color="#fff"
                name="phone"
                size={25}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{Linking.openURL(`sms:${user[0].telephone}`);}}
            style={{ flex: 1, marginRight: 8 }}>
            <View style={styles.btnSecondary}>
              <MaterialCommunityIcons
                color="#fff"
                name="message-outline"
                size={25}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{Linking.openURL(`mailto:${user[0].email}`);}}
            style={{ flex: 1, marginRight: 8 }}>
            <View style={styles.btnSecondary}>
              <MaterialCommunityIcons
                color="#fff"
                name="email-outline"
                size={25}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { alert('Adresse : '+ user[0].ville +' '+ user[0].adresse); }}
            style={{ flex: 1 }}>
            <View style={styles.btnSecondary}>
              <MaterialCommunityIcons
                color="#fff"
                name="map-marker-outline"
                size={25}
              />
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
    backgroundColor: '#fff',
    marginBottom:80,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  socialMediaContainer: {
    marginHorizontal: 20,
  },
  socialMediaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialMediaButton: {
    flexBasis: '30%', // Largeur fixe de chaque bouton
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  socialMediaText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 12,
  },
  product: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 15,
    borderWidth : 1,
    borderColor :'#90a0ca',
    borderRadius: 12,
    padding : 10
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
  },
  productDescription2: {
    fontSize: 16,
    //fontWeight: 'bold',
    color : '#007BFF',
    textDecorationLine : 'underline'
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
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontWeight: '700',
    color: '#fff',
  },
  btnText: {
    fontSize: 13,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#2593B6',
    height: 50,
    width : 50,
    marginTop : 15
  },
  followButtonText: {
    color: 'white',
  },
});

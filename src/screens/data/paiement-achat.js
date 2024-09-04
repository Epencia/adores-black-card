import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,ScrollView,
  TouchableOpacity,Alert,Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { GlobalContext } from '../../global/GlobalState';




export default function PaiementAchat({navigation, route})  {
       
  //const { data } = route.params;
  const { data } = route.params; // Récupérer les données passées

    const [montant,setMontant] = useState('');
    const [carte,setCarte] = useState('');
    const [user, setUser] = useContext(GlobalContext);
    const [formattedData, setFormattedData] = useState([]);
    const [selected, setSelected] = useState('');

    const [profil, setProfil] = useState(data || '');


  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
  const [errors, setErrors] = useState({}); // Add a state to hold the error messages


  useEffect(()=>{
    getListeCarte();
    getProfil();
    navigation.setOptions({title: 'Paiement marchand'});
    },[])

   // sans variables sessions
const getListeCarte = () => {
  
    fetch(`https://adores.tech/api/carte/liste-carte.php?matricule=${user[0].matricule}`,{
      method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((response) => response.json())
     .then(
         (result)=>{
         
          if (result !== null) {
            // Format the data into the required format for the SelectList component
                    const formattedResult = result.map((item) => ({
                      key: item[1], // Replace 'id' with the unique key property from the data
                      value: item[1]+' ('+parseFloat(item[4]).toLocaleString("fr-FR")+' f)' , // Replace 'name' with the property you want to display in the SelectList
                    }));
                    setFormattedData(formattedResult);
                  } else {
                    setFormattedData([]);
          }
          }
     )
     .catch((error)=>{
      Alert.alert("Message",error);
     });
    
    }
      //  album
      const getProfil = () =>{
        fetch(`https://adores.tech/api/carte/affichage-profil.php?matricule=${data}`,{
            method:'GET',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
         .then(
             (result)=>{
              setProfil(result);
              }
         )
         .catch((error)=>{
          Alert.alert("Message",error);
         });
        
        }

  // PHP MYSQL

	const ValidationPaiement = () =>{

    if (!montant || !carte) {
      setErrors({
        // Update error state with appropriate error messages
        montant: !montant ? 'Le champ Montant est requis' : '',
        carte: !carte ? 'Veuillez sélectionner une Carte' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data

		fetch('https://adores.tech/api/carte/paiement-achat.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				      matricule: user[0].matricule, // matricule du client (expediteur)
				      montant: montant,
              boutique : data, // matricule de la boutique (destinataire)
              carte : carte, // numero de carte du client (expediteur)
        
			})
			
			
		})
		.then((response) => response.json())
		 .then((responseJson)=>{
      Alert.alert("Message",responseJson);
      setIsSubmitting(false);
      setMontant(''); 
      setCarte(''); 
      
		 })
		 .catch((error)=>{
      Alert.alert("Message",error);
     setIsSubmitting(false); 
		 });
		
	}

  // in

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.form}>


    <View style={styles.profileImage}>
    <Text style={styles.userName}>{profil[0].nom_prenom}</Text>
    {profil[0].photo64 ? (
  <Image
alt=""
source={{ uri: `data:${profil[0].type};base64,${profil[0].photo64.toString('base64')}` }}
style={styles.image}
resizeMode="center"
/>
) : (
<Image
alt=""
source={require("../../assets/images/user.jpg")}
style={styles.image}
resizeMode="center"
/>
)}
</View> 


    <Text style={styles.label}>Montant * :</Text>
    <TextInput 
    style={[
      styles.input,
      errors.montant && styles.inputError,
    ]}
    label="Montant *" 
    variant="standard"
    keyboardType="numeric"
    placeholder="Saisir le montant à recevoir"
    onChangeText={(val) => setMontant(val)}
    errorText={errors.montant}
    value={montant}
     />
      {errors.montant && (
          <Text style={styles.errorText}>{errors.montant}</Text>
        )}



<Text style={styles.label}>Ma carte * :</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setCarte(value);
          }}
          items={
            formattedData.map((item) => ({
            label: item.value,
            value: item.key,
          }))}
          placeholder={{ label: '===  Faites votre choix  ===', value: '' }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: [
              styles.inputIOS,
              errors.carte && styles.inputError,
            ],
            inputAndroid: [
              styles.inputAndroid,
              errors.carte && styles.inputError,
            ],
            placeholder: styles.placeholder,
          }}
        />
      </View>
      {errors.carte && (
        <Text style={styles.errorText}>{errors.carte}</Text>
      )}

    
    
    

      <TouchableOpacity style={styles.button} onPress={ValidationPaiement}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: 'red', // Couleur de bordure rouge en cas d'erreur
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginTop:-10
  },
  button: {
    marginTop:20,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    alignItems: 'center'
  },
  profileImage: {
    width: '100%',
      height: 150,
      overflow: "hidden",
      alignSelf: "center",
      marginBottom:20
},
image: {
  flex: 1,
  height: undefined,
  width: undefined,
},
profileImageContainer: {
  flex: 1, // Utilisez flex pour aligner au centre
      justifyContent: 'center', // Alignez verticalement au centre
      alignItems: 'center', // Alignez horizontalement au centre
      backgroundColor: '#fff',
    },
    inputIOS: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 4,
      color: 'black',
      width: '100%',
      height: 40,
    },
    inputAndroid: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 4,
      color: 'black',
      width: '100%',
      height: 40,
    },
    placeholder: {
      color: 'gray',
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
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    userCode: {
      fontSize: 14,
      color: 'black',
      textAlign: 'justify',
    },
});

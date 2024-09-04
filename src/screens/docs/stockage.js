import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,Button,
  TextInput,ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { GlobalContext } from '../../global/GlobalState';

export default function EspaceStockage({navigation})  {


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useContext(GlobalContext);

  const [formule, setFormule] = useState('');
  const [volume, setVolume] = useState('');
  const [prix, setPrix] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    navigation.setOptions({ title: "Espace de stockage"});
    getPrixUnitaire();
  }, []);



  // validation
  const ValidationStockage = () => {
     
    const newErrors = {};

    if (!prix) {
      newErrors.prix = 'Le champ Prix unitaire est requis';
    }

    if (!volume) {
      newErrors.volume = 'Le champ Volume de stockage est requis';
    }

    if (!formule) {
      newErrors.formule = 'Veuillez sélectionner une catégorie';
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/carte/validation-stockage.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  matricule : user[0].matricule,
                  prix : prix,
                  volume : volume,
                  formule : formule,
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setVolume('');
        //setPrix('');
        setFormule('');
       })
       .catch((error)=>{
       alert(error);
       setIsSubmitting(false); // Reset submitting state after data is sent
       });

      setIsSubmitting(true);
      // ...
    }
  };

  // calucl
  const calculateTotalCost = () => {
    const parsedVolume = parseFloat(volume);
    if (!isNaN(parsedVolume) && parsedVolume > 0 && prix > 0) {
      const calculatedCost = parsedVolume * prix;
      setTotal(calculatedCost);
    } else {
      setTotal(0);
    }
  };

  // prix unitaire
const getPrixUnitaire = async () => {
 try {
  const response = await fetch(`https://adores.tech/api/carte/prix-unitaire.php`, {
    headers: {
      //'Cache-Control': 'no-cache',
    },
  });
  const newData = await response.json();
  setPrix(newData);
} catch (error) {
}
}

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

<View style={styles.container}>

      <ScrollView style={styles.form}>


<Text style={styles.label}>Catégorie * :</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setFormule(value);
            //console.log(val);
          }}
          items={[
            { label: 'Nombre de photos', value: 'Album' },
            { label: "Nombre d'operations", value: "Caisse" },
            { label: 'Nombre de produits', value: 'Produit' },
          ]}
          placeholder={{ label: '===  Faites votre choix  ===', value: '' }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: [
              styles.inputIOS,
              errors.formule && styles.inputError,
            ],
            inputAndroid: [
              styles.inputAndroid,
              errors.formule && styles.inputError,
            ],
            placeholder: styles.placeholder,
          }}
          value={formule}
        />
      </View>
      {errors.formule && (
        <Text style={styles.errorText}>{errors.formule}</Text>
      )}


        <Text style={styles.label}>Volume de stockage :</Text>
        <TextInput
          style={[
            styles.input,
            errors.volume && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          keyboardType="numeric"
          placeholder="Entrez le volume de stockage"
          onChangeText={(val) => setVolume(val)}
          value={volume}
        />
        {errors.volume && (
          <Text style={styles.errorText}>{errors.volume}</Text>
        )}

        <Text style={styles.label}>Prix unitaire  :</Text>
        <TextInput
          style={[
            styles.input,
            errors.prix && styles.inputError,
          ]}
          placeholder="Entrez le prix unitaire"
          keyboardType="numeric"
          onChangeText={(val) => setPrix(val)}
          editable={false}
          value={prix}
        />
        {errors.prix && (
          <Text style={styles.errorText}>{errors.prix}</Text>
        )}

<Button title="Calculer le coût total" onPress={calculateTotalCost} />
{total > 0 && (
        <Text style={styles.result}>
          Coût total : {parseFloat(total).toLocaleString("fr-FR")} F CFA
          
        </Text>
      )}

   
      </ScrollView>

      </View>

      {total > 0 && (
      <View style={styles.overlay}>
<TouchableOpacity onPress={ValidationStockage} style={{ flex: 1 }}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>Payer maintenant {parseFloat(total).toLocaleString("fr-FR")} F CFA</Text>

  </View>
</TouchableOpacity>
</View>
 )}



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
    marginBottom:15,
    marginTop:-10,
  },
  button: {
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
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
    //height: 40, // Ajoutez ou ajustez la hauteur comme nécessaire
    alignItems: 'center', // Ajoutez cette ligne pour centrer verticalement le texte
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginTop: 1,
    borderWidth: 1,
    borderColor: 'gray', // Couleur du cercle
    marginBottom: 16,
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
    btn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: '#2593B6',
      borderColor: '#2593B6',
      width:'100%'
    },
    btnText: {
      fontSize: 16,
      lineHeight: 26,
      fontWeight: '600',
      color: '#fff',
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
    result: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign:'center'
    },
});

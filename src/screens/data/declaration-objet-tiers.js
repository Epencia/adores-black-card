import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,ScrollView,
  TouchableOpacity,Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { GlobalContext } from '../../global/GlobalState';

export default function DeclarationObjetTiers({ navigation, route }) {
  const item = route.params?.item || {}; // Récupérer les données passées

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useContext(GlobalContext);

  const [marque, setMarque] = useState(item ? item.marque_objet : '');
  const [modele, setModele] = useState(item ? item.modele_objet : '');
  const [details, setDetails] = useState(item ? item.details_objet : '');
  const [categorie, setCategorie] = useState(item ? item.categorie_objet : '');
  const [recompense, setRecompense] = useState(item ? item.recompense_objet : '');
  const [reference, setReference] = useState(item ? item.reference_objet : '');
  const [proprietaire, setProprietaire] = useState(item ? item.distributeur : '');
  const [code, setCode] = useState(item ? item.code_objet : '');


  useEffect(() => {
    navigation.setOptions({ title: "Déclaration d'un tiers"});
  }, []);



  // validation
  const ValidationObjet = () => {
     

    const newErrors = {};

    if (!reference) {
      newErrors.reference = 'Le champ Référence est requis';
    }

    if (!marque) {
      newErrors.marque = 'Le champ Marque est requis';
    }

    if (!categorie) {
      newErrors.categorie = 'Veuillez sélectionner une catégorie';
    }

    if (!modele) {
      newErrors.modele = 'Le champ Modèle est requis';
    }

    if (!details) {
      newErrors.details = 'Le champ Détails est requis';
    }
    if (!recompense) {
      newErrors.recompense = 'Le champ Récompense est requis';
    }
    if (!proprietaire) {
        newErrors.proprietaire = 'Le champ Propriétaire est requis';
      }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aucune erreur, soumettez le formulaire ici
      fetch('https://adores.tech/api/carte/declaration-objet-tiers.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          // we will pass our input data to server
                  matricule : user[0].matricule,
                  marque : marque,
                  modele : modele,
                  details : details,
                  recompense : recompense,
                  categorie : categorie,
                  reference : reference,
                  proprietaire : proprietaire,
                  code : code,
        })
        
        
      })
      .then((response) => response.json())
       .then((responseJson)=>{
        alert(responseJson);
        setIsSubmitting(false); // Reset submitting state after data is sent
        setCode('');
        setReference('');
        setMarque('');
        setModele('');
        setRecompense('');
        setDetails('');
        setCategorie('');
        setProprietaire('');
       })
       .catch((error)=>{
       alert(error);
       setIsSubmitting(false); // Reset submitting state after data is sent
       });

      setIsSubmitting(true);
      // ...
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

<View style={styles.container}>

      <ScrollView style={styles.form}>

      {code ? (
        <>
          <Text style={styles.label}>Identifiant  :</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={(val) => setCode(val)}
            value={code}
            editable={false}
          />
        </>
      ) : null}


<Text style={styles.label}>Catégorie * :</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setCategorie(value);
          }}
          items={[
            { label: 'Telephone', value: 'Téléphone' },
            { label: 'Ordinateur', value: 'Ordinateur' },
            { label: 'Moto', value: 'Moto' },
            { label: 'Voiture', value: 'Voiture' },
          ]}
          placeholder={{ label: '===  Faites votre choix  ===', value: '' }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: [
              styles.inputIOS,
              errors.categorie && styles.inputError,
            ],
            inputAndroid: [
              styles.inputAndroid,
              errors.categorie && styles.inputError,
            ],
            placeholder: styles.placeholder,
          }}
          value={categorie}
        />
      </View>
      {errors.categorie && (
        <Text style={styles.errorText}>{errors.categorie}</Text>
      )}


        <Text style={styles.label}>Référence * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.reference && styles.inputError, // Ajoutez des styles d'erreur conditionnels
          ]}
          placeholder="Entrez votre identifiant objet"
          onChangeText={(val) => setReference(val)}
          value={reference}
        />
        {errors.reference && (
          <Text style={styles.errorText}>{errors.reference}</Text>
        )}

        <Text style={styles.label}>Marque * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.marque && styles.inputError,
          ]}
          placeholder="Entrez la marque"
          onChangeText={(val) => setMarque(val)}
          value={marque}
        />
        {errors.marque && (
          <Text style={styles.errorText}>{errors.marque}</Text>
        )}


        <Text style={styles.label}>Modèle * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.modele && styles.inputError,
          ]}
          placeholder="Entrez le modele"
          onChangeText={(val) => setModele(val)}
          value={modele}
        />
        {errors.modele && (
          <Text style={styles.errorText}>{errors.modele}</Text>
        )}


        <Text style={styles.label}>Récompense * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.recompense && styles.inputError,
          ]}
          keyboardType="numeric"
          placeholder="Entrez le montant de la récompense"
          minLength={4}
          onChangeText={(val) => setRecompense(val)}
          value={recompense}
        />
        {errors.recompense && (
          <Text style={styles.errorText}>{errors.recompense}</Text>
        )}


<Text style={styles.label}>Propriétaire * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.proprietaire && styles.inputError,
          ]}
          keyboardType="numeric"
          placeholder="Entrez le matricule du proprietaire"
          onChangeText={(val) => setProprietaire(val)}
          value={proprietaire}
        />
        {errors.recompense && (
          <Text style={styles.errorText}>{errors.proprietaire}</Text>
        )}



      <Text style={styles.label}>Caractéristiques * :</Text>
        <TextInput
          style={[
            styles.input,
            errors.details && styles.inputError,
            { height:120}
          ]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Saisir les détails"
          onChangeText={(val) => setDetails(val)}
          value={details}
        />
        {errors.details && (
          <Text style={styles.errorText}>{errors.details}</Text>
        )}

   
      </ScrollView>

      </View>


      <View style={styles.overlay}>
<TouchableOpacity onPress={ValidationObjet} style={{ flex: 1 }}>
  <View style={styles.btn}>
    <Text style={styles.btnText}>Valider</Text>

  </View>
</TouchableOpacity>
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
      fontSize: 18,
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
});

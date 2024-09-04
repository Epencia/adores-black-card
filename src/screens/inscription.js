import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../global/GlobalState';
import { MaterialIcons } from '@expo/vector-icons';

export default function Inscription({ navigation }) {
  // Variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [NomPrenom, setNomPrenom] = useState('');
  const [user, setUser] = useContext(GlobalContext);

  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hideDialog = () => setVisible(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state to track form submission
  const [errors, setErrors] = useState({}); // Add a state to hold the error messages

  // PHP MYSQL
  useEffect(() => {
    navigation.setOptions({ title: 'Espace inscription' });
    if (user) {
      navigation.navigate('Accueil Mobile');
    }
  }, []);

  const ValidationInscription = () => {
    if (!username || !telephone || !password || !NomPrenom) {
      setErrors({
        // Update error state with appropriate error messages
        username: !username ? "Le champ Nom d'utilisateur est obligatoire" : "",
        password: !password ? 'Le champ Mot de passe est obligatoire' : '',
        NomPrenom: !NomPrenom ? 'Le champ Nom et Prénoms est obligatoire' : '',
        telephone: !telephone ? 'Le champ Téléphone est obligatoire' : '',
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true while sending the data

    fetch('https://adores.tech/api/carte/abonnement.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // We will pass our input data to the server
        telephone: telephone,
        nom_prenom: NomPrenom,
        login: username,
        mdp: password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        setUsername('');
        setPassword('');
        setTelephone('');
        setNomPrenom('');
        // Stop the ActivityIndicator
        setIsSubmitting(false);
      })
      .catch((error) => {
        alert(error);
        setIsSubmitting(false); // Stop the ActivityIndicator on error
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            alt="Adorès"
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={styles.logoImg} />

          <View style={styles.form}>
            <Text style={styles.title}>Ouvrir un compte</Text>
            <Text style={styles.subtitle}>Veuillez fournir toutes vos informations ci-dessous pour créer un nouveau compte.</Text>

            <TextInput
              placeholder="Nom & Prénoms"
              placeholderTextColor="#A5A5AE"
              onChangeText={(val) => setNomPrenom(val)}
              value={NomPrenom}
              style={[styles.input, { borderColor: errors.NomPrenom ? 'red' : '#EFF1F5' }]} />
            {errors.NomPrenom && <Text style={styles.errorText}>{errors.NomPrenom}</Text>}

            <TextInput
              placeholder="Téléphone (10 chiffres)"
              placeholderTextColor="#A5A5AE"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(val) => setTelephone(val)}
              value={telephone}
              style={[styles.input, { borderColor: errors.telephone ? 'red' : '#EFF1F5' }]} />
            {errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}

            <TextInput
              placeholder="Nom d'utilisateur (Login)"
              placeholderTextColor="#A5A5AE"
              onChangeText={(val) => setUsername(val)}
              value={username}
              style={[styles.input, { borderColor: errors.username ? 'red' : '#EFF1F5' }]} />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <View>
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#A5A5AE"
                onChangeText={(val) => setPassword(val)}
                secureTextEntry={!showPassword}
                value={password}
                style={[styles.input, { borderColor: errors.password ? 'red' : '#EFF1F5' }]} />
              <TouchableOpacity style={styles.passwordIconContainer} onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#A5A5AE" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {isSubmitting && <ActivityIndicator size="large" color="blue" />}

            <TouchableOpacity onPress={ValidationInscription}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Valider</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
              <Text style={styles.formFooter}>
                Vous avez déjà un compte ?
                <Text style={{ color: '#3367D6' }}> Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoImg: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 29,
    fontWeight: '700',
    color: '#242424',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#989898',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 44,
    backgroundColor: '#EFF1F5',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFF1F5',
  },
  form: {
    width: '100%',
  },
  formFooter: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#2593B6',
    borderColor: '#2593B6',
    marginTop: 24,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  passwordIconContainer: {
    position: 'absolute',
    top: 10,
    right: -12,
    zIndex: 1,
    height: 50,
    width: 48,
  },
  errorText: {
    color: 'red',
    marginTop: -10,
    marginBottom: 15,
  },
});

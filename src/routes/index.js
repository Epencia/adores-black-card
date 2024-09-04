import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/connexion';
import LogoutScreen from '../screens/deconnexion';
import Reseau from '../screens/data/liste-mobile-money';
import Retrait from '../screens/data/retrait-carte';
import Transfert from '../screens/data/transfert-carte';
import Transactions from '../screens/data/liste-transaction';
import DetailsTransaction from '../screens/data/details-transaction';
import Messages from '../screens/data/messages';
import ProfilScreen from '../screens/data/profil-utilisateur';
import ListeNotification from '../screens/data/notification';
import AccueilMobile from '../screens/data/accueil';
import Exemple from '../screens/exemple';
import MenuCompte from '../screens/data/menu-compte';
import ScanQRCode from '../screens/data/scan-qrcode';;
import ListeMessage from '../screens/data/liste-message';
import RechargementDirect from '../screens/data/validation-rechargement-direct';
import RechargementIndirect from '../screens/data/validation-rechargement-indirect';
import MenuEtudes from '../screens/data/menu-compte';
import geolocalisation from '../screens/data/geolocalisation';
import RegistreControle from '../screens/data/registre-controle';
import BadgeProfessionnel from '../screens/data/badge-professionnel';
import ListeObjetsDisparus from '../screens/data/liste-objets-disparus';
import ListeObjetsRetrouves from '../screens/data/liste-objets-retrouves';
import ListeObjetsCatalogue from '../screens/data/liste-objets-catalogue';
import DeclarationObjet from '../screens/data/declaration-objet';
import TransfertObjet from '../screens/data/transfert-objet';
import ListeObjetsCatalogueTiers from '../screens/data/liste-objets-catalogue-tiers';
import DeclarationObjetTiers from '../screens/data/declaration-objet-tiers';
import Inscription from '../screens/inscription';
import MonCompte from '../screens/data/mon-compte';
import Statistiques from '../screens/data/statistiques';
import GeolocalisationMultiple from '../screens/data/geolocalisation-data';
import GeolocalisationRecherche from '../screens/data/geolocalisation-recherche';
import GeolocalisationRepere from '../screens/data/geolocalisation-repere';
import MaCarte from '../screens/data/carte-black';
import MenuAchat from '../screens/data/menu-achat';
import MenuSecurite from '../screens/data/menu-securite';
import PaiementAchat from '../screens/data/paiement-achat';
import Catalogue from '../screens/data/liste-categorie';
import Boutiques from '../screens/data/liste-categorie-partenaire';
import ListeTransactionVente from '../screens/data/liste-transaction-vente';
import ListeTransactionAchat from '../screens/data/liste-transaction-achat';
import ListeTransactionReglement from '../screens/data/liste-transaction-reglement';
import ListeProduit from '../screens/data/liste-produit';
import DetailsProduit from '../screens/data/details-produit';
import PaiementEspece from '../screens/data/paiement-espece';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Connexion">
        


      <Stack.Screen 
        name="Exemple" 
        component={Exemple} 
        options={{headerShown: false}}
        />


       <Stack.Screen 
        name="Connexion" 
        component={LoginScreen} 
        options={{title: 'Connexion ',headerShown: false}}
        />

<Stack.Screen 
        name="Inscription" 
        component={Inscription} 
        options={{title: 'Connexion ',headerShown: false}}
        />


<Stack.Screen 
        name="Deconnexion" 
        component={LogoutScreen} 
        options={{headerShown: true}}
        />
        


        <Stack.Screen 
        name="Accueil Mobile" 
        component={AccueilMobile} 
        options={{headerShown: false}}
        />



<Stack.Screen 
        name="Menu compte" 
        component={MenuCompte} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Mon compte" 
        component={MonCompte} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{headerShown: true}}
        />
        



<Stack.Screen 
        name="Moyens de rechargement" 
        component={Reseau} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Rechargement direct" 
        component={RechargementDirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Rechargement indirect" 
        component={RechargementIndirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Retrait" 
        component={Retrait} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Transfert" 
        component={Transfert} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Transactions" 
        component={Transactions} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste transaction achat" 
        component={ListeTransactionAchat} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste transaction vente" 
        component={ListeTransactionVente} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste transaction reglement" 
        component={ListeTransactionReglement} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details transaction" 
        component={DetailsTransaction} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Menu achat" 
        component={MenuAchat} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu etudes" 
        component={MenuEtudes} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu securite" 
        component={MenuSecurite} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Scanner QRCode" 
        component={ScanQRCode} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Messages" 
        component={Messages} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des messages" 
        component={ListeMessage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Notifications" 
        component={ListeNotification} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Registre de controle" 
        component={RegistreControle} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Geolocalisation" 
        component={geolocalisation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Geolocalisation Multiple" 
        component={GeolocalisationMultiple} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Geolocalisation Recherche" 
        component={GeolocalisationRecherche} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Geolocalisation Repere" 
        component={GeolocalisationRepere} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Badge professionnel" 
        component={BadgeProfessionnel} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste objets disparus" 
        component={ListeObjetsDisparus} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Liste objets retrouves" 
        component={ListeObjetsRetrouves} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste objets catalogue" 
        component={ListeObjetsCatalogue} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste objets catalogue tiers" 
        component={ListeObjetsCatalogueTiers} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Declaration objet" 
        component={DeclarationObjet} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Declaration objet tiers" 
        component={DeclarationObjetTiers} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Transfert objet" 
        component={TransfertObjet} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Statistiques" 
        component={Statistiques} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Ma carte" 
        component={MaCarte} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Paiement achat" 
        component={PaiementAchat} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Paiement espece" 
        component={PaiementEspece} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Catalogue" 
        component={Catalogue} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Boutiques" 
        component={Boutiques} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Produits" 
        component={ListeProduit} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details produit" 
        component={DetailsProduit} 
        options={{headerShown: true}}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
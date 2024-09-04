import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Keyboard, StyleSheet,ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from '../../global/GlobalState';

export default function Messages({ navigation, route }){

  
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //const [contenu,setContenu] = useState('');
    const [message, setMessage] = useState('');
    const [expediteur,setExpediteur] = useState('');
    const [destinataire,setDestinataire] = useState('');

    const { item } = route.params;


    const [refreshing, setRefreshing] = useState(false);
const handleRefresh = () => {
  setRefreshing(true); // Indiquer que le rafraîchissement est en cours
  fetchMessages(); // Appeler la fonction de récupération des données
  setRefreshing(false); // Indiquer que le rafraîchissement est terminé
};

    


  useEffect(() => {
    navigation.setOptions({ title: item.nom_prenom });
    fetchMessages();
    const intervalId = setInterval(refreshMessages, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Affichage des messages
  const fetchMessages = async () => {
    //setIsLoading(true);
    try {
      const response = await fetch(`https://adores.tech/api/carte/messages.php?expediteur=${user[0].matricule}&destinataire=${item.matricule}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      alert('Erreur lors de la récupération des messages:', error);
      setError(error);
    }
  };


  // Envoi de message
  const sendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    try {
      await fetch('https://adores.tech/api/carte/envoi-messages.php', {
        method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				expediteur: user[0].matricule,
				destinataire: item.matricule,
        message : message,
        
			})
      });

      setMessage('');
      fetchMessages();
      Keyboard.dismiss();
    } catch (error) {
      alert('Erreur lors de l\'envoi du message:', error);
    }
  };

  // test
  const refreshMessages = () => {
fetchMessages();
  };

 

  // test

  
  const renderMessage = useCallback(({ item }) => {
    const isSender = item.expediteur_message === user[0].matricule;
    const messageContainerStyle = isSender ? styles.senderMessageContainer : styles.receiverMessageContainer;
    const messageTextStyle = isSender ? styles.senderMessageText : styles.receiverMessageText;
    const messageDateStyle = isSender ? styles.senderMessageDate : styles.receiverMessageDate;

    return (
      <View style={messageContainerStyle}>
        <Text style={messageTextStyle}>{item.contenu_message}</Text>
        <Text style={messageDateStyle}>{item.date}     {item.heure}</Text>
      </View>
    );
  }, [user[0].matricule]);

   // Erreur et Chargement --debut--
 if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
        <MaterialCommunityIcons color="#266EF1" name="access-point-off" size={150}/>
        <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
        Pas de connexion internet !
        </Text>
        <TouchableOpacity onPress={handleRefresh} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
          <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Erreur et Chargement --fin--

  return (
    <View style={styles.container}>
        
        {messages.length > 0 ? (
<View style={{marginTop:10,marginLeft:13,marginRight:15,marginBottom:-5,flexDirection:'row',justifyContent:'space-between'}}>


</View>
) : (
    <View style={{marginTop: 10, marginRight:15,marginLeft:15,
        elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
      }}>
      <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
        marginBottom:15,color:'#888',textAlign:'center'
      }}>Aucun message disponible</Text>
      </View>
    )}



      <FlatList
        data={messages}
        keyExtractor={item => item.id_message.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Envoyer un message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
  },
  senderMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  receiverMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  senderMessageText: {
    color: '#FFFFFF',
  },
  receiverMessageText: {
    color: '#000000',
  },
  senderMessageDate: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 4,
  },
  receiverMessageDate: {
    color: '#000000',
    fontSize: 10,
    marginTop: 4,
  },
});

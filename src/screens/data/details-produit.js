import React , {useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,Alert
} from 'react-native';
import Swiper from 'react-native-swiper/src';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../global/GlobalState';


export default function DetailsProduit({navigation,route}) {

  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useContext(GlobalContext);

  const {item} = route.params;


  useEffect(()=>{
      navigation.setOptions({title: item.libelle});
      getAlbum();
     
  },[])



      //  album
const getAlbum = () =>{

  fetch(`https://adores.tech/api/carte/album.php?matricule=${item.code}`,{
      method:'GET',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
  })
  .then((response) => response.json())
   .then(
       (result)=>{
        setImages(result);
        }
   )
   .catch((error)=>{
    Alert.alert("Message",error);
   });
  
  }
  // Fin  album


  // Commander
  const ValidationCommande = () =>{

    fetch(`https://adores.tech/api/carte/validation-commande.php`,{

      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        // we will pass our input data to server
                matricule: user[0].matricule,
                reference: item.code,
        
      })
      
      
    })
    .then((response) => response.json())
     .then((responseJson)=>{
      Alert.alert("Message",responseJson);
     })
     .catch((error)=>{
      Alert.alert("Message",error);
     });
    
    }
  return (
    <View style={{ flex: 1 }}>
    
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
        
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          {images.length > 0 ? (
            <View style={styles.photos}>

              <Swiper
                renderPagination={(index, total) => (
                  <View style={styles.photosPagination}>
                    <Text style={styles.photosPaginationText}>
                      {index + 1} of {total}
                    </Text>
                  </View>
                )}>

{images.map((image, index) => (
  <Image
    key={index}
    source={{ uri: `data:${image.type_photo};base64,${image.photo64}` }}
    style={styles.photosImg}
  />
))}

              </Swiper>
            </View>
            ) : (
              <View style={{marginTop: 10, marginRight:15,marginLeft:15,
                elevation:5,backgroundColor:'white',borderRadius:6,marginBottom:5,
              }}>
              <Text style={{marginTop: 10, marginRight:15,marginLeft:15,
                marginBottom:15,color:'#888',textAlign:'center'
              }}>Aucune image disponible</Text>
              </View>
             )}

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.picker}>
              <View style={styles.pickerDates}>
                <Text style={styles.pickerActionText}>
                {item.libelle}
                </Text>
              </View>


            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Description</Text>
              <Text style={styles.infoDescription}>
              {item.details}
              </Text>
            </View>
            <View style={styles.stats}>
              {[
                [
                  { label: 'Prix', value: parseFloat(item.prix).toLocaleString("fr-FR") },
                  { label: 'Statut', value: item.statut },
                ],
              ].map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    styles.statsRow,
                    rowIndex === 0 && { borderTopWidth: 0 },
                  ]}>
                  {row.map(({ label, value }, index) => (
                    <View
                      key={index}
                      style={[
                        styles.statsItem,
                        index === 0 && { borderLeftWidth: 0 },
                      ]}>
                      <Text style={styles.statsItemText}>{label}</Text>

                      <Text style={styles.statsItemValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>


      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={ValidationCommande}
          style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Commander ( {parseFloat(item.prix).toLocaleString("fr-FR")} F )</Text>
            <MaterialCommunityIcons
              color="#fff"
              name="arrow-right-circle"
              size={18}
              style={{ marginLeft: 12 }}
            />
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  photos: {
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  photosTopItem: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fbfbfb',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
  },
  picker: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 13,
    fontWeight: '500',
  },
  pickerAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerActionText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#4c6cfd',
  },
  info: {
    marginTop: 12,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  infoRating: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRatingLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 2,
  },
  infoRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#8e8e93',
  },
  stats: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  statsItem: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#fff',
  },
  statsItemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#8e8e93',
    marginBottom: 4,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
  },
  overlayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  overlayContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  overlayContentPriceBefore: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#8e8e93',
    marginRight: 4,
    //textDecorationLine: 'line-through',
    textDecorationColor: '#8e8e93',
    textDecorationStyle: 'solid',
  },
  overlayContentPrice: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
    color: '#4c6cfd',
  },
  overlayContentTotal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#4c6cfd',
    letterSpacing: -0.07,
    textDecorationLine: 'underline',
    textDecorationColor: '#4c6cfd',
    textDecorationStyle: 'solid',
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
});
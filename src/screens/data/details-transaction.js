import React , {useEffect, useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default function DetailsTransaction({navigation,route}) {
  // variables
  const {item} = route.params;

  useEffect(()=>{
    navigation.setOptions({title: item.type +' / '+ item.objet});
},[])

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
     
          <ScrollView contentContainerStyle={styles.receipt} showsVerticalScrollIndicator={false}>
            <View style={styles.receiptLogo}>
              <FeatherIcon color="#fff" name="shopping-cart" size={32} />
            </View>

            <Text style={styles.receiptTitle}>{item.type} / {item.objet}</Text>

        

            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>{parseFloat(item.montant_total).toLocaleString("fr-FR")}</Text>

              <Text style={[styles.receiptPriceText, { fontSize: 20, lineHeight: 32 }]}> F CFA</Text>
            </View>

           

            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>

            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Détails</Text>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Numéro</Text>

                <Text style={styles.detailsValue}>{item.numero}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Date</Text>

                <Text style={styles.detailsValue}>{item.date}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Heure</Text>

                <Text style={styles.detailsValue}>{item.heure}</Text>
              </View>

             

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Montant</Text>

                <Text style={styles.detailsValue}>{parseFloat(item.montant).toLocaleString("fr-FR")}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Frais</Text>

                <Text style={styles.detailsValue}>{item.frais}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Montant total</Text>

                <Text style={styles.detailsValue}>{parseFloat(item.montant_total).toLocaleString("fr-FR")}</Text>
              </View>


              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Type</Text>

                <Text style={styles.detailsValue}>{item.type}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Objet</Text>

                <Text style={styles.detailsValue}>{item.objet}</Text>
              </View>
              

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Expéditeur</Text>

                <Text style={styles.detailsValue}>{item.expediteur}</Text>
              </View>


              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Destinataire</Text>

                <Text style={styles.detailsValue}>{item.destinataire}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Etat</Text>

                <Text style={styles.detailsValue}>{item.etat}</Text>
              </View>


            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Message","Indisponible")
          }}>
          <View style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Imprimer</Text>
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
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  receipt: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 140,
  },
  receiptLogo: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 12,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#151515',
    marginBottom: 2,
    textAlign:'center'
  },
  receiptSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#818181',
    marginBottom: 12,
  },
  receiptPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  receiptPriceText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: 'bold',
    letterSpacing: 0.35,
    color: '#007BFF',
  },
  receiptDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#818181',
    textAlign: 'center',
    marginBottom: 12,
  },
  details: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  detailsRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailsField: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#8c8c8c',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  detailsValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#444',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'right',
  },
  detailsActions: {
    marginTop: 24,
  },
  divider: {
    overflow: 'hidden',
    width: '100%',
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#8338ec',
    borderColor: '#8338ec',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#007BFF',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#007BFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  dividerInset: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    marginTop: -2,
  },
});
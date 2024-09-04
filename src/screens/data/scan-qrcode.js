import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QRCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState('back');
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: 'Scanner un code QR' });
    getCameraPermissions();
  }, []);


  const getCameraPermissions = async () => {
    setHasPermission(true); // Réinitialiser l'état avant de redemander l'autorisation
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('Paiement achat', { data });
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleTorch() {
    setTorch(current => !current);
  }


  if (hasPermission === false) {
    return <Text>Pas d’accès à la caméra</Text>;
  }

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
        <MaterialCommunityIcons color="#0099cc" name="camera-flip-outline" size={150}/>
        <Text style={{ fontSize: 18,marginRight:10,marginLeft:10,marginBottom:10}}>
        Demande d’autorisation de caméra !
        </Text>
        <TouchableOpacity onPress={getCameraPermissions} style={{ backgroundColor: '#0099cc',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 5,}}>
          <Text style={{ color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center', }}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        enableTorch={torch}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
          </View>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <MaterialCommunityIcons color="white" name="camera-flip" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleTorch}>
              <MaterialCommunityIcons color="white" name={torch ? "flashlight-off" : "flashlight"} size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('Paiement espece')}>
              <Text style={styles.paymentButtonText}>Demande d'espèce</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
      {scanned && (
        <Button title={"Scanner encore"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 250,
    height: 250,
  },
  rectangle: {
    flex: 1,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 64,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000a0',
    padding: 10,
    borderRadius: 5,
  },
  paymentButton: {
    alignItems: 'center',
    backgroundColor: '#000000a0',
    padding: 15,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
  },
});


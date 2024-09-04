import React, { useEffect,useState, useContext } from "react";
import { View } from 'react-native';
import Routes from './src/routes';
import { GlobalProvider } from './src/global/GlobalState';
import 'react-native-gesture-handler';



  export default function App ({navigation})  {

  return (
    <View style={{flex:1}}>
      <GlobalProvider>
            <Routes/>
    </GlobalProvider>
    </View>
  );
}

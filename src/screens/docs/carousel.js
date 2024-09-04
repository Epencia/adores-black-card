import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Slides = [
  {
    id: 1,
    img: require('../assets/img-4.jpg'),
    title: 'Apple Watch Series 7',
    description: 'The future of health is on your wrist The future of health is on your wrist',
    price: '$399',
  },
  {
    id: 2,
    img: require('../assets/logo1.png'),
    title: 'AirPods Pro',
    description: 'Active noise cancellation for immersive sound The future of health is on your wrist',
    price: '$249',
  },
  {
    id: 3,
    img: require('../assets/logo-adores-business2.jpeg'),
    title: 'AirPods Max',
    description: 'Effortless AirPods experience The future of health is on your wrist',
    price: '$549',
  },
  {
    id: 4,
    img: require('../assets/deconnexion.jpg'),
    title: 'Charger',
    description: "It's not magic, it's just science The future of health is on your wrist",
    price: '$49',
  },
  {
    id: 5,
    img: require('../assets/couverture-adores.png'),
    title: 'Smart Lock',
    description: 'Unlock your door with your phone The future of health is on your wrist',
    price: '$199',
  },
];

const Slider = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => {
        const nextIndex = prevIndex + 1 < Slides.length ? prevIndex + 1 : 0;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({item}) => {
    const translateYImage = new Animated.Value(40);

    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 9000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();

    return (
      <View style={styles.slideContainer}>
        <Animated.Image
          source={item.img}
          resizeMode="contain"
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Pagination = ({data, scrollX}) => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [50, 50, 50],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', '#2593B6', '#ccc'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                {width: dotWidth, backgroundColor, opacity},
              ]}
            />
          );
        })}
      </View>
    );
  };

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <Pagination data={Slides} scrollX={scrollX} />
      <FlatList
        ref={flatListRef}
        data={Slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{paddingBottom: 60}} // Ajoute un padding en bas pour le footer
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Connexion')}
        >
          <Text style={styles.footerButtonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Inscription')}
        >
          <Text style={styles.footerButtonText}>Ouvrir un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slideContainer: {
    width,
    height: height * 0.7, // Ajuster pour laisser de la place au footer
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9, // Ajuster la largeur pour ne pas couvrir tout l'écran
    height: height * 0.6, // Ajuster la hauteur pour maintenir les proportions
    resizeMode: 'contain', // Éviter que l'image devienne floue
    //paddingVertical:-200,
    borderWidth:1,
    //borderColor:'red'
  },
  content: {
    position: 'absolute',
    bottom: -95, // Réduire l'espace entre le prix et le footer
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 8, // Réduire l'espace entre la description et le prix
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  paginationContainer: {
    position: 'absolute',
    top: 10, // Réduire l'espace entre la pagination et les images
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: '#ccc',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  footerButton: {
    flex: 1, // Pour que les boutons aient la même largeur
    marginHorizontal: 5, // Espacement entre les boutons
    paddingVertical: 13,
    backgroundColor: '#2593B6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Slider;
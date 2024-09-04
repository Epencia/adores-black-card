const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'Adorès Card(Dev)' : 'Adorès Card',
    slug: 'adores-card',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo-icone.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/adaptive-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      accessibilityLabel: "Image de lancement d'Adorès Card",
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'dev.mandigoentreprise.adorescard' : 'com.mandigoentreprise.adorescard',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-logo.png',
        backgroundColor: '#ffffff',
      },
      package: IS_DEV ? 'dev.mandigoentreprise.adorescard' : 'com.mandigoentreprise.adorescard',
      versionCode: 1,
    },
    web: {
      favicon: './assets/favlogo.png',
    },
    extra: {
      appVariant: IS_DEV ? 'development' : null,
      eas: {
        projectId: '32326d1f-0ba2-431e-bd15-a393481f44a7',
      },
    },
    updates: {
      url: 'https://u.expo.dev/32326d1f-0ba2-431e-bd15-a393481f44a7',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    }
  },
};

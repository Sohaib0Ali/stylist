import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import images from '../../../assets/images/images';
import { scale } from 'react-native-size-matters';
import Button from '../../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

const RadioButton = ({ label, selected, onPress, labelStyle }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Text style={[styles.language, labelStyle]}>{label}</Text>
      <Image
        source={selected ? images.LanguageSelcted : images.LanguageNotSelcted}
        style={styles.radioButtonIcon}
      />
    </TouchableOpacity>
  );
};

const LangauageSection = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    async function fetchSystemLanguage() {
      const systemLanguage = await AsyncStorage.getItem('selectedLang');
      if (systemLanguage) {
        setSelectedOption(systemLanguage);
      } else {
        const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode;
        const availableLanguages = ['en', 'fr', 'ar'];
        const matchedLanguage = availableLanguages.find(
          lang => lang === deviceLanguage,
        );
        setSelectedOption(matchedLanguage || '');
      }
    }
    fetchSystemLanguage();
  }, []);

  const handleOptionSelect = async option => {
    await AsyncStorage.setItem('selectedLang', selectedOption);
    setSelectedOption(option);
  };

  const handleLangChange = async () => {
    i18n.changeLanguage(selectedOption);
    await AsyncStorage.setItem('selectedLang', selectedOption);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: '#57429C',
        }}
      />
      <StatusBar backgroundColor={'#57429C'} translucent={true} />
      <ImageBackground
        source={images.curv}
        resizeMode="cover"
        style={styles.curvimg}>
        <Image
          source={images.curvimg}
          resizeMode="contain"
          style={styles.curvSubimg}
        />
        <Text style={styles.headerText}>Choose your preferred language</Text>
      </ImageBackground>
      <View style={styles.cardView}>
        <Text style={styles.cardHeaderText}>
          Choose your preferred language to interact with this app
        </Text>
        <View style={{ marginTop: scale(25) }}>
          <RadioButton
            labelStyle={styles.labelStyle}
            label="English"
            selected={selectedOption === 'en'}
            onPress={() => handleOptionSelect('en')}
          />
          <RadioButton
            labelStyle={styles.labelStyle}
            label="French"
            selected={selectedOption === 'fr'}
            onPress={() => handleOptionSelect('fr')}
          />
          <RadioButton
            labelStyle={styles.labelStyle}
            label="Arabic"
            selected={selectedOption === 'ar'}
            onPress={() => handleOptionSelect('ar')}
          />
        </View>
      </View>
      <View style={styles.btnBottomView}>
        <Button
          buttonText={t('Select Language')}
          marginTop={wp(3)}
          onPress={() => {
            navigation.navigate('ROLESELECTION', { language: selectedOption }),
              handleLangChange();
          }}
          opacity={selectedOption ? 1 : 0.7}
          disabled={selectedOption ? false : true}
        />
      </View>
    </View>
  );
};

export default LangauageSection;

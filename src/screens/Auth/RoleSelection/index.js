import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import images from '../../../assets/images/images';
import { scale } from 'react-native-size-matters';
import Button from '../../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ON_BOARDING_SCREEN } from '../../../constants/navigators';
const RadioButton = ({ label, selected, onPress, imagelogo }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Image source={imagelogo} style={styles.typelogo} />
      <Text style={styles.language}>{label}</Text>
      <Image
        source={selected ? images.LanguageSelcted : images.LanguageNotSelcted}
        style={styles.radioButtonIcon}
      />
    </TouchableOpacity>
  );
};

const RoleSelection = props => {
  const { route } = props;
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = option => {
    setSelectedOption(option);
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
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={images.backbtn}
            resizeMode="contain"
            style={styles.backbtn}
          />
        </TouchableOpacity>
        <Image
          source={images.curvimg}
          resizeMode="contain"
          style={styles.curvSubimg}
        />
        <Text style={styles.headerText}>{t('selectuserType')}</Text>
      </ImageBackground>
      <View style={styles.cardView}>
        <Text style={styles.cardHeaderText}>{t('selectroll')}</Text>
        <View style={{ marginTop: scale(25) }}>
          <RadioButton
            label={t('customer')}
            selected={selectedOption === 'Customer'}
            onPress={() => handleOptionSelect('Customer')}
            imagelogo={images.CustomerLogo}
          />
          <RadioButton
            label={t('salonowner')}
            selected={selectedOption === 'Salon owner'}
            onPress={() => handleOptionSelect('Salon owner')}
            imagelogo={images.SalonLogo}
          />
        </View>
      </View>
      <View style={styles.btnBottomView}>
        <Button
          buttonText={t('Select')}
          marginTop={wp(3)}
          onPress={() =>
            navigation.navigate(ON_BOARDING_SCREEN, { role: selectedOption })
          }
          opacity={selectedOption ? 1 : 0.7}
          disabled={selectedOption ? false : true}
        />
      </View>
    </View>
  );
};

export default RoleSelection;

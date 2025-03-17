//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import SearchComponent from '../../../../components/Search/SearchComponent';
import icons from '../../../../assets/icons/icons';
import colors from '../../../../assets/colors/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../../../components/Button/Button';
import Divider from '../../../../components/Divider/divider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const SearchScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [data, setData] = useState(route?.params?.nearByData);
  const [value, setValue] = useState('');
  const [locationCheck, setLocationCheck] = useState(false);

  const storeData = () => {
    if (locationCheck) {
      AsyncStorage.setItem('CurrentCheck', 'true');
    } else {
      AsyncStorage.setItem('CurrentCheck', 'false');
    }
  };

  const applyFilter = val => {
    const filteredData = data.filter(item =>
      item.salon.address.toLowerCase().includes(val.toLowerCase()),
    );
    if (val == '') {
      setData(route?.params?.nearByData);
    } else {
      setData(filteredData);
    }
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBg}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: wp(-1)}}>
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={t('searchArea')}
          value={value}
          onChangeText={val => {
            applyFilter(val), setValue(val);
          }}
          selectionColor={colors.subHeading}
          placeholderTextColor={colors.subHeading}
        />
      </View>
      <TouchableOpacity
        onPress={() => setLocationCheck(!locationCheck)}
        style={styles.iconTextBg}>
        <Image
          source={locationCheck ? icons.selectedLocation : icons.location}
          resizeMode="contain"
          style={styles.locationIcon}
        />
        <Text style={styles.medText}>Choose Current Location</Text>
      </TouchableOpacity>
      <Divider marginTop={hp(1)} />
      <View style={styles.body}>
        <FlatList
          contentContainerStyle={{
            paddingVertical: hp(3),
          }}
          data={data}
          renderItem={({item}) => (
            <SearchComponent
              name={item.salon.businessName}
              address={item.salon.address}
              distance={item.distanceInMiles}
              onPress={() => {
                navigation.navigate('SALON_SCREEN', {itemData: item});
              }}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={styles.buttonBg}>
        <Button
          buttonText={t('apply')}
          width="100%"
          onPress={() => {
            storeData(), navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};
export default SearchScreen;

import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import icons from '../../../assets/icons/icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import images from '../../../assets/images/images';
import {FlatList} from 'react-native';
import styles from './style';
import PopularCrewList from '../../../components/Client Components/PopularStylist/PopularCrewList';
import {t} from 'i18next';
const populerstylist = [
  {
    id: '1',
    img: images.man3,
    name: 'Adam Smith',
  },
  {
    id: '2',
    img: images.man4,
    name: 'John Alex',
  },
  {
    id: '3',
    img: images.man1,
    name: 'Adam Smith',
  },
  {
    id: '4',
    img: images.man2,
    name: 'John Alex',
  },
  {
    id: '5',
    img: images.man5,
    name: 'Adam Smith',
  },
  {
    id: '6',
    img: images.man6,
    name: 'John Alex',
  },
  {
    id: '7',
    img: images.man7,
    name: 'Adam Smith',
  },
  {
    id: '8',
    img: images.man8,
    name: 'John Alex',
  },
];

const PopularStylistScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          paddingVertical: hp('3%'),
          paddingHorizontal: wp(6),
          height: scale(70),
        }}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={icons.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <MediumTitle
        title={t('popularstylists')}
        marginBottom={scale(10)}
        marginTop={scale(30)}
        marginLeft={scale(25)}
      />

      <FlatList
        contentContainerStyle={{
          paddingBottom: hp(4),
          paddingHorizontal: wp('4%'),
        }}
        ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={populerstylist}
        renderItem={({item, index}) => (
          <PopularCrewList
            id={item.id}
            profileimg={item.img}
            stylistname={item.name}
          />
        )}
        keyExtractor={item => item.backgroundColor}
      />
    </View>
  );
};

export default PopularStylistScreen;

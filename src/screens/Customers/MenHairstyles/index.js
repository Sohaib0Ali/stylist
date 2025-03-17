import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import icons from '../../../assets/icons/icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import {FlatList} from 'react-native';
import styles from './style';
import HairstyleList from '../../../components/Client Components/Hairstyle/HairstyleList';
import {STYLECOLLECTION} from '../../../constants/navigators';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const MenHairstylesScreen = () => {
  const AllCut = useSelector(state => state?.ApiData?.Hairstyle);
  const [Allstylelist, setallstyleList] = useState([]);

  const {t} = useTranslation();
  useEffect(() => {
    setallstyleList(AllCut);
  }, [AllCut]);
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
        title={'Men Hairstyle'}
        marginBottom={scale(10)}
        marginTop={scale(20)}
        marginLeft={scale(25)}
        fontSize={scale(24)}
        Weight={'600'}
      />

      <FlatList
        contentContainerStyle={{
          paddingBottom: hp(4),
          paddingHorizontal: wp('4%'),
          alignSelf: 'center',
        }}
        ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={Allstylelist}
        renderItem={({item, index}) => (
          <HairstyleList
            id={item?._id}
            profileimg={item?.profiloImage}
            stylename={item?.cutName}
            onPress={() => {
              navigation.navigate(STYLECOLLECTION, {
                StyleName: item?.cutName,
                Collection: item?.collectionImage,
              });
            }}
          />
        )}
        keyExtractor={item => item.backgroundColor}
      />
    </View>
  );
};

export default MenHairstylesScreen;

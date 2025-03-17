import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../assets/icons/icons';
import styles from './style';
import MediumTitle from '../../MediumTitle/MediumTitle';
import colors from '../../../assets/colors/colors';
import SalonDetailComponent from '../../../components/Business Components/SalonDetailComponent/SalonDetailComponent';
import images from '../../../assets/images/images';
import SmallText from '../../../components/SmallText/SmallText';
import SmallTitle from '../../SmallTitle/SmallTitle';
import Title from '../../Title/Title';
import SimpleText from '../../SimpleText/SimpleText';
import PagerView from 'react-native-pager-view';
import Divider from '../../Divider/divider';
import {useTranslation} from 'react-i18next';

const salonData = [
  {
    id: '1',
    name: 'Cut',
    time: '22 minutes',
    price: '25',
    img: images.man,
    type: 'USD',
  },
  {
    id: '2',
    name: 'Style',
    time: '21 minutes',
    price: '23',
    type: 'USD',
  },
  {
    id: '3',
    name: 'Beard',
    time: '10 minutes',
    price: '230',
    img: images.man,
    type: 'USD',
  },
];

const CrewDetails = () => {
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.dpBg}>
        <View style={styles.imgBg}>
          <Image style={styles.img} source={images.man} />
        </View>
        <View style={styles.textContainer}>
          <SmallTitle title="22 mins" color={colors.red} />
        </View>
      </View>
      <View style={styles.reviewStarBg}>
        <Image source={icons.star} style={styles.star} resizeMode="contain" />
        <Text style={styles.tgText}>4.0 </Text>
        <Text style={styles.review}>(12 reviews)</Text>
      </View>
      <Title title="Cody Fisher" marginBottom={1} marginTop={1} />
      <View style={styles.nameTextBg}>
        <SimpleText text={t('topMaster')} marginRight={wp(2)} />
        <SmallTitle title="Toney & Guy" />
      </View>
      <View style={styles.titleTextBg}>
        <MediumTitle title={t('services')} marginBottom={hp(1)} />
        <TouchableOpacity>
          <SmallTitle title={t('seeAll')} color={colors.btnColor} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={salonData}
        renderItem={({item, index}) => {
          const backgroundColor =
            item.id === selectedId ? colors.yellow : colors.white;
          return (
            <SalonDetailComponent
              name={item.name}
              time={item.time}
              price={item.price}
              img={item.img}
              type={item.type}
              service
              backgroundColor={{backgroundColor}}
              onPress={() => setSelectedId(item.id)}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
      <View style={styles.titleTextBg}>
        <MediumTitle title={t('portfolio')} marginBottom={hp(1)} />
        <TouchableOpacity>
          <SmallTitle title={t('seeAll')} color={colors.btnColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.portfolioImgBg}>
        <Image style={styles.portfolioImg} source={images.barber} />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        showPageIndicator={false}
        horizontal>
        <View style={styles.slider} key="1">
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={images.barber} />
          </View>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={images.barber} />
          </View>
        </View>
        <View style={styles.slider} key="2">
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={images.first} />
          </View>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={images.first} />
          </View>
        </View>
      </PagerView>
      <MediumTitle title={t('workingHours')} />
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: wp(3),
          padding: wp(3),
          marginBottom: hp(5),
        }}>
        <View style={styles.dayTimeBg}>
          <SmallText text="Mon, Tue, Wed, Fri" alignSelf="flex-start" />
          <SmallTitle title="09:00 AM - 08:00 PM" alignSelf="flex-start" />
        </View>
        <Divider />
        <View style={styles.dayTimeBgBottom}>
          <SmallText text="Thu, Sat, Sun" alignSelf="flex-start" />
          <SmallTitle title={t('dayOff')} alignSelf="flex-start" />
        </View>
      </View>
    </ScrollView>
  );
};
export default CrewDetails;

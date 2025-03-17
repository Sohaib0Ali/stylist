import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../assets/icons/icons';
import styles from './style';
import MediumTitle from '../../MediumTitle/MediumTitle';
import colors from '../../../assets/colors/colors';
import SalonDetailComponent from '../SalonDetailComponent/SalonDetailComponent';
import SmallText from '../../../components/SmallText/SmallText';
import SmallTitle from '../../SmallTitle/SmallTitle';
import Title from '../../Title/Title';
import SimpleText from '../../SimpleText/SimpleText';
import PagerView from 'react-native-pager-view';
import Divider from '../../Divider/divider';
import {useTranslation} from 'react-i18next';

const CrewDetails = ({crewData, salonId, checkCallback, itemData}) => {
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedService, setSelectedService] = useState({});
  const [selectMainType, setselectMainType] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedId) {
      checkCallback(),
        navigation.navigate('CHOOSE_TYPE_SCREEN', {
          id: crewData?.stylist?._id,
          salonId,
          serviceID: selectedId,
          itemData,
          prevdata: crewData?.stylist,
          title: selectMainType,
        });
    }
  }, [selectedId]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.dpBg}>
        <View style={styles.imgBg}>
          <Image
            style={styles.img}
            source={{uri: crewData?.stylist?.profilePic}}
          />
        </View>
        <View style={styles.textContainer}>
          <SmallTitle title="22 mins" color={colors.red} />
        </View>
      </View>
      <View style={styles.reviewStarBg}>
        <Image source={icons.star} style={styles.star} resizeMode="contain" />
        <Text style={styles.tgText}>
          {crewData?.stylistRating?.rating + ' '}
        </Text>
        <Text style={styles.review}>
          ( {crewData?.stylistRating?.numberOfRating} reviews)
        </Text>
      </View>
      <Title
        title={crewData?.stylist?.firstName + ' ' + crewData?.stylist?.lastName}
        marginBottom={1}
        marginTop={1}
      />
      <View style={styles.nameTextBg}>
        <SimpleText text={crewData?.stylist?.position} marginRight={wp(2)} />
        <SmallTitle title={crewData?.salonName} />
      </View>
      <View style={styles.titleTextBg}>
        <MediumTitle title={t('services')} marginBottom={hp(1)} />
        <TouchableOpacity>
          <SmallTitle title={t('seeAll')} color={colors.btnColor} />
        </TouchableOpacity>
      </View>
      {crewData?.services?.map((item, index) => {
        const backgroundColor =
          item._id === selectedId ? colors.yellow : colors.white;
        return (
          <SalonDetailComponent
            key={item?._id}
            keyValue={item?._id}
            name={item?.servname}
            time={item?.approxtime}
            price={item?.price}
            img={item?.icon}
            type={item?.currency}
            service
            backgroundColor={{backgroundColor}}
            onPress={() => {
              setSelectedId(item?._id),
                setSelectedService(item),
                setselectMainType(item?.servname);
            }}
          />
        );
      })}
      <View style={styles.titleTextBg}>
        <MediumTitle title={t('portfolio')} marginBottom={hp(1)} />
        <TouchableOpacity>
          <SmallTitle title={t('seeAll')} color={colors.btnColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.portfolioImgBg}>
        <Image
          style={styles.portfolioImg}
          source={{uri: crewData?.stylist?.portfolio[0]}}
        />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        showPageIndicator={false}
        horizontal>
        <View style={styles.slider} key="1">
          <View style={styles.sliderImgBg}>
            <Image
              style={styles.sliderImg}
              source={{uri: crewData?.stylist?.portfolio[1]}}
            />
          </View>
          <View style={styles.sliderImgBg}>
            <Image
              style={styles.sliderImg}
              source={{uri: crewData?.stylist?.portfolio[2]}}
            />
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
          <SmallText
            text={crewData?.stylist?.schedule?.day?.join(', ')}
            alignSelf="flex-start"
          />
          <SmallTitle
            title={
              crewData?.stylist?.schedule?.to +
              ' - ' +
              crewData?.stylist?.schedule?.from
            }
            alignSelf="flex-start"
          />
        </View>
        <Divider />
        <View style={styles.dayTimeBgBottom}>
          <SmallText
            text={crewData?.stylist?.schedule?.dayOff?.join(', ')}
            alignSelf="flex-start"
          />
          <SmallTitle title={t('dayOff')} alignSelf="flex-start" />
        </View>
      </View>
    </ScrollView>
  );
};
export default CrewDetails;

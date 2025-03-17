import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import images from '../../../assets/images/images';
import icons from '../../../assets/icons/icons';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import {useTranslation} from 'react-i18next';
import SalonMenuComponent from '../../../components/Client Components/SalonMenuComponent/SalonMenuComponent';
import ServiceScreen from '../Salon Section/Service Screen';
import CrewScreen from '../Salon Section/Crew Screen';
import ReviewScreen from '../Salon Section/Review Screen';
import PortfolioScreen from '../Salon Section/Portfolio Screen';
import ScheduleScreen from '../Salon Section/Schedule Screen';
import {useSelector} from 'react-redux';

const SalonDetails = ({data}) => {
  const [selectedId, setSelectedId] = useState('1');
  const selcted_services = useSelector(
    state => state?.ApiData?.selectedService,
  );
  const {t} = useTranslation();
  const MenuData = [
    {
      id: '1',
      title: t('Services'),
    },
    {
      id: '2',
      title: t('Crew'),
    },
    {
      id: '3',
      title: t('Review'),
    },
    {
      id: '4',
      title: t('Portfolio'),
    },
    {
      id: '5',
      title: t('Schedule'),
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{height: scale(210)}}
        source={{uri: data?.salon?.profileImage}}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderTopLeftRadius: scale(15),
            borderTopRightRadius: scale(15),
          }}
        />
        <View style={[styles.Line, {backgroundColor: '#FFFFFF'}]} />
        <View style={styles.header}>
          <Image style={styles.unlike} source={images.unlike} />
          <Image style={styles.unlike} source={images.Home} />
        </View>
      </ImageBackground>
      <View style={{backgroundColor: colors.white}}>
        <View style={styles.rating}>
          <View style={styles.reviewStarBg}>
            <Image
              source={icons.star}
              style={styles.star}
              resizeMode="contain"
            />
            <Text style={styles.tgText}>4.7</Text>
            <Text style={styles.review}>(3 reviews)</Text>
          </View>
          <View style={styles.time}>
            <Image
              source={icons.clock}
              style={styles.clock}
              resizeMode="contain"
            />
            <Text style={styles.timeText}>8 mins</Text>
          </View>
        </View>
        <MediumTitle
          title={'Tony & Guy'}
          color={colors.headingBlack}
          marginTop={hp(0.1)}
          marginLeft={scale(12)}
          fontSize={scale(22)}
          alignSelf={'flex-start'}
          font={fonts.Exo2Bold}
          Weight={'700'}
        />
        <View style={styles.rating}>
          <Text style={styles.address}>13 Mill Ave</Text>
          <View style={styles.miles}>
            <Image
              source={images.LocationPointer}
              style={styles.pointer}
              resizeMode="contain"
            />
            <Text style={styles.mileText}>1,3 miles</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{}}>
            {selectedId === 'ON BOOK' ? null : (
              <FlatList
                contentContainerStyle={{
                  paddingVertical: hp(2.8),
                }}
                showsHorizontalScrollIndicator={false}
                data={MenuData}
                horizontal
                renderItem={({item, index}) => {
                  const backgroundColor =
                    item.id === selectedId
                      ? colors.headingBlack
                      : index == 0 && selectedId == null
                      ? colors.headingBlack
                      : colors.white;
                  const color =
                    item.id === selectedId
                      ? colors.white
                      : index == 0 && selectedId == null
                      ? colors.white
                      : colors.subHeading;
                  return (
                    <SalonMenuComponent
                      title={item.title}
                      onPress={() => setSelectedId(item.id)}
                      backgroundColor={{backgroundColor}}
                      color={{color}}
                      length={selcted_services?.length}
                    />
                  );
                }}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            )}
          </View>

          {selectedId === '1' ? (
            <>
              <ServiceScreen sID={data?.salon?._id} itemData={data} />
            </>
          ) : selectedId === '2' ? (
            <CrewScreen
              sID={data?.salon?._id}
              itemData={data}
              OnBook={setSelectedId}
            />
          ) : selectedId === '3' ? (
            <ReviewScreen sID={data?.salon?._id} />
          ) : selectedId === '4' ? (
            <PortfolioScreen
              sID={data?.salon?._id}
              portFolioData={data.salon.portfolio}
            />
          ) : selectedId === '5' ? (
            <ScheduleScreen sID={data.salon._id} scheduleData={data} />
          ) : selectedId === 'ON BOOK' ? (
            <ScheduleScreen sID={data?.salon?._id} scheduleData={data} />
          ) : (
            <ServiceScreen sID={data?.salon?._id} itemData={data} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SalonDetails;

const styles = StyleSheet.create({
  container: {},
  unlike: {
    height: scale(30),
    width: scale(30),
  },
  header: {
    position: 'absolute',
    top: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(20),
  },
  Line: {
    width: scale(40),
    height: hp(0.5),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: hp(1),
    borderRadius: 10,
    position: 'absolute',
    top: 2,
  },
  reviewStarBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    width: scale(12),
    height: scale(12),
    alignSelf: 'baseline',
    marginRight: wp(1.3),
    alignSelf: 'center',
  },
  tgText: {
    color: colors.headingBlack,
    fontSize: scale(14),
    fontFamily: fonts.semiBold,
    fontWeight: '500',
  },
  mileText: {
    color: colors.headingBlack,
    fontSize: scale(12),
    fontFamily: fonts.Exo2thin,
    fontWeight: '400',
  },
  timeText: {
    color: colors.Secondary_txt,
    fontSize: scale(14),
    fontFamily: fonts.semiBold,
    fontWeight: '500',
  },
  review: {
    fontSize: scale(12),
    color: colors.Secondary_txt,
    fontFamily: fonts.regular,
    fontWeight: '400',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(13),
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  time: {
    height: scale(32),
    width: scale(87),
    flexDirection: 'row',
    backgroundColor: '#FFCC00',
    borderRadius: scale(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(8),
  },
  miles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(5),
  },
  clock: {
    height: scale(14),
    width: scale(12),
  },
  pointer: {
    height: scale(14),
    width: scale(12),
    marginHorizontal: scale(5),
  },
  body: {
    paddingBottom: Platform.OS === 'ios' ? hp(5) : null,
    flex: 1,
    backgroundColor: colors.white200,
  },
});

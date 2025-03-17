//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import SalonMenuComponent from '../../../../components/Client Components/SalonMenuComponent/SalonMenuComponent';
import ServiceScreen from '../Service Screen';
import CrewScreen from '../Crew Screen';
import ReviewScreen from '../Review Screen';
import PortfolioScreen from '../Portfolio Screen';
import ScheduleScreen from '../Schedule Screen';
import BookingHeader from '../../../../components/Client Components/Booking/Booking Header';
import {useTranslation} from 'react-i18next';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

const SalonScreen = props => {
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState('1');
  const [loading, setLoading] = useState(false);
  const selcted_services = useSelector(
    state => state?.ApiData?.selectedService,
  );
  const itemData = props.route.params.itemData;
  const bottomSheetModalRef = useRef(null);
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

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  
  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <BookingHeader
        id={itemData?.salon?._id}
        fav={itemData?.favorite}
        bg={itemData?.salon?.profileImage}
        name={itemData?.salon?.businessName}
        star={itemData?.salonRating?.rating}
        reviews={itemData?.salonRating?.numberOfRating}
        description={itemData?.salon?.description}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['65%', '85%']}
          initialIndex={1}
          enablePanDownToClose={false}>
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
                <ServiceScreen sID={itemData.salon._id} itemData={itemData} />
              </>
            ) : selectedId === '2' ? (
              <CrewScreen
                sID={itemData.salon._id}
                itemData={itemData}
                OnBook={setSelectedId}
              />
            ) : selectedId === '3' ? (
              <ReviewScreen sID={itemData.salon._id} />
            ) : selectedId === '4' ? (
              <PortfolioScreen
                sID={itemData.salon._id}
                portFolioData={itemData.salon.portfolio}
              />
            ) : selectedId === '5' ? (
              <ScheduleScreen
                sID={itemData.salon._id}
                scheduleData={itemData}
              />
            ) : selectedId === 'ON BOOK' ? (
              <ScheduleScreen
                sID={itemData.salon._id}
                scheduleData={itemData}
              />
            ) : (
              <ServiceScreen sID={itemData.salon._id} itemData={itemData} />
            )}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default SalonScreen;

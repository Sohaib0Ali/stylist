//================================ React Native Imported Files ======================================//

import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import BookingHeader from '../../../components/Client Components/Booking/Booking Header';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CustomeLoader from '../../../components/Loader/CustomeLoader';
import {scale} from 'react-native-size-matters';
import IndicatorBot from '../../../components/indicatorBot';
import Schedule_time from './Schedule_time';
import Payment_screen from './Payment_screen';
import Book_details from './Book_details';

const Confirm_book = ({route}) => {
  const itemData = route?.params?.item;
  const schedule_intruc =
    'Choose your hair treatment date and time. You`ll get the look you want with Abdul.';
  const payment_instruc =
    'Currently, we only accept cash, but will add other popular payment methods soon';
  const bottomSheetModalRef = useRef(null);
  const [isNav, setisNav] = useState('Schedule_time');
  const [loading, setLoading] = useState(false);
  const [Instruction, setIntruction] = useState(schedule_intruc);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isNav === 'Schedule_time') {
      setIntruction(schedule_intruc);
    } else if (isNav === 'Payment_screen') {
      setIntruction(payment_instruc);
    }
  }, [isNav]);

  const screen_Switch = () => {
    switch (isNav) {
      case 'Schedule_time':
        return <Schedule_time data={itemData} OnPressNext={setisNav} />;

      case 'Payment_screen':
        return <Payment_screen OnPressBack={setisNav} OnPressNext={setisNav} />;

      case 'Book_details':
        return <Book_details />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={{}}>
        <BookingHeader
          id={itemData?.salon?._id}
          fav={itemData?.favorite}
          bg={itemData?.salon?.profileImage}
          height={scale(250)}
        />
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: scale(15),
            left: scale(0),
          }}>
          <IndicatorBot Boattext={Instruction} />
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={['64%', '85%']}
          initialIndex={1}
          enablePanDownToClose={false}>
          {screen_Switch()}
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default Confirm_book;

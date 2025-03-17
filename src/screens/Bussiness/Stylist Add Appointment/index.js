import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Title from '../../../BusinessUtills/components/Title/Title';
import Input from '../../../BusinessUtills/components/Input/Input';
import SimpleText from '../../../BusinessUtills/components/SimpleText/SimpleText';
import DatePicker from 'react-native-date-picker';
import {showSuccess} from '../../../../Utils/FlashMessage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../BusinessUtills/components/Button/Button';
import Header from '../../../BusinessUtills/components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../BusinessUtills/assets/colors/colors';
import moment from 'moment';
import icons from '../../../BusinessUtills/assets/icons/icons';
import axios from 'axios';
import BConfig from '../../../BusinessUtills/config/config';
import CustomeLoader from '../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const StylistAddAppointment = ({route}) => {
  const MainBranch = useSelector(state => state?.SalonDetails?.MainBranch);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [type, setType] = useState('');
  const [client, setClient] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  const currentDate = new Date();

  const AddAppointment = () => {
    if (service === '' || type === '' || client === '' || price === '') {
      alert(t('pleaseFillData'));
    } else {
      setIsLoading(true);
      var data = JSON.stringify({
        salonId: MainBranch?.salon?._id,
        serviceName: service,
        typeName: type,
        clientName: client,
        price: price,
        bookingDateTime: date,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}/business/addWalkedInBooking`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setIsLoading(false);
          if (response.data.success === true) {
            showSuccess(t('successFully'));
            navigation.goBack();
          } else {
            alert(response.data.msg);
          }
        })
        .catch(function (error) {
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        headerBack={true}
        headerColor={'#FFFF'}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Title title={t('addAppoinments')} alignSelf={'baseline'} />
        <View style={styles.form}>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              if (date > currentDate) {
                setOpen(false);
                setDate(date);
              } else {
                setOpen(false);
                alert(t('selectAgain'));
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Input
            title={t('service')}
            onChangeText={setService}
            placeholder={t('service')}
            value={service}
          />
          <Input
            title={t('type')}
            onChangeText={setType}
            placeholder={t('type')}
            value={type}
          />
          <Input
            title={t('client')}
            onChangeText={setClient}
            placeholder={t('client')}
            value={client}
          />
          <Input
            title={t('price')}
            onChangeText={setPrice}
            placeholder={t('price')}
            value={price}
          />
          <TouchableOpacity style={styles.body} onPress={() => setOpen(true)}>
            <View style={styles.lableSlot}>
              <SimpleText
                text={t('date')}
                alignSelf="flex-start"
                color={'#000000'}
                fontSize={wp(4.1)}
              />
            </View>
            <View style={styles.dayTimeBg}>
              <View>
                <SimpleText
                  color={'#5E5E5F'}
                  fontSize={wp(3.7)}
                  text={moment(date).format('ddd DD, MMMM')}
                  alignSelf={'flex-end'}
                />
                <SimpleText
                  color={'#5E5E5F'}
                  fontSize={wp(3.7)}
                  text={moment(date).format('hh:mm A')}
                  alignSelf={'flex-end'}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Image
                  style={{
                    width: wp(2),
                    height: hp(1.6),
                    tintColor: colors.black,
                  }}
                  source={icons.next}
                />
              </View>
            </View>
          </TouchableOpacity>
          <Button
            buttonText={t('addAppoinments')}
            marginTop={hp(4)}
            onPress={AddAppointment}
          />
        </View>
      </View>
      <CustomeLoader visible={loading} />
    </SafeAreaView>
  );
};

export default StylistAddAppointment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  form: {
    marginTop: 32,
  },
  body: {
    marginTop: wp(4),
    borderRadius: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3.8),

    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lableSlot: {
    width: '40%',
  },
  dayTimeBg: {
    width: '60%',
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

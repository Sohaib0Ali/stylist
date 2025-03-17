//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, FlatList, Text} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import icons from '../../../../assets/icons/icons';
import Button from '../../../../components/Button/Button';
import RespondComponent from '../../../../components/Client Components/NotificationComponents/RespondComponent';
import colors from '../../../../assets/colors/colors';
import Config from '../../../../config/config';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';

const NotificationScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedID, setSelectedID] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState('');
  const [fullText, setFullText] = useState(
    "Hey, you haven't had a haircut in a long time. Want to book a stylist?",
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText?.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 20);
    }
  }, [index]);

  useEffect(() => {
    getNotficationDetails();
  }, []);

  const getNotficationDetails = async () => {
    setLoading(true);

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}getUserNotification`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const callBackFunctionForDelete = id => {
    setLoading(true);
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${Config.baseUrl}deleteNotification/${id}`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        if (res.success) {
          getNotficationDetails();
        }
      })
      .catch(function (error) {});
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: wp('4%')}}>
        <Header
          leftText="Notifications"
          randomIcon={icons.settingIcon}
          onSearch={() => navigation.navigate('NOTIFICATION_SETTING_SCREEN')}
        />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {isEnabled ? (
          <View style={{alignItems: 'center', felx: 1}}>
            <View style={styles.otherContainer}>
              <View style={styles.talkBubble}>
                <View
                  style={styles.iconImageBg}
                  onPress={() => setIsVisible(!isVisible)}>
                  <Image
                    style={styles.img}
                    source={icons.snap}
                    resizeMode="contain"
                  />
                </View>
                <View style={{top: wp(1)}}>
                  <View style={styles.talkBubbleTriangle} />
                  <View style={styles.talkBubbleSquare}>
                    <Text style={styles.talkBubbleMessage}>{text}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
        {isEnabled ? (
          <View style={styles.btnContainer}>
            <Button
              buttonText="Book"
              onPress={() => {
                navigation.navigate('DiscoverScreen');
              }}
              width={wp(42.5)}
            />
            <Button
              buttonText="Next time"
              width={wp(42.5)}
              textColor={colors.btnColor}
              bgColor={colors.white}
              onPress={() => setIsEnabled(false)}
            />
          </View>
        ) : (
          <View />
        )}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              const borderColor =
                item.bookingId === selectedID ? colors.black : 'transparent';
              return (
                <RespondComponent
                  callBackFunctionForDelete={callBackFunctionForDelete}
                  id={item.bookingId}
                  key={index}
                  status={item.status}
                  // pic={item.pic}
                  time={item.createdAt}
                  name={item.salonName}
                  response={item.bookingDateTime}
                  star={item.star}
                  comment={item.comment}
                  onPress={() => setSelectedID(item.bookingId)}
                  borderColor={{borderColor}}
                />
              );
            }}
            keyExtractor={item => item.bookingId}
            extraData={selectedID}
          />
        )}

        <CustomeLoader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

//================================ React Native Imported Files ======================================//
import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import SemiTitle from '../../../../components/SemiTitle';
import icons from '../../../../assets/icons/icons';
import Divider from '../../../../components/Divider/divider';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import colors from '../../../../assets/colors/colors';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {verticalScale} from 'react-native-size-matters';

const HelpCenterScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [helpCenterData, setHelpCenterData] = useState([]);

  useEffect(() => {
    getHelpCenterData();
  }, []);

  const getHelpCenterData = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    await axios
      .get(`${Config.baseUrl}getAllHelpTopic`, {headers})
      .then(response => {
        setLoading(false);
        if (response.data.success === true) {
          setHelpCenterData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header randomIcon={icons.search} paddingHorizontal={0.01} small />
      <Title title="Help center" alignSelf="flex-start" />
      {Config.token ? (
        <TouchableOpacity
          style={{...styles.itemBg, marginTop: hp(2)}}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('REGISTER_COMPLAINT_SCREEN')}>
          <SimpleText text="Register complaints" color={colors.black} />
          <AntDesign
            name="right"
            size={verticalScale(16)}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : null}
      <Divider marginTop={hp(1)} />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <SemiTitle title="FAQs" />
        <SemiMediumTitle title="How can we help you?" marginTop={hp(1)} />
        {helpCenterData
          ? helpCenterData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() =>
                    navigation.navigate('FAQ_DETAIL_SCREEN', {item})
                  }>
                  <View style={styles.itemBg}>
                    <View style={{alignItems: 'flex-start', flex: 1}}>
                      <SimpleText
                        text={item.title}
                        color={colors.black}
                        alignSelf="flex-start"
                      />
                    </View>
                    <AntDesign
                      name="right"
                      size={verticalScale(16)}
                      color={colors.black}
                    />
                  </View>
                  <Divider marginTop={hp(1)} />
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
      <CustomeLoader visible={loading} />
    </View>
  );
};

export default HelpCenterScreen;

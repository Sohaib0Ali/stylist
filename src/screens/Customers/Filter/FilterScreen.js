//================================ React Native Imported Files ======================================//

import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import icons from '../../../assets/icons/icons';
import RangeSlider from 'rn-range-slider';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Title from '../../../components/Title/Title';
import SmallTitle from '../../../components/SmallTitle/SmallTitle';
import SemiTitle from '../../../components/SemiTitle';
import ServiceComponent from '../../../components/ServiceComponent/ServiceComponent';
import Button from '../../../components/Button/Button';
import Thumb from './Thumb';
import {useIsFocused} from '@react-navigation/native';
import Config from '../../../config/config';
import axios from 'axios';
import {showWarning} from '../../../../Utils/FlashMessage';
import Strings from '../../../constants/Strings';
import {useTranslation} from 'react-i18next';

const FilterScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [low, setLow] = useState(25);
  const [high, setHigh] = useState(75);
  const [click, setClick] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const renderThumb = useCallback(value => <Thumb text={value} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getServiceData();
    }
  }, [isFocused]);

  const getServiceData = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config?.token}`,
    };

    axios
      .get(`${Config?.baseUrl}getAllService`, {headers})
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          setServiceData(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const resetValue = () => {
    setLow(20);
    setHigh(80);
    let newArr = serviceData.map((item, index) => {
      return {...item, isSelected: (item.isSelected = false)};
    });
    setServiceData(newArr);
  };

  const updateDataArray = position => {
    let newArr = serviceData.map((item, index) => {
      if (index == position) {
        return {...item, isSelected: item?.isSelected ? false : true};
      }
      return item;
    });
    setServiceData(newArr);
  };

  const getIdCallBack = id => {};

  const getAllSeletedIDs = () => {
    let arr1 = [];
    serviceData.map((item, index) => {
      if (item.isSelected) {
        arr1.push(item._id);
      }
    });
    if (arr1.length > 0) {
      Strings.serviceID = arr1;
      Strings.min = low;
      Strings.max = high;
      navigation.goBack();
    } else {
      showWarning(Strings.selectServices);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <View style={styles.Container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.toggle} />
          <View style={styles.headerBg}>
            <Title
              title={t('Filters')}
              marginBottom={hp(1)}
              marginTop={hp(1)}
            />
            <TouchableOpacity
              style={styles.resetBg}
              onPress={() => resetValue()}>
              <SmallTitle title={t('resetAll')} color={colors.btnColor} />
            </TouchableOpacity>
          </View>
          <SemiTitle
            title={t('PriceRange')}
            marginBottom={hp(1.5)}
            marginTop={hp(3)}
          />
          <RangeSlider
            style={styles.slider}
            min={0}
            max={100}
            step={1}
            floatingLabel
            low={low}
            high={high}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <SemiTitle
            title={t('availableServices')}
            marginBottom={hp(2)}
            marginTop={hp(2)}
          />
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{alignSelf: 'center'}}
            />
          ) : (
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
              }}
              ItemSeparatorComponent={() => (
                <View style={{marginBottom: wp(5.3)}} />
              )}
              contentContainerStyle={{paddingBottom: '8%'}}
              showsVerticalScrollIndicator={false}
              data={serviceData}
              numColumns={3}
              renderItem={({item, index}) => (
                <ServiceComponent
                  getIdCallBack={getIdCallBack}
                  key={index}
                  id={item?._id}
                  title={item?.servname}
                  onPress={() => {
                    setClick(index),
                      setSelectedValue(item?._id),
                      updateDataArray(index);
                  }}
                  bgColor={item?.isSelected ? colors.yellow : colors.white}
                  icon={item?.icon}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={selectedValue}
            />
          )}

          <View style={styles.FAB}>
            <Button buttonText="Apply" onPress={() => getAllSeletedIDs()} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;

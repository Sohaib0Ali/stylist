import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import Button from '../../../../BusinessUtills/components/Button/Button';
import {t} from 'i18next';
import SemiServices from '../Component/SemiServices';
import axios from 'axios';
import BConfig from '../../../../BusinessUtills/config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowServices = ({Data, ServiceType, onAddNewTreatment}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [uData, setUData] = useState(Data);
  useEffect(() => {
    setUData(Data);
  }, [Data]);

  useEffect(() => {
    saveUDataToAsyncStorage(uData);
  }, [uData]);

  const saveUDataToAsyncStorage = async data => {
    try {
      await AsyncStorage.setItem('AddserviceData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving uData to AsyncStorage:', error);
    }
  };

  const deleteServices = id => {
    var config = {
      method: 'DELETE',
      maxBodyLength: Infinity,
      url: `${BConfig.baseUrl}deleteServiceType/${id}`,
      headers: {
        Authorization: `Bearer ${BConfig.token}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(async function (response) {
        let res = response.data;
        if (res.success) {
          setUData(prevData => prevData.filter(item => item._id !== id));
        }
      })
      .catch(function (error) {});
  };

  return (
    <ScrollView
      style={{height: scale(450)}}
      showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginTop: scale(20),
          marginBottom: scale(5),
          marginHorizontal: scale(25),
          color: 'black',
        }}>
        Treatment list
      </Text>
      {uData?.map(item => {
        const backgroundColor =
          item.id === selectedId ? colors.yellow : colors.white;
        return (
          <SemiServices
            key={item?._id}
            ServiceType={ServiceType}
            textColor={'black'}
            cat={item?.name}
            time={item?.duration}
            price={item?.price}
            deleteItem={() => deleteServices(item._id)}
            service={true}
            currency={item.currency}
            backgroundColor={{backgroundColor}}
            onPress={() => setSelectedId(item._id)}
          />
        );
      })}
      <Button
        buttonText={t('Add New Treatment')}
        marginTop={hp(2)}
        marginBottom={10}
        onPress={onAddNewTreatment}
      />
    </ScrollView>
  );
};

export default ShowServices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: Platform.OS === 'ios' ? hp(5) : null,
  },
});

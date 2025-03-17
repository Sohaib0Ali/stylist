import {View, FlatList, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import Title from '../../../../../components/Title/Title';
import MemoryComponent from '../../../../../components/Client Components/MemoryComponent';
import {showWarning} from '../../../../../../Utils/FlashMessage';
import axios from 'axios';
import CustomeLoader from '../../../../../components/Loader/CustomeLoader';
import Config from '../../../../../config/config';
import {useTranslation} from 'react-i18next';

export default function MemoriesScreen() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getMemories();
  }, []);

  const getMemories = () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };

    axios
      .get(`${Config.baseUrl}getMemories`, {headers})
      .then(response => {
        setLoading(false);
        if (response.data.success === true) {
          setData(response?.data?.data);
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
      <Title
        paddingHorizontal={wp('4%')}
        title={t('memories')}
        alignSelf="flex-start"
        marginTop={hp(1)}
        marginBottom={hp(5)}
      />
      <View style={styles.body} showsVerticalScrollIndicator={false}>
        {data?.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <MemoryComponent
                  title={item?.salonName}
                  text={item?.salonAddress}
                  img={item?.beforeImageURL}
                  img1={item?.afterImageURL}
                />
              );
            }}
            keyExtractor={item => item?.id}
          />
        ) : (
          <View style={{width: wp(100), alignItems: 'center'}}>
            <Text style={{fontSize: wp(4)}}>{t('NoDatafound')}</Text>
          </View>
        )}
      </View>
      <CustomeLoader visible={loading} />
    </View>
  );
}

//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import ReviewComponent from '../../../../BusinessUtills/components/Client Components/Salon Components/ReviewComponent';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import axios from 'axios';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import {useTranslation} from 'react-i18next';

const ReviewScreen = ({data, salonData}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [review, setReview] = useState([]);
  const {t} = useTranslation();
  const sid = data._id;
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getReviewData(sid);
    }
  }, [isFocused]);
  const getReviewData = async sID => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${BConfig.token}`,
    };
    axios
      .get(`${BConfig.baseUrl}business/getStylistRating/${sID}`, {headers})
      .then(response => {
        if (response.data.success === true) {
          setLoading(false);
          setReview(response.data.data);
        } else {
          alert(t('somethingWentWrong'));
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        alert(t('somethingWentWrong'));
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'#57429D'}
          style={{marginTop: '3%'}}
        />
      ) : review.length > 0 ? (
        <FlatList
          data={review}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ReviewComponent
              profileImg={item.review.userProfilePic}
              rating={item.review.rating}
              name={item.review.userName}
              day={item.time}
              review={item.review.review}
              reply={item.review.reply}
              subImages={item.review.images}
              salonData={salonData}
              onPress={() =>
                navigation.navigate('REPLY_REVIEW', {
                  data: salonData,
                  reviewData: item,
                  checkStylist: true,
                })
              }
            />
          )}
          keyExtractor={item => item.review._id}
        />
      ) : (
        <SimpleText text={t('noReviews')} />
      )}
    </View>
  );
};

export default ReviewScreen;

//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import images from '../../../../assets/images/images';
import axios from 'axios';
import ReviewComponent from '../../../../components/Client Components/Salon Components/ReviewComponent';
import Config from '../../../../config/config';
import {showWarning} from '../../../../../Utils/FlashMessage';
import CustomeLoader from '../../../../components/Loader/CustomeLoader';
import SmallText from '../../../../components/SmallText/SmallText';
import {ScrollView} from 'react-native-gesture-handler';

let count = 0;
const ReviewScreen = ({sID}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReviewData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (count == 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, 500);
  }, [data, count]);

  const getReviewData = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    axios
      .get(`${Config.baseUrl}getReviewBySalonId/${sID}`, {headers})
      .then(response => {
        setLoading(false);
        if (response.status === Config.statusCode) {
          count = count + 1;
          setData(response.data.data);
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
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {data?.length > 0 ? (
          <>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#000000"
                style={{alignSelf: 'center'}}
              />
            ) : (
              <>
                {data.map((item, index) => {
                  return (
                    <ReviewComponent
                      profileImg={item.review.userProfilePic}
                      rating={item.userRating.rating}
                      name={item.review.userName}
                      day={item.time}
                      review={item.review.review}
                      images={item.review.images}
                      index={index}
                    />
                  );
                })}
              </>
            )}
          </>
        ) : (
          <SmallText text={'No Review found'} />
        )}

        <CustomeLoader visible={loading} />
      </View>
    </ScrollView>
  );
};

export default ReviewScreen;

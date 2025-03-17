import React, {useState} from 'react';
import {Text, View, Image, FlatList, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../../../BusinessUtills/components/Header/Header';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import SemiMediumTitle from '../../../../BusinessUtills/components/Semi Medium Title';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import Input from '../../../../BusinessUtills/components/Input/Input';
import Button from '../../../../BusinessUtills/components/Button/Button';
import styles from './ReplyStyle';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import BConfig from '../../../../BusinessUtills/config/config';
import {useTranslation} from 'react-i18next';

const ReplyReview = ({route}) => {
  const navigation = useNavigation();
  const {data, reviewData, checkStylist} = route.params;
  const [comment, setComment] = useState(reviewData.review.reply);
  const {t} = useTranslation();

  const postComment = () => {
    if (checkStylist === true) {
      var data = JSON.stringify({
        reviewId: reviewData.review._id,
        reply: comment,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}/business/replyStylistRating`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          navigation.goBack();
        })
        .catch(function (error) {});
    } else {
      var data = JSON.stringify({
        reviewId: reviewData.review._id,
        reply: comment,
      });

      var config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${BConfig.baseUrl}/replySalonRating`,
        headers: {
          Authorization: `Bearer ${BConfig.token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          navigation.goBack();
        })
        .catch(function (error) {});
    }
  };

  return (
    <View style={styles.container}>
      <Header
        headerBack={true}
        direction={'RTL'}
        headerColor={'white'}
        onBackPress={() => navigation.goBack()}
        title={t('replyTo') + ' ' + reviewData.review.userName}
        titleTextColor={'#5E5E5F'}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.dpBg}>
              <Image
                style={styles.dp}
                source={{uri: reviewData.review.userProfilePic}}
                resizeMode="contain"
              />
            </View>

            <View style={styles.reviewTextBg}>
              <View style={styles.reviewStarBg}>
                <Image
                  style={styles.star}
                  source={icons.star}
                  resizeMode="contain"
                />
                <SemiMediumTitle
                  title={reviewData.review.rating}
                  color={colors.headingBlack}
                />
              </View>
              <SemiMediumTitle
                title={reviewData.review.userName}
                color={colors.headingBlack}
              />
            </View>
          </View>
        </View>
        <SimpleText
          width={wp(90)}
          alignSelf={'baseline'}
          textAlign="left"
          marginTop={hp(1)}
          text={reviewData.review.review}
        />
        <FlatList
          data={reviewData.review.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: hp(1.5),
          }}
          renderItem={({item}) => (
            <View style={styles.sliderImgBg}>
              <Image style={styles.sliderImg} source={{uri: item.image}} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <View style={styles.buttonContainer}>
          <View style={{flex: 0.2}}>
            <Image
              style={styles.dpBg}
              source={{uri: data?.salon?.profileImage}}
            />
          </View>
          <View style={{flex: 0.9}}>
            <Text style={styles.buttonText}>
              {t('replyTo')} {reviewData?.review?.userName}
            </Text>
          </View>
        </View>
        <Input
          placeholder={t('comment')}
          onChangeText={setComment}
          value={comment}
          height
        />
        <Button
          buttonText={t('post')}
          onPress={postComment}
          marginTop={hp(2.1)}
        />
      </ScrollView>
    </View>
  );
};

export default ReplyReview;

import React from 'react';
import {Text, ScrollView, View, Image, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Rating} from 'react-native-ratings';
import colors from '../../../../assets/colors/colors';
import icons from '../../../../assets/icons/icons';
import images from '../../../../assets/images/images';
import Header from '../../../../components/Header/Header';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import Title from '../../../../components/Title/Title';
import styles from './style';
import ReviewComponent from '../../../../components/Client Components/Salon Components/ReviewComponent';
import {useTranslation} from 'react-i18next';

const reviewData = [
  {
    id: '1',
    profileImg: images.barber,
    rating: '4.3',
    name: 'Esther Howard',
    day: '1 day ago',
    review:
      'Always wonderful.  Professional and personable, providing top quality service',
  },
  {
    id: '2',
    profileImg: images.barber,
    rating: '4.3',
    name: 'Esther Howard',
    day: '1 day ago',
    review:
      'Always wonderful.  Professional and personable, providing top quality service',
  },
];

const CrewReviewScreen = ({text}) => {
  const {t} = useTranslation();
  const ratingCompleted = rating => {};
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.dpBg}>
        <View style={styles.imgBg}>
          <Image style={styles.img} source={images.man} />
        </View>
        <View style={styles.textContainer}>
          <SmallTitle title="22 mins" color={colors.red} />
        </View>
      </View>
      <View style={styles.reviewStarBg}>
        <Image source={icons.star} style={styles.star} resizeMode="contain" />
        <Text style={styles.tgText}>4.0 </Text>
        <Text style={styles.review}>(12 reviews)</Text>
      </View>
      <Title title="Cody Fisher" marginBottom={1} marginTop={1} />
      <View style={styles.nameTextBg}>
        <SimpleText text={t('topMaster')} marginRight={wp(2)} />
        <SmallTitle title="Toney & Guy" />
      </View>
      <MediumTitle
        title={t('rateReview')}
        marginTop={hp(3)}
        marginBottom={hp(0.1)}
      />
      <SimpleText text={t('shareExperience')} textAlign="left" />
      <View style={styles.reviewContainer}>
        <View style={styles.iconBg}>
          <Image style={styles.icon} source={images.manIcon} />
        </View>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={20}
          onFinishRating={ratingCompleted}
        />
      </View>
      <FlatList
        data={reviewData}
        renderItem={({item}) => (
          <ReviewComponent
            profileImg={item.profileImg}
            rating={item.rating}
            name={item.name}
            day={item.day}
            review={item.review}
          />
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};
export default CrewReviewScreen;

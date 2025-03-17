import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';
import icons from '../../../../assets/icons/icons';
import images from '../../../../assets/images/images';
import Divider from '../../../Divider/divider';
import SemiMediumTitle from '../../../Semi Medium Title';
import SimpleText from '../../../SimpleText/SimpleText';
import SmallText from '../../../SmallText/SmallText';
import styles from './style';

const ReviewComponent = ({
  profileImg,
  rating,
  name,
  day,
  review,
  subImages,
  reply,
  salonData,
  onPress,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.dpBg}>
            <Image
              style={styles.dp}
              source={profileImg ? {uri: profileImg} : images.barber}
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
              <SemiMediumTitle title={rating} color={colors.headingBlack} />
            </View>
            <SemiMediumTitle title={name} color={colors.headingBlack} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <SmallText text={day} />
        </View>
      </View>
      {review ? (
        <SimpleText
          width={wp(90)}
          alignSelf={'baseline'}
          textAlign="left"
          marginTop={hp(1)}
          text={review}
        />
      ) : null}
      <FlatList
        data={subImages}
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
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <View style={{flex: 0.2}}>
          <Image
            style={styles.dpBg}
            source={{uri: salonData?.salon?.profileImage}}
          />
        </View>
        <View style={{flex: 0.9}}>
          {reply ? (
            <View>
              <Text style={[styles.buttonText, {fontFamily: fonts.bold}]}>
                {salonData?.salon?.businessName}
              </Text>
              <Text style={styles.buttonText}>{reply}</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>
              {t('replyTo')} {name}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Divider marginTop={hp(1.5)} />
    </View>
  );
};
export default ReviewComponent;

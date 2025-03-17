import React from 'react';
import {View, Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import icons from '../../../../assets/icons/icons';
import Divider from '../../../Divider/divider';
import SemiMediumTitle from '../../../Semi Medium Title';
import SimpleText from '../../../SimpleText/SimpleText';
import SmallText from '../../../SmallText/SmallText';
import styles from './style';
import {scale} from 'react-native-size-matters';
import {FlatList} from 'react-native-gesture-handler';

const ReviewComponent = ({
  profileImg,
  rating,
  name,
  day,
  review,
  images,
  index,
}) => {
  return (
    <View key={index} style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.dpBg}>
            <Image
              style={styles.dp}
              source={{uri: profileImg}}
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
          <SmallText fontSize={scale(12)} text={day} color={colors.grey} />
        </View>
      </View>
      <SimpleText
        textAlign="left"
        marginTop={hp(1)}
        marginLeft={scale(10)}
        marginRight={scale(10)}
        text={review}
        size={scale(14)}
        color={colors.subHeading}
      />
      <FlatList
        data={images}
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
      <Divider marginTop={hp(1.5)} />
    </View>
  );
};
export default ReviewComponent;

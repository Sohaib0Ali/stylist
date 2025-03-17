import React, {useState} from 'react';
import {Text, ScrollView, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../assets/icons/icons';
import Button from '../../Button/Button';
import styles from './style';
import MediumTitle from '../../MediumTitle/MediumTitle';
import colors from '../../../assets/colors/colors';
import SalonDetailComponent from '../SalonDetailComponent/SalonDetailComponent';

const SalonDetailFilter = ({salonData, crewData, bookingCallbacks}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.moreSecBg}></View>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.reviewStarBg}>
            <Image
              source={icons.star}
              style={styles.star}
              resizeMode="contain"
            />
            <Text style={styles.tgText}>{salonData?.salonRating?.rating}</Text>
            <Text style={styles.review}>
              ({salonData?.salonRating?.numberOfRating} reviews)
            </Text>
          </View>
          <View style={styles.iconTextBg}>
            <Image
              style={styles.clockIcon}
              source={icons.clock}
              tintColor={colors.red}
              resizeMode="contain"
            />
            <Text style={styles.time}>{salonData.time}</Text>
          </View>
        </View>
        <MediumTitle
          title={salonData?.salon?.businessName}
          marginBottom={hp(0.8)}
          marginTop={hp(0.8)}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.smallText}>{salonData?.salon?.address}</Text>
          <View
            style={{
              ...styles.iconTextBg,
              backgroundColor: 'transparent',
              width: wp(24.4),
            }}>
            <Image
              style={styles.clockIcon}
              source={icons.map}
              tintColor={colors.black}
              resizeMode="contain"
            />
            <Text style={styles.smallText}>{salonData?.distanceInMiles}</Text>
          </View>
        </View>
      </View>
      {crewData
        ? crewData.map((item, index) => {
            const backgroundColor =
              item?.stylist?._id === selectedId ? colors.yellow : colors.white;
            return (
              <SalonDetailComponent
                keyValue={item?.stylist?._id}
                cat={item?.stylist?.position}
                name={item?.stylist?.firstName + ' ' + item?.stylist?.lastName}
                price={item?.stylist?.price}
                img={item?.stylist?.profilePic}
                type={item?.stylist?.currency}
                backgroundColor={{backgroundColor}}
                onPress={() => {
                  setSelectedId(item?.stylist?._id), setSelectedData(item);
                }}
              />
            );
          })
        : null}

      <View style={{width: wp(100), alignItems: 'center'}}>
        <Button
          buttonText="Book"
          marginTop={wp(5)}
          onPress={() => bookingCallbacks(selectedData)}
        />
      </View>
    </ScrollView>
  );
};
export default SalonDetailFilter;

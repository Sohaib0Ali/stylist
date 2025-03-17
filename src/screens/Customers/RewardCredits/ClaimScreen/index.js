//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, TouchableOpacity, Share} from 'react-native';

import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SemiTitle from '../../../../components/SemiTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import Button from '../../../../components/Button/Button';
import ShareWhite from '../../../../assets/icons/shareWhite.svg';
import StarFilled from '../../../../assets/icons/starFilled.svg';

const ClaimScreen = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Windsor',
        message: 'Windsor.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <StarFilled width={wp(14.5)} height={wp(14.5)} alignSelf="center" />
        <SemiTitle title="Free haircut" alignSelf="center" marginTop={wp(4)} />
        <SimpleText text="Every 10th haircut as a gift!" marginBottom={wp(5)} />
        <View style={styles.iconBtnContainer}>
          <Button buttonText="Claim reward" width={wp(50)} />
          <TouchableOpacity
            style={styles.iconBg}
            activeOpacity={0.6}
            onPress={onShare}>
            <ShareWhite width={wp(6)} height={wp(6)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ClaimScreen;

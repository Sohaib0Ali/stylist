import {View, Image} from 'react-native';
import React from 'react';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SmallText from '../../SmallText/SmallText';
import SemiTitle from '../../SemiTitle';
import ShareIcon from '../../../assets/icons/share.svg';
import styles from './style';

export default function MemoryComponent({img, img1, title, text}) {
  return (
    <View style={{flex: 1, paddingHorizontal: wp('4%')}}>
      <View style={styles.card}>
        <View style={styles.row}>
          <SemiTitle title={title} />
          <View style={styles.iconBg}>
            <ShareIcon width={wp(4)} height={wp(4)} />
          </View>
        </View>
        <SmallText marginBottom={wp(3)} text={text} alignSelf="flex-start" />
        <View style={styles.imgContainer}>
          <View style={styles.imgBg}>
            <Image source={img} resizeMode="stretch" style={styles.img} />
          </View>

          <View style={styles.imgBg}>
            <Image source={img1} resizeMode="stretch" style={styles.img} />
          </View>
        </View>
      </View>
    </View>
  );
}

//================================ React Native Imported Files ======================================//
import React from 'react';
import {View, ScrollView} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import SemiTitle from '../../../../components/SemiTitle';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../components/Semi Medium Title';

const FAQDetailScreen = ({route}) => {
  const title = route.params.item.title;
  const detail = route.params.item.description;
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <SemiTitle title={title} alignSelf="flex-start" marginTop={hp(1)} />
        <SmallText text={detail} marginTop={hp(2)} />
        <SemiMediumTitle
          title="Was this answer helpful?"
          alignSelf="center"
          marginTop={hp(4)}
        />
      </ScrollView>
    </View>
  );
};
export default FAQDetailScreen;

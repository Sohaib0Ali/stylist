import React from 'react';
import {View, Image} from 'react-native';
import PagerView from 'react-native-pager-view';
import styles from './style';
import SemiTitle from '../../../SemiTitle';

const PortfolioComponent = ({title, mainImg, subImg, subImg1}) => {
  return (
    <View>
      <View style={styles.titleTextBg}>
        <SemiTitle title={title} />
      </View>

      <View style={styles.portfolioImgBg}>
        <Image style={styles.portfolioImg} source={{uri: mainImg?.img}} />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        showPageIndicator={false}
        horizontal>
        <View style={styles.slider}>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={{uri: subImg?.img}} />
          </View>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={{uri: subImg1?.img}} />
          </View>
        </View>
      </PagerView>
    </View>
  );
};
export default PortfolioComponent;

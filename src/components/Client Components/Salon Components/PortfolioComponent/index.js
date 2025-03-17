import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import colors from '../../../../assets/colors/colors';
import Strings from '../../../../constants/Strings';
import SmallTitle from '../../../SmallTitle/SmallTitle';
import styles from './style';
import SemiTitle from '../../../SemiTitle';
import {scale} from 'react-native-size-matters';

const PortfolioComponent = ({title, mainImg}) => {
  let Image_Http_URL = {uri: mainImg[0].img};
  return (
    <View>
      <View style={styles.titleTextBg}>
        <SemiTitle title={title} fontSize={scale(20)} />
        <TouchableOpacity>
          <SmallTitle title={Strings.seeAll} color={colors.btnColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.portfolioImgBg}>
        <Image style={styles.portfolioImg} source={Image_Http_URL} />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        showPageIndicator={false}
        horizontal>
        <View style={styles.slider} key="1">
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={{uri: mainImg[1]?.img}} />
          </View>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={{uri: mainImg[2]?.img}} />
          </View>
        </View>
      </PagerView>
    </View>
  );
};
export default PortfolioComponent;

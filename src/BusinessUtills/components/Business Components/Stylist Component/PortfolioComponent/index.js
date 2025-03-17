import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import colors from '../../../../assets/colors/colors';
import SmallTitle from '../../../SmallTitle/SmallTitle';
import styles from './style';
import SemiTitle from '../../../SemiTitle';
import {useTranslation} from 'react-i18next';

const PortfolioComponent = ({title, mainImg, subImg, subImg1}) => {
  const {t} = useTranslation();
  return (
    <View style={{}}>
      <View style={styles.titleTextBg}>
        <SemiTitle title={title} />
        <TouchableOpacity>
          <SmallTitle title={t('edit')} color={colors.btnColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.portfolioImgBg}>
        <Image style={styles.portfolioImg} source={mainImg} />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true}
        showPageIndicator={false}
        horizontal>
        <View style={styles.slider} key="1">
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={subImg} />
          </View>
          <View style={styles.sliderImgBg}>
            <Image style={styles.sliderImg} source={subImg1} />
          </View>
        </View>
      </PagerView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
        <Text style={styles.buttonText}>{t('addNewAlbum')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PortfolioComponent;

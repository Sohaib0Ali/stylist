//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import PortfolioComponent from '../../../../BusinessUtills/components/Client Components/Salon Components/PortfolioComponent';

const PortfolioScreen = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.salon?.portfolio}
        renderItem={({item, index}) => (
          <PortfolioComponent
            key={index}
            title={item.albumName}
            mainImg={item.portfolioImages[0]}
            subImg={item.portfolioImages[1]}
            subImg1={item.portfolioImages[2]}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default PortfolioScreen;

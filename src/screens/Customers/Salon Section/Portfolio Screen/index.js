//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, Text} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import PortfolioComponent from '../../../../components/Client Components/Salon Components/PortfolioComponent';
import {ScrollView} from 'react-native-gesture-handler';

const PortfolioScreen = ({portFolioData}) => {
  const [data, setData] = useState(portFolioData);
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {data ? (
          <>
            {data.map((item, index) => {
              return (
                <PortfolioComponent
                  title={item.albumName}
                  mainImg={item.portfolioImages}
                  subImg={item.subImg}
                />
              );
            })}
          </>
        ) : (
          <View>
            <Text>{t('Waiting')}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PortfolioScreen;

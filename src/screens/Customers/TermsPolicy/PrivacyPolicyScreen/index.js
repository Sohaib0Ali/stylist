//================================ React Native Imported Files ======================================//
import React from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SemiTitle from '../../../../components/SemiTitle';
import SmallText from '../../../../components/SmallText/SmallText';

const PrivacyPolicyScreen = ({description}) => {
  return (
    <View style={styles.container}>
      <SemiTitle title="Overview" alignSelf="flex-start" marginTop={hp(2)} />
      <SmallText
        text={description ? description : ''}
        alignSelf="flex-start"
        marginTop={hp(1.5)}
      />
    </View>
  );
};

export default PrivacyPolicyScreen;

import React from 'react';
import {View, Image} from 'react-native';
import {string} from 'prop-types';
import styles from './OverlayLabel.styles';
import images from '../../../../../assets/images/images';
import {scale} from 'react-native-size-matters';

const OverlayLabel = ({label, color}) => {
  return (
    <>
      {label == 'NOPE' && (
        <View
          style={[
            styles.overlayLabel,
            {position: 'absolute', right: scale(100), top: scale(200)},
          ]}>
          <Image
            style={[styles.LikePost]}
            source={images.Reject}
            resizeMode="contain"
          />
        </View>
      )}

      {label == 'LIKE' && (
        <View
          style={[
            styles.overlayLabel,
            {position: 'absolute', left: scale(100), top: scale(200)},
          ]}>
          <Image
            style={[styles.LikePost]}
            source={images.LikePost}
            resizeMode="contain"
          />
        </View>
      )}
    </>
  );
};

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
};

export default OverlayLabel;

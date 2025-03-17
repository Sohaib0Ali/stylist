//================================ React Native Imported Files ======================================//
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//
import styles from './style';
import colors from '../../../../../BusinessUtills/assets/colors/colors';
import SmallTitle from '../../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DescriptionScreen = ({ callBackDiscriptionData, currentPage }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [descriptionValidError, setDescriptionValidError] = useState('');
  const isFocused = useIsFocused();
  const handleValidDescription = val => {
    if (val.length === 0) {
      setDescriptionValidError(t('required'));
    } else if (val.length !== 0) {
      setDescriptionValidError(t('done'));
    }
  };

  useEffect(() => {
    if (isFocused) {
      callBackDiscriptionData({
        description: description,
        descriptionValidError: descriptionValidError,
      });
    }
  }, [description, isFocused, currentPage]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          textAlignVertical="top"
          numberOfLines={8}
          multiline
          value={description}
          onChangeText={description => {
            setDescription(description), handleValidDescription(description);
          }}
          placeholder={t('businessdescription')}
          selectionColor={colors.black}
          placeholderTextColor={colors.subHeading}
        />
        {descriptionValidError !== 'Done' && descriptionValidError !== '' ? (
          <SmallTitle
            title={descriptionValidError}
            alignSelf="flex-start"
            color={colors.green}
            marginBottom={wp(4)}
            marginLeft={wp(5)}
            width={wp(80)}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DescriptionScreen;

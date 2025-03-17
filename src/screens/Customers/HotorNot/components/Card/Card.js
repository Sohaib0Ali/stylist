import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Card.styles';

const Card = ({cards}) => (
  <View style={[styles.card, styles.overlay]}>
    <Image style={styles.image} source={cards.photo} resizeMode="cover" />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>{`${cards.name}`}</Text>
    </View>
  </View>
);

export default Card;

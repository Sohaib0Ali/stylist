import {View, Modal, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images/images';
const CustomeLoader = ({visible}) => {
  const [modalVisible, setModalVisible] = React.useState(true);
  return (
    <Modal
      transparent={true}
      visible={visible ? visible : false}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        }}>
        <Image source={images.loaderIcon} />
      </View>
    </Modal>
  );
};

export default CustomeLoader;

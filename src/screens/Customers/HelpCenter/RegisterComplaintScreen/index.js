//================================ React Native Imported Files ======================================//
import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, TextInput} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import PickerComponent from '../../../../components/PickerComponent/PickerComponent';
import Button from '../../../../components/Button/Button';
import colors from '../../../../assets/colors/colors';
import Config from '../../../../config/config';
import {showSuccess, showWarning} from '../../../../../Utils/FlashMessage';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import CompanyPickerComponent from '../../../../components/CompanyPicker/CompanyPickerComponent';
import {useTranslation} from 'react-i18next';

const RegisterComplaintScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState('Select Company');
  const [companies, setcompanies] = useState([]);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const refRBSheet = useRef();

  useEffect(() => {
    getCompanies();
  }, []);

  const selectedCompanyData = id => {
    companies.map(item => {
      if (item._id == id) {
        setCompany(item.businessName);
        setId(id);
      }
    });
  };

  const getCompanies = async () => {
    setLoading(true);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${Config.token}`,
    };
    await axios
      .get(`${Config.baseUrl}getAllSalon`, {headers})
      .then(response => {
        setLoading(false);
        if (response.data.success === true) {
          setcompanies(response.data.data);
        } else {
          showWarning(t('TryAgain'));
        }
      })
      .catch(e => {
        showWarning(t('TryAgain'));
        setLoading(false);
      });
  };

  const addComplaint = async () => {
    var data = JSON.stringify({
      description: description,
      salonId: id,
    });

    var config = {
      method: 'post',
      url: `${Config.baseUrl}addComplaint`,
      headers: {
        Authorization: `Bearer ${Config.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.success === true) {
          showSuccess(response.data.msg);
          navigation.goBack();
        }
      })
      .catch(function (error) {});
  };

  const submitComplaint = () => {
    if (description != '') {
      addComplaint();
    } else {
      showWarning(t('selectCompanyAddDescription'));
    }
  };

  return (
    <View style={styles.container}>
      <Header paddingHorizontal={0.01} />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          title="Register complaints"
          alignSelf="flex-start"
          marginTop={hp(1)}
          marginBottom={hp(2.5)}
        />
        <PickerComponent
          title="Select company"
          value={company}
          direction="LTR"
          onPress={() => refRBSheet.current.open()}
        />
        <RBSheet
          height={hp(38)}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: wp(4),
              borderTopRightRadius: wp(4),
            },
            draggableIcon: {
              backgroundColor: colors.borderColor,
            },
          }}>
          <CompanyPickerComponent
            selectedCompanyData={selectedCompanyData}
            companiesData={companies}
            onPressLeft={() => refRBSheet.current.close()}
            onPressRight={() => refRBSheet.current.close()}
          />
        </RBSheet>

        <TextInput
          style={styles.input}
          textAlignVertical="top"
          numberOfLines={5}
          multiline
          value={description}
          onChangeText={description => setDescription(description)}
          placeholder="Description..."
          selectionColor={colors.black}
          placeholderTextColor={colors.subHeading}
        />
        <Button
          onPress={() => submitComplaint()}
          buttonText={t('send')}
          marginTop={hp(2.5)}
        />
      </ScrollView>
    </View>
  );
};

export default RegisterComplaintScreen;

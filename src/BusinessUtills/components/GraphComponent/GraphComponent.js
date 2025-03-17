import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BarChart} from 'react-native-gifted-charts';
import colors from '../../assets/colors/colors';
const GraphComponent = ({data, onPress}) => {
  let dummyArr = [];
  const [valueLable, setValueLable] = useState({});
  const [check, setCheck] = useState(false);
  const [maxValue, setmaxValue] = useState(0);

  useEffect(() => {
    setValueAndLable();
  }, []);

  const setValueAndLable = () => {
    data?.map(item => {
      dummyArr.push({
        value: item.amount,
        label: item.day,
      });
    });
    const maxVal = data?.reduce((prev, curr) =>
      prev.amount > curr.amount ? prev : curr,
    );
    setmaxValue(maxVal?.amount);

    setValueLable(dummyArr);
    setCheck(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {check ? (
          <BarChart
            width={wp(70)}
            height={hp(15)}
            barWidth={wp(2.3)}
            noOfSections={3}
            roundedTop
            frontColor={'#FFDE82'}
            onPress={onPress}
            selectedBarIndex={2}
            data={valueLable}
            yAxisLabelTexts={[
              '0',
              Math.floor(maxValue / 3),
              Math.floor(maxValue / 2),
              Math.floor(maxValue + maxValue / 10),
            ]}
            yAxisThickness={0}
            xAxisLabelTextStyle={{color: 'black'}}
            yAxisTextStyle={{color: 'black'}}
            xAxisThickness={1}
            minValue={0}
            maxValue={maxValue + maxValue / 10}
            initialSpacing={wp(5.1)}
            labelWidth={wp(5.4)}
            spacing={wp(7)}
            dashGap={0}
            renderTooltip={(item, index) => {
              return (
                <View
                  style={{
                    marginBottom: hp(1.2),
                    marginLeft: wp(-4.1),
                    backgroundColor: '#57429D',
                    paddingHorizontal: wp(2.1),
                    paddingVertical: hp(0.6),
                    borderRadius: wp(5),
                  }}>
                  <Text style={{color: colors.white}}>{item.value}</Text>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(28),
    paddingHorizontal: wp(4.1),
  },
  subContainer: {
    flex: 1,
    height: hp(23.5),
    borderWidth: 1,
    borderColor: '#848286',
    borderRadius: wp(3.1),
    justifyContent: 'center',
    paddingHorizontal: wp(4.1),
  },
});

export default GraphComponent;

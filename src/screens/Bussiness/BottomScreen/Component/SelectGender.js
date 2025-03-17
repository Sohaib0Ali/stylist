import React,{useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectGender = ({genderVieStyle,onSelectValue}) => {
    const [selectedValue, setSelectedValue] = useState('Unisex');

    const onSelect = (value) => {
      onSelectValue(value)
      setSelectedValue(value);
  
    }
  return (
    <View style={[genderVieStyle,{width:"80%"}]}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.radioButton} onPress={() => onSelect('Unisex')}>
      {selectedValue === 'Unisex' ? <View style={styles.radioSelected} />: <View style={styles.radioNotselect} />}
        <Text style={styles.radioText}>Unisex</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.radioButton} onPress={() => onSelect('Male')}>
      {selectedValue === 'Male' ? <View style={styles.radioSelected} />: <View style={styles.radioNotselect} />}
        <Text style={styles.radioText}>Male / Child</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.radioButton} onPress={() => onSelect('Female')}>
      {selectedValue === 'Female' ? <View style={styles.radioSelected} />: <View style={styles.radioNotselect} />}
        <Text style={styles.radioText}>Female / child</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default SelectGender

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal:10
      },
      radioText: {
        fontSize: 14,
        marginLeft: 8,
      },
      radioNotselect: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth:2,
        borderColor:"#848286"
        // backgroundColor: '#2196F3',
      },
      radioSelected:{
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth:6,
        borderColor:"#27232C"
      }
})
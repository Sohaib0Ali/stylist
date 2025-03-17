import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { scale } from 'react-native-size-matters'

const ServiceList = ({
    Data,
    selectedSrvName,
    getTypeOfServices,
    isCount,
    servicetype,

}) => {
    const [selectedid, setSelectedId] = useState(null)

    const renderserviceItem = ({ item }) => {
        return (
            <>
                {isCount && selectedid === item?._id ? <Text style={{
                    position: "absolute", zIndex: 1, top: scale(2), left: scale(4),
                    backgroundColor: "red", width: scale(15), height: scale(15), borderRadius: scale(100), textAlign: "center"
                }}>{servicetype.length}</Text> : null}
                <TouchableOpacity style={{ height: scale(35), justifyContent: "center" }}
                    onPress={() => {
                        selectedSrvName(item?.servname),
                            getTypeOfServices(item?._id, item?.servname)
                        setSelectedId(item?._id)
                    }
                    }>
                    <View style={styles.serviceList}>
                        <Text style={{ fontWeight: "600", fontSize: 14, color: "#27232C", padding: scale(5) }}>{item?.servname}</Text>
                        <Text style={{ marginLeft: scale(6), alignSelf: "center", color: "black" }}>X</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    return (

        <FlatList
            data={Data}
            renderItem={renderserviceItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: scale(12), }}
        />
    )
}

export default ServiceList

const styles = StyleSheet.create({
    serviceList:
    {
        flexDirection: "row",
        marginHorizontal: scale(10),
        borderRadius: scale(15),
        paddingHorizontal: scale(6),
        // justifyContent:"space-around",
        // width:scale(70),
        backgroundColor: "#F0EEEB"
    }
})
import React, { Component } from 'react'

import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Ext from './Helper/Extension';

export default class ViewDetail extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const {data} = this.props.route.params
        return (
            <View style={style_detail.container}>
                <View style={style_detail.row}>
                    <Text style={style_detail.text_bold}>
                        ID TRANSAKSI: #{data.id}
                    </Text>
                </View>
                <View style={style_detail.row}>
                    <Text style={style_detail.text_bold}>
                        DETAIL TRANSAKSI
                    </Text>
                </View>
                 <View style={{flex: 1, borderColor: 'white', borderWidth: 15}}>
                     <Text style={style_detail.text_bold}>
                        {data.sender_bank} > {data.beneficiary_bank}
                    </Text>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 0.5, backgroundColor: 'white'}}>
                            <Text style={style_detail.text_bold_margin}>
                                {data.beneficiary_name}
                            </Text>
                            <Text style={style_detail.text_regular}>
                                {data.account_number}
                            </Text>
                            <Text style={style_detail.text_bold_margin}>
                                BERITA TRANSFER
                            </Text>
                            <Text style={style_detail.text_regular}>
                                {data.remark}r
                            </Text>
                            <Text style={style_detail.text_bold_margin}>
                                WAKTU DIBUAT
                            </Text>
                            <Text style={style_detail.text_regular}>
                                {Ext.DATE_FORMAT(data.created_at)}
                            </Text>
                        </View>    

                        <View style={{flex: 0.5, backgroundColor: 'white'}}>
                            <Text style={style_detail.text_bold_margin}>
                                NOMINAL
                            </Text>
                            <Text style={style_detail.text_regular}>
                                {"Rp" + Ext.CURRENCY_FORMAT(data.amount)}
                            </Text>
                            <Text style={style_detail.text_bold_margin}>
                                KODE UNIK
                            </Text>
                            <Text style={style_detail.text_regular}>
                                {data.unique_code}
                            </Text>
                        </View>   
                    </View>

                </View>
            </View>
        )
    }

}

const style_detail = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    row:{
        marginTop: 2,
        marginHorizontal: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 16,
        padding: 16
    },
    text_bold:{
        fontSize: 18,
        fontWeight: "bold",
    },
    text_bold_margin:{
        marginTop: 16,
        fontSize: 18,
        fontWeight: "bold",
    },
    text_regular:{
        fontSize: 18
    }
})

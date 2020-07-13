import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

//Module
import POP from './Modal/ModalSort';

export default class ViewList extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            dataJson: [],

            //Search
            searchText: "",
            dataFilter: []
        }
    }

    componentDidMount(){
        console.log('mounted!');
        fetch('https://nextar.flip.id/frontend-test')
        .then((response) => response.json())
        .then((responseJson) => {

            var arr = [];
            for(var i in responseJson){
                arr.push(responseJson[i]);
              }

            this.setState({
                isLoading: true,
                dataJson: arr
            })
        })
    }

    render(){
        let {dataJson, isLoading, dataFilter} = this.state
        return (
        <View style={style_list.container}>
            <View style={style_list.view_header}>
                <Icon name="ios-search" style={{ fontSize: 20 }} />
                <TextInput placeholder="Search" style={{ fontSize: 20, marginLeft: 15, width: 200 }} onChangeText={this.search}
  value={this.state.searchText}/>
                <Button title="Urutkan" style={{ marginLeft: 16 }} onPress={ () => this.refs.pop._showModal() }/>
            </View>
            
            <FlatList
                style={style_list.table}
                data={dataFilter.length > 0 ? dataFilter : dataJson}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <POP ref={'pop'}/>


        </View>
        );
    }

    //Render Cell
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this._didSelect(item)}>
                <View style={[(item.status=='SUCCESS') ? style_list.row_item_success : style_list.row_item_pending]}>
                    <View style={{flex: 0.6, padding:8, flexDirection: 'column'}}>
                        <Text style={{fontWeight: "bold", fontSize: 18}}>{item.sender_bank} > {item.beneficiary_bank}</Text>
                        <Text style={{fontWeight: '600'}}>{[(item.status=='SUCCESS') ? "" : "- "]}{item.beneficiary_name.toUpperCase()} </Text>
                        <Text style={{fontWeight: '600'}}>{"Rp" + item.amount + " " + item.created_at} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //DidSelect Item
    _didSelect(item) {
        console.log('Selected Item :',item);
        this.props.navigation.push('Detail');
    }

    //TextChanged
    search = (searchText) => {
        this.setState({searchText: searchText});
        let filteredData = this.state.dataJson.filter(function (item) {
          return item.beneficiary_name.toLowerCase().match(searchText.toLowerCase())
        });
        console.log(filteredData);
        this.setState({dataFilter: filteredData});
      };
}

const style_list = StyleSheet.create({
    container:{
        flex: 1,
    },
    view_header: {
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 10,
        height: 50, 
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    table:{
        marginVertical: 8
    },
    row_item_success: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        borderLeftWidth: 8,
        borderRadius: 10,
        height: 88,
        borderLeftColor: "green",
    },
    row_item_pending: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        borderLeftWidth: 8,
        borderRadius: 10,
        height: 88,
        borderLeftColor: "red",
    }
});
import React, { Component } from 'react'
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button
  } from "react-native";

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import FILTER from '../Helper/Filter'

const radio_props = [
    {label: 'URUTKAN', value: 0 },
    {label: 'Nama A-Z', value: 1 },
    {label: 'Nama Z-A', value: 2 },
    {label: 'Tanggal Terbaru', value: 3 },
    {label: 'Tanggal Terlama', value: 4 }
];

class ModalSort extends Component{
    constructor(props){
        super(props);
        this.state = {
            setModalVisible: false,
            value: 0
        }
    }
    render(){
        return (
            <Modal
            ref={"popup"}
            animationType="fade"
            transparent={true}
            visible={this.state.setModalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                    <RadioForm
                        radio_props={radio_props}
                        initial={this.state.value}
                        labelHorizontal={true}
                        buttonColor={'orange'}
                        selectedButtonColor={'orange'}
                        animation={true}
                        buttonWrapStyle={{margin: 10}}
                        onPress={(val) => {
                            let label = radio_props[val].label
                            let parent = this.props.parent;
                            if (val == 0){
                                parent.searchByFilter([], label);
                            }
                            else if (val == 1){
                                let filter = FILTER.SORT_BY_NAME(parent.state.dataJson);
                                parent.searchByFilter(filter, label);
                            }
                            else if (val == 2){
                                let filter = FILTER.SORT_BY_NAME(parent.state.dataJson);
                                parent.searchByFilter(filter.reverse(), label);
                            }
                            else if (val == 3){
                                let filter = FILTER.SORT_BY_DATE(parent.state.dataJson);
                                parent.searchByFilter(filter, label);
                            }
                            else if (val == 4){
                                let filter = FILTER.SORT_BY_DATE(parent.state.dataJson);
                                parent.searchByFilter(filter.reverse(), label);
                            }

                            this.setState({
                                value:val,
                                setModalVisible: false
                            })
                        }}
                    />


                    </View>
                </View>
            </Modal>
        );
    }
    //Action
    _showModal(){
        this.setState({
            setModalVisible: true
        })
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});

export default ModalSort;

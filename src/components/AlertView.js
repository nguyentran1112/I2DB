//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Modal, Dimensions} from 'react-native';
import {colors, img} from '../constants/index';
import LottieView from 'lottie-react-native';
import {ButtonSm} from '../components/index';

const {width, height} = Dimensions.get('window');
// create a component
const AlertView = props => {
  const closeAlert = bool => {
    props.changeAlert(bool);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.alertVisible}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={[styles.alerTitle, {color: props.color}]}>
              {props.title}
            </Text>
            <LottieView
              style={styles.lottieView}
              source={props.icon}
              autoPlay
              loop
            />
            <Text style={[styles.alerText, {color: props.color}]}>
              {props.messenge}
            </Text>
            <View style={styles.btn}>
              <ButtonSm
                onPress={() => {
                  closeAlert(false);
                }}
                haveIcon={false}
                borderWidth={'0'}
                color={colors.Neural100}
                haveTitle={true}
                title={'OK'}
                textColor={props.color}
                borderColor={colors.Neural100}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    zIndex: 1,
    flex: 1,
  },
  modal: {
    elevation: 4,
    shadowColor: colors.Neural80,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: 'center',
    alignSelf: 'center',
    width: width - 80,
    height: 248,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  alerTitle: {
    color: colors.accentColor,
    fontSize: 24,
    fontWeight: '800',
  },
  alerText: {
    color: colors.accentColor,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
  },
  lottieView: {
    width: 120,
    height: 120,
  },
  btn: {
    marginTop: 8,
    marginLeft: 14,
    display: 'flex',
    flexDirection: 'row',
    height: 56,
  },
});

//make this component available to the app
export default AlertView;

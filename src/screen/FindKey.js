import React, {useState, useContext} from 'react';
import {
  Stack,
  TextInput,
  Button,
  Box,
  AppBar,
} from '@react-native-material/core';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {colors, img} from '../constants';
import {AlertView} from '../components';
import {AppContext} from '../contexts/AppContext';
const FindKey = () => {
  const [listLeft, setListLeft] = useState([]);
  const [listRight, setListRight] = useState([]);
  const [txtLeft, setTxtLeft] = useState('');
  const [txtRight, setTxtRight] = useState('');
  const [txtClosure, setTxtClosure] = useState('');
  const [result1, setResult1] = useState([]);
  const [result2, setResult2] = useState([]);
  const [txtAttributes, setTxtAttributes] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [messenge, setMessenge] = useState({
    title: '',
    messenge: '',
    icon: null,
  });
  const changeAlert = bool => {
    setAlertVisible(bool);
  };
  const {
    cutString,
    miniCover,
    findChildren,
    findClosure,
    compareString,
    findKey,
    _miniCover,
  } = useContext(AppContext);
  //Các hàm chức năng trên UI
  const add = () => {
    if (txtLeft != '' && txtRight != '') {
      setResult1(`${txtLeft.toUpperCase()} ➔ ${txtRight.toUpperCase()}`);
    } else {
      setMessenge({
        title: 'Warning',
        messenge: 'Hãy nhập đầy đủ phụ thuộc hàm',
        icon: img.warn,
        color: '#FF8C00',
      });
      setAlertVisible(true);
    }
  };
  const _findKey = () => {
    if (txtAttributes != '' && result1.length > 0) {
      setResult2('');
      let key = [];
      key = findKey(
        txtAttributes.toUpperCase().split(','),
        txtLeft.toUpperCase().split(','),
        txtRight.toUpperCase().split(','),
      );
      for (let i = 0; i < key.length; i++) {
        setResult2(key[i].toString().toUpperCase());
      }
    } else {
      setMessenge({
        title: 'Warning',
        messenge: 'Chưa nhập PTH hoặc tập thuộc tính',
        icon: img.warn,
        color: '#FF8C00',
      });
      setAlertVisible(true);
    }
  };
  const reType = () => {
    setResult2([]);
    setResult1([]);
    setTxtRight('');
    setTxtLeft('');
    setTxtAttributes('');
    setTxtClosure('');
  };

  const findMiniCover = () => {
    if (result1.length > 0) {
      setResult2([]);
      const temp = miniCover(
        txtLeft.toUpperCase().split(','),
        txtRight.toUpperCase().split(','),
      );
      for (let i = 0; i < temp.funcDeRight.length; i++)
        setResult2(
          temp?.funcDeLeft[i]?.toUpperCase() +
            ' ➔ ' +
            temp?.funcDeRight[i]?.toUpperCase(),
        );
    }
  };
  //console.log(_miniCover)
  const _findClosure = () => {
    if (txtClosure != '' && result1.length > 0) {
      //console.log(typeof listRight)
      setMessenge({
        title: 'Success',
        messenge: `Bao đóng là ${findClosure(
          txtClosure,
          txtLeft.toUpperCase().split(','),
          txtRight.toUpperCase().split(','),
        ).toUpperCase()}`,
        icon: img.success,
        color: '#198754',
      });
      setAlertVisible(true);
    }
    else {
      setMessenge({
        title: 'Warning',
        messenge: 'Chưa nhập bao đống',
        icon: img.warn,
        color: '#FF8C00',
      });
      setAlertVisible(true);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.Primary50} barStyle="light-content" />
      <AppBar
        title="Hệ cơ sở dữ liệu"
        color={colors.Primary50}
        tintColor="white"
      />

      <ScrollView style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.textTitle}>Nhập vào</Text>
          <TextInput
            label="Phụ thuộc hàm trái"
            variant="outlined"
            style={{marginVertical: 8}}
            color={colors.Primary50}
            value={txtLeft}
            onChangeText={text => {
              setTxtLeft(text);
            }}
          />
          <TextInput
            label="Phụ thuộc hàm phải"
            variant="outlined"
            style={{marginBottom: 8}}
            color={colors.Primary50}
            value={txtRight}
            onChangeText={text => {
              setTxtRight(text);
            }}
          />
          <Button
            title="THÊM"
            style={{marginBottom: 8, height: 56, justifyContent: 'center'}}
            color={colors.Primary50}
            tintColor="white"
            titleStyle={{fontSize: 16}}
            onPress={() => add()}
          />
          <TextInput
            label="Tập thuộc tính"
            variant="outlined"
            style={{marginTop: 4}}
            color={colors.Primary50}
            value={txtAttributes}
            onChangeText={text => {
              setTxtAttributes(text);
            }}
          />
        </View>
        <View>
          <Text style={styles.textTitle}>Kết quả</Text>
          <Box
            w={'100%'}
            h={64}
            mt={8}
            mb={4}
            p={8}
            style={{
              backgroundColor: 'white',
              borderColor: colors.Primary50,
              borderWidth: 1,
            }}>
            <Text style={styles.outputText}>{result1}</Text>
          </Box>
          <Button
            title="NHẬP LẠI"
            style={{marginVertical: 8, height: 56, justifyContent: 'center'}}
            color={colors.Primary50}
            tintColor="white"
            titleStyle={{fontSize: 16}}
            onPress={() => reType()}
          />
          <Box
            w={'100%'}
            h={64}
            mt={20}
            p={8}
            style={{
              backgroundColor: 'white',
              borderColor: colors.Primary50,
              borderWidth: 1,
            }}>
            <Text style={styles.outputText}>{result2}</Text>
          </Box>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <Button
              title="TÌM KHÓA"
              style={{
                marginVertical: 8,
                width: 160,
                height: 56,
                justifyContent: 'center',
              }}
              color={colors.Primary50}
              tintColor="white"
              titleStyle={{fontSize: 16}}
              onPress={() => _findKey()}
            />
            <Button
              title="PHỤ TỐI THIỂU"
              style={{
                marginVertical: 8,
                width: 160,
                height: 56,
                justifyContent: 'center',
              }}
              color={colors.Primary50}
              tintColor="white"
              titleStyle={{fontSize: 16}}
              onPress={() => findMiniCover()}
            />
          </View>
          <View style={styles.function}>
            <TextInput
              label="Nhập bao đóng"
              variant="outlined"
              style={{marginBottom: 8, marginTop: 8}}
              color={colors.Primary50}
              value={txtClosure}
              onChangeText={text => {
                setTxtClosure(text);
              }}
            />
            <Button
              title="Tìm bao đóng"
              style={{marginBottom: 8, height: 56, justifyContent: 'center'}}
              color={colors.Primary50}
              tintColor="white"
              titleStyle={{fontSize: 16}}
              onPress={() => _findClosure()}
            />
          </View>
        </View>
        {alertVisible ? (
          <AlertView
            changeAlert={changeAlert}
            title={messenge.title}
            messenge={messenge.messenge}
            alertVisible={alertVisible}
            icon={messenge.icon}
            color={messenge.color}
          />
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white'
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  outputText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  function: {
    marginTop: 20,
    marginBottom: 32,
  },
  textTitle: {
    fontSize: 18,
    color: colors.accentColor,
    fontWeight: '800',
  },
});

export default FindKey;

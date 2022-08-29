import React from 'react';
import {createContext, useEffect, useState} from 'react';

export const AppContext = createContext({});

const AppContextProvider = ({children}) => {
  //const [funcDeRight, setFuncDeRight] = useState([]); //Phụ thuộc hàm bên phải
  const [funcDeLeft, setFuncDeLeft] = useState([]); //Phụ thuộc hàm bên trái
  const [closure, setClosure] = useState(''); //Bao đóng cần tìm
  const [n, setN] = useState(0); // Số phụ thuộc hàm
  const [_miniCover, setMiniCover] = useState({
    funcDeRight: [],
    funcDeLeft: [],
  });
  //Hàm tìm bao đóng
  const findClosure = (closure, funcDeLeft, funcDeRight) => {
    let lengthClosure = closure.length - 1;
    while (lengthClosure != closure.length) {
      lengthClosure = closure.length;
      for (var i = 0; i < funcDeLeft.length; i++) {
        if (compareString(funcDeLeft[i], closure)) {
          for (let j = 0; j < funcDeRight[i].length; j++)
            if (!compareString(funcDeRight[i][j].toString(), closure))
              closure += funcDeRight[i][j].toString();
        }
      }
    }
    return closure;
  };

  //Hàm so sánh chuỗi
  const compareString = (stringChildren, stringParent) => {
    let StringChildren = 0;
    if (
      typeof stringChildren != "undefined" &&
      typeof stringParent != "undefined"
    ) {
      if (stringParent.length < stringChildren.length) {
        return false;
      }
      for (let i = 0; i < stringChildren.length; i++) {
        for (let j = 0; j < stringParent.length; j++) {
          if (stringChildren[i] == stringParent[j]) {
            StringChildren++;
            break;
          }
        }
        if (StringChildren == stringChildren?.length) {
          return true;
        }
      }
    }
    return false;
  };
  const __compareString = (arr1, arr2) => {
    let intersection = arr1.filter(x => arr2.includes(x));
    return intersection;
  };
  const _compareString = (arr1, arr2) => {
    let difference = arr1.filter(x => !arr2.includes(x));
    return difference;
  };
  const compareStringBool = (arr1, arr2) => {
    let intersection = arr1.filter(x => arr2.includes(x));
    if (intersection != '') {
      return true;
    }
    return false;
  };
  //Hàm tìm khóa
  const findKey = (attributes, funcDeLeft, funcDeRight) => {
    let listKey = [];
    let L = '';
    let R = '';
    let TN = '';
    let TG = '';
    let x = 1;
    let y = 0;

    //Lấy tập L(chỉ xuất hiện ở VT)
    // for (let i = 0; i < attributes.length; i++) {
    //   for (let t = 0; t < funcDeLeft.length; t++) {
    //     if (
    //       compareString(attributes[i].toString(), funcDeLeft[t]) &&
    //       !compareString(attributes[i].toString(), funcDeRight[t])
    //     ) {
    //       L += attributes[i].toString();
    //       break;
    //     }
    //   }
    // }
    L = _compareString(funcDeLeft, funcDeRight);
    //console.log(attributes)
    L = __compareString(attributes, L);
    //console.log(L)

    // while (x != 0) {
    //   if (funcDeLeft.length >= funcDeRight.length) {
    //     if (y > funcDeLeft.length) {
    //       x = 0;
    //       break;
    //     }
    //     if (y < funcDeRight.length) {
    //       if (
    //         compareString(attributes[y].toString(), funcDeLeft[y].toString()) &&
    //         !compareString(attributes[y].toString(), funcDeRight[y].toString())
    //       ) {
    //         L += attributes[y].toString();
    //       }
    //     } else {
    //       if (
    //         compareString(attributes[y].toString(), funcDeLeft[y].toString())
    //       ) {
    //         L += attributes[y].toString();
    //       }
    //     }
    //     y++;
    //   } else if (funcDeLeft.length < funcDeRight.length) {
    //     if (y > funcDeRight.length) {
    //       x = 0;
    //       break;
    //     }
    //     if (y < funcDeLeft.length) {
    //       if (
    //         compareString(attributes[y].toString(), funcDeLeft[y].toString()) &&
    //         !compareString(attributes[y].toString(), funcDeRight[y].toString())
    //       ) {
    //         L += attributes[y].toString();
    //       }
    //     } else {
    //       if (
    //         compareString(attributes[y].toString(), funcDeLeft[y].toString())
    //       ) {
    //         L += attributes[y].toString();
    //       }
    //     }
    //     y++;
    //   }
    // }
    R = _compareString(funcDeRight, funcDeLeft);
    R = __compareString(attributes, R);
    //lấy tập R (chỉ xuất hiện vế phải, ko xh vế trái)
    // for (let i = 0; i < attributes.length; i++) {
    //   for (let t = 0; t < funcDeLeft.length; t++)
    //     if (
    //       compareString(attributes[i].toString(), funcDeRight[t]) &&
    //       !compareString(attributes[i].toString(), funcDeLeft[t])
    //     ) {
    //       R += attributes[i].toString();
    //       break;
    //     }
    // }
    // /*lấy TN thuộc tính chỉ xuất hiện ở vế trái, không xuất hiện ở vế phải và
    //  * các thuộc tính không xuất hiện ở cả vế trái và vế phải của F*/
    for (let i = 0; i < attributes.length; i++) {
      if (!compareString(attributes[i].toString(), R)) {
        TN += attributes[i].toString();
      }
    }

    // //lấy TG (giao giữa 2 tập L và R)
    for (let i = 0; i < L.length; i++) {
      if (compareString(L[i].toString(), R)) {
        TG += L[i].toString();
      }
    }
    //TG = __compareString(L,R)
    // //nếu tập TG rỗng thì khóa chính là TN
    if (TG == '') {
      listKey.push(TN);
      return listKey;
    } else {
      let listChildrenTG = [];
      //sinh tập con của TG
      listChildrenTG = findChildren(TG); //
      let superLock = [];

      //kiểm tra từng tập con của TG hợp với TN có là siêu khóa không
      for (let n = 0; n < listChildrenTG.length; n++) {
        //lấy giao tập nguồn(TN) và từng con của TG
        let temp = TN + listChildrenTG[n];
        //nếu giao tập nguồn(TN) và từng con của TG tất cả lấy bao đóng mà bằng tập thuộc tính thì là siêu khóa
        if (
          compareString(attributes, findClosure(temp, funcDeLeft, funcDeRight))
        ) {
          superLock.push(temp);
        }
      }

      //tìm siêu khóa tối thiểu
      for (let i = 0; i < superLock.Count; i++) {
        for (let j = i + 1; j < superLock.length; j++) {
          if (compareString(superLock[i], superLock[j])) {
            superLock.remove(superLock[j]);
            j--;
          }
        }
      }
      listKey = superLock;
    }
    return listKey;
  };
  const findChildren = str => {
    let listChildren = [];
    let a = new Array(str.length);
    for (let i = 0; i < a.length; i++) {
      a[i] = 0;
    }

    let t = str.length - 1;

    listChildren.push('');
    while (t >= 0) {
      t = str.length - 1;
      while (t >= 0 && a[t] == 1) t--;

      if (t >= 0) {
        a[t] = 1;
        for (let i = t + 1; i < str.length; i++) a[i] = 0;

        let temp = '';
        for (let i = 0; i < str.length; i++) {
          if (a[i] == 1) {
            temp += str[i];
          }
        }
        listChildren.push(temp);
      }
    }

    return listChildren;
  };

  const miniCover = (funcDeLeft, funcDeRight) => {
    let temObj = {
      funcDeLeft: [],
      funcDeRight: [],
    };
    let n = funcDeRight.length;
    //tách phụ thuộc hàm vế phải có hơn 1 thuộc tính
    for (let i = 0; i < n; i++) {
      if (funcDeRight[i].length > 1) {
        var tempRight = funcDeRight[i];
        var tempLeft = funcDeLeft[i];
        funcDeLeft.remove(funcDeLeft[i]);
        funcDeRight.remove(funcDeRight[i]);
        for (let j = 0; j < tempRight.length; j++) {
          funcDeLeft.push(tempLeft);
          funcDeRight.push(tempRight[j].toString());
        }
        i--;
      }
    }

    //loại bỏ thuộc tính dư thừa bên vế trái có hơn 1 thuộc tính
    for (let i = 0; i < funcDeLeft.length; i++) {
      if (funcDeLeft[i].length > 1) {
        for (let j = 0; j < funcDeLeft[i].length; j++) {
          if (funcDeLeft[i].length > 1) {
            let temp = funcDeLeft[i];
            temp = cutString(temp, j);
            if (
              compareString(
                funcDeRight[i],
                findClosure(temp, funcDeLeft, funcDeRight),
              )
            ) {
              funcDeLeft[i] = temp;
              j--;
            }
          }
        }
      }
    }
    //loại bỏ thuộc tính dư thừa
    let _tempRight = [];
    let _tempLeft = [];
    //console.log('test0',funcDeLeft)

    for (let i = 0; i < funcDeLeft.length; i++) {
      _tempLeft.push(funcDeLeft[i]);
      _tempRight.push(funcDeRight[i]);
    }
    for (let i = 0; i < funcDeLeft.length; i++) {
      //_tempLeft.RemoveAt(i);
      delete _tempLeft[i];
      //_tempRight.RemoveAt(i);
      delete _tempRight[i];
      console.log('test1', funcDeRight.length, i, typeof funcDeRight[1]);
      if (
        compareString(
          funcDeRight[i],
          findClosure(funcDeLeft[i], _tempLeft, _tempRight),
        )
      ) {
        funcDeLeft = [];
        funcDeRight = [];

        for (let t = 0; t < _tempLeft.length; t++) {
          funcDeLeft.push(_tempLeft[t]);
          funcDeRight.push(_tempRight[t]);
          console.log(funcDeLeft, funcDeRight)
        }
        i--;
      } else {
        _tempRight = [];
        _tempLeft = [];

        for (let t = 0; t < funcDeLeft.length; t++) {
          _tempLeft.push(funcDeLeft[t]);
          _tempRight.push(funcDeRight[t]);
        }
      }
    }
    temObj.funcDeLeft = funcDeLeft;
    temObj.funcDeRight = funcDeRight;
    return temObj;
  };
  const cutString = (str, index) => {
    let condition = '';
    for (let i = 0; i < str.length; i++) {
      if (index != i) condition += str[i].toString();
    }
    return condition;
  };
  const appContextData = {
    cutString,
    miniCover,
    findChildren,
    findClosure,
    compareString,
    findKey,
    setMiniCover,
    _miniCover,
  };
  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};
export default AppContextProvider;

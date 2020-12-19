import * as React from "react";
import { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation, route }) {
  const [priceFinal, setPriceFinal] = useState("0.00");
  const [inputError, setInputError] = useState("");

  const [history, setHistory] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [oPrice, setOPrice] = useState("");
  const [dPercentage, setDPercentage] = useState("");
  const [amountSaved, setAmountSaved] = useState("0.00");

  const calculateDiscount = () => {
    if (oPrice != "" && dPercentage != "") {
      if (dPercentage <= 100 && oPrice >= 0 && dPercentage >= 0) {
        var saved = (oPrice * dPercentage) / 100;
        var final_Price = oPrice - saved;
        setAmountSaved(saved.toFixed(2));
        setPriceFinal(final_Price.toFixed(2));
        setInputError("");
      } else if (dPercentage > 100) {
        setInputError("Discount cannot be greater than 100%");
      } else if (oPrice < 0) {
        setInputError("Product Price must be greater than 0");
      } else if (dPercentage < 0) {
        setInputError("Discount must be greater than 0");
      }
    } else {
      setInputError("Empty Field(s) Found!");
    }
  };

  const saveResult = () => {
    if (oPrice != "" || dPercentage != "") {
      const resultObj = {
        id: Math.random().toString(),
        oPrice,
        dPercentage,
        priceFinal,
      };

      setHistory((oldHistory) => [...oldHistory, resultObj]);
      setOPrice("");
      setDPercentage("");
      setBtnDisabled(true);
      setPriceFinal("0.00");
      setAmountSaved("0.00");
    }
  };

  return (
    <View style={styles.container}>   
      <Text style={[styles.heading]}>Discount Calculator</Text>
      
      <View style={{ marginTop: 100 }} />

      <View style={styles.dFlux}>
        <TextInput
          keyboardType={"number-pad"}
          value={oPrice}
          onChangeText={(orgPrice) => {
            orgPrice == "" || dPercentage == ""
              ? setBtnDisabled(true)
              : setBtnDisabled(false);
            setOPrice(orgPrice);
          }}
          style={styles.textFields}
          placeholder={"Original Price"}
          placeholderTextColor="#b5c1c6"
        />
        <TextInput
          value={dPercentage}
          keyboardType={"number-pad"}
          onChangeText={(discountPercentage) => {
            discountPercentage == "" || oPrice == ""
              ? setBtnDisabled(true)
              : setBtnDisabled(false);
            setDPercentage(discountPercentage);
          }}
          style={[styles.textFields, styles.ml10]}
          placeholder={"Discount %"}
          placeholderTextColor="#b5c1c6"
        />
      </View>
      <View style={{ paddingTop: 20 }} />

      <TouchableOpacity
        onPress={() => calculateDiscount()}
        style={styles.calcBtn}
      >
        <Text style={styles.calcBtnText}>
        <i className="fa fa-user"></i>
        Calculate
        </Text>
      </TouchableOpacity>

      <View style={{ paddingTop: 60 }} />

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.resultText}>You Saved :</Text>
        <Text style={styles.priceText}>
          {" "}
          Rs {amountSaved}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.resultText}>Final Price :</Text>
        <Text style={styles.priceText}> Rs {priceFinal}</Text>
      </View>

      <Text style={{ fontSize: 15, color: "#E74C3C" }}>{inputError}</Text>

      <View style={{ paddingTop: 20 }} />

      <View style={styles.dFlux}>
        <TouchableOpacity
          disabled={btnDisabled}
          onPress={() => saveResult()}
          style={[styles.secBtn, !btnDisabled ? styles.blueBorder : {}]}
        >
          <Text style={[styles.btnText, !btnDisabled ? styles.blueText : {}]}>Save Result</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("History", {
              historyObject: history,
            })
          }
          style={[styles.secBtn, styles.blueBorder]}
        >
          <Text style={[styles.btnText, styles.blueText]}>View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  ml10:{
    marginLeft: 10
  },
  heading: {
    color: "white",
    fontSize: 20,
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    width: '100%',
    textAlign: 'center',
    fontWeight: "500",
  },
  dFlux: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textFields: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: "45%",
    height: 40,
    textAlign: "center",
    color: "black",
  },
  calcBtn: {
    height: 50,
    width: "92%",
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 2,
  },
  calcBtnText: {
    fontSize: 20,
    color: "white",
  },
  secBtn: {
    height: 40,
    width: 100,
    marginRight: 10,
    borderColor: 'grey',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  blueBorder: {
    borderColor: "#4285F4",
  },
  blueText: {
    color: "#4285F4",
  },
  btnText: {
    fontSize: 13,
    color: 'grey'
  },
  resultText: {
    fontSize: 25,
    color: "grey",
  },
  priceText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});

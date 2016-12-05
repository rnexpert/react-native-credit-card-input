import React, { Component, PropTypes } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import Icons from "./Icons";
import FlipCard from "react-native-flip-card";

const s = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 190,
  },
  cardFace: {
    width: 300,
    height: 190,
  },
  placeholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  baseText: {
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "transparent",
  },
  number: {
    fontSize: 21,
    position: "absolute",
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 14,
    position: "absolute",
    top: 75,
    right: 30,
  },
  cvc: {
    fontSize: 14,
    position: "absolute",
    top: 80,
    right: 30,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      number: "•••• •••• •••• ••••",
      name: "FULL NAME",
      expiry: "••/••",
      cvc: "•••",
    },

    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };

  render() {
    const { focused,
      brand, name, number, expiry, cvc,
      placeholder, imageFront, imageBack } = this.props;

    const isAmex = brand === "american-express";
    const shouldFlip = !isAmex && focused === "cvc";

    return (
      <View style={[s.cardContainer]}>
        <FlipCard style={{ borderWidth: 0 }}
            flipHorizontal
            flipVertical={false}
            friction={10}
            perspective={2000}
            clickable={false}
            flip={shouldFlip}>
          <Image style={[s.cardFace]}
              source={imageFront}>
              <Image style={[s.icon]}
                  source={{ uri: Icons[brand] }} />
              <Text style={[s.baseText, s.number, !number && s.placeholder]}>
                { !number ? placeholder.number : number }
              </Text>
              <Text style={[s.baseText, s.name, !name && s.placeholder]}
                  numberOfLines={1}>
                { !name ? placeholder.name : name.toUpperCase() }
              </Text>
              <Text style={[s.baseText, s.expiryLabel, s.placeholder]}>
                MONTH/YEAR
              </Text>
              <Text style={[s.baseText, s.expiry, !expiry && s.placeholder]}>
                { !expiry ? placeholder.expiry : expiry }
              </Text>
              { isAmex &&
                  <Text style={[s.baseText, s.amexCVC, !cvc && s.placeholder]}>
                    { !cvc ? placeholder.cvc : cvc }
                  </Text> }
          </Image>
          <Image style={[s.cardFace]}
              source={imageBack}>
              <Text style={[s.baseText, s.cvc, !cvc && s.placeholder]}>
                { !cvc ? placeholder.cvc : cvc }
              </Text>
          </Image>
        </FlipCard>
      </View>
    );
  }
}

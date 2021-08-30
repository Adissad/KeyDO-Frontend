import React, { useState } from "react";
import {View, StyleSheet, Text, Dimensions, KeyboardAvoidingView, Platform} from "react-native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient"; 

import { connect } from "react-redux";
import PROXY from "../proxy";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ConnexionScreen(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [userCity, setUserCity] = useState("");
  const [selectMusic, setSelectMusic] = useState([]);
  const [selectInterest, setselectInterest] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState([]);


  // Envoi des informations utilisateurs au backend

  var handleSubmitSignup = async () => {

    const data = await fetch(`${PROXY}/users/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
    });

    const body = await data.json();

    if(body.result == true){
    props.addToken(body.token);
    console.log("sign up token", body.token);
    setUserExists(true);

  } else {
    setSignUpErrors(body.error);
  }

  if(userExists) {
    props.navigation.navigate('Profile', {name:signUpUsername});
  }
};


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF8ABD", "#EF7365"]}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 0.25,
          y: 0.25,
        }}
        style={styles.box}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >

            {/* Reconnexion */}
            <View style={{
                fontSize: 28,
                marginTop: (1 / 22) * windowHeight,
                marginLeft: (5 / 8) * windowWidth,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"}}>
              <Button
                onPress={() => {
                  props.navigation.navigate("SignIn");
                }}
                buttonStyle={{ backgroundColor: "#EF7365", 
                title:"clear button",
                type:"clear" }}
                title="Reconnexion"
              />
            </View>

          <View
            style={{
              marginTop: (1 / 20) * windowHeight,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "auto",
            }}
          >

            <Text style={{ color: "#FFFFFF", fontSize: 20 }}>
              Créer un compte
            </Text>
          </View>

          <View
            style={{
              marginTop: (1 / 12) * windowHeight,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              height: "auto",
            }}
          >
            {/* Connexion streaming */}
            <FontAwesome
              name="spotify"
              size={60}
              color="#1DB954"
              onPress={() => {
                props.navigation.navigate("Spotify");
              }}
            />
            <Fontisto
              name="applemusic"
              size={50}
              color="#FC3C44"
              onPress={() => {
                props.navigation.navigate("Apple");
              }}
            />
          </View>

          <View
            style={{
              marginTop: (1 / 8) * windowHeight,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={styles.separator}></View>
            <Text> OR </Text>
            <View style={styles.separator}></View>
          </View>

          <View
            style={{
              marginTop: (1 / 10) * windowHeight,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Formulaire d'inscription */}
            <Input
              onChangeText={(value) => setSignUpUsername(value)}
              value={signUpUsername}
              style={{ paddingLeft: 20 }}
              placeholder="Nom"
              placeholderTextColor="white"
              color="white"
            />

            <Input
              onChangeText={(value) => setSignUpEmail(value)}
              value={signUpEmail}
              style={{ paddingLeft: 20 }}
              placeholder="Email"
              placeholderTextColor="white"
              color="white"
            />

            <Input
              onChangeText={(value) => setSignUpPassword(value)}
              value={signUpPassword}
              style={{ paddingLeft: 20 }}
              placeholder="Mot de passe"
              secureTextEntry={true}
              placeholderTextColor="white"
              color="white"
            />
          </View>

          <View
            style={{
              marginTop: (1 / 35) * windowHeight,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >

          <Button
            onPress={() => { if(signUpUsername && signUpEmail && signUpPassword) {handleSubmitSignup()} }}
            buttonStyle={{backgroundColor: '#CF779E'}}
            title='Inscription'
          />

          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    letterSpacing: 0,
    lineHeight: 1.2,
    justifyContent: "center",
  },

  box: {
    flex: 1,
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  separator: {
    height: 1,
    width: (1 / 5) * Dimensions.get("window").width,
    backgroundColor: "black",
  },
});


// Redux

function mapStateToProps(state) {
  // console.log('hi', state);
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", addToken: token });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnexionScreen);

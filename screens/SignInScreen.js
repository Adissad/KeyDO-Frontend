import React, { useState } from "react";
import {View, StyleSheet, Text, Dimensions, KeyboardAvoidingView, Platform} from "react-native";
import { Input, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import { connect } from "react-redux";
import PROXY from "../proxy";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SignInScreen(props) {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [listErrorsSignin, setErrorsSignin] = useState([]);
    const [userExists, setUserExists] = useState(false);
  
    const [signInErrors, setSignInErrors] = useState([]);

    var handleSubmitSignin = async () => {

      const signInData = await fetch(`${PROXY}/users/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `email=${signInEmail}&password=${signInPassword}`
      });
  
      const signInBody = await signInData.json();
  
      if(signInBody.result == true){
        props.addToken(signInBody.token);
        setUserExists(true);
  
      } else {
        setSignInErrors(signInBody.error);
      }
  
      if(userExists) {
        props.navigation.navigate('Home');
      }
  
      // console.log(` USER "${signInBody.token}" `);
    };
  
    var tabErrorsSignIn = signInErrors.map((error,i) => {
      return(<Text key={i} >{error}</Text>)
    })
  

     
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

            <View
            style={{
              marginTop: (1 / 3) * windowHeight,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Input
              onChangeText={(value) => setSignInEmail(value)}
              value={signInEmail}
              style={{ paddingLeft: 20 }}
              placeholder="Email"
              placeholderTextColor="white"
              color="white"
            />

            <Input
              onChangeText={(value) => setSignInPassword(value)}
              value={signInPassword}
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

          {tabErrorsSignIn}

            <Button
              onPress={() => { if(signInEmail && signInPassword) {handleSubmitSignin()} }}
              buttonStyle={{ backgroundColor: "#CF779E" }}
              title="Connexion"
            />

          </View>

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
      
      export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

      // let signIn = async () => {

      //   const signInData = await fetch('http://192.168.1.56:3000/users/sign-in', {
      //     method: 'POST',
      //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //     body: `email=${signInEmail}&password=${signInPassword}`
      //   });
    
      //   const signInBody = await signInData.json();
    
      //   if(signInBody.result == true){
      //     props.addToken(signInBody.token);
      //     setUserExists(true);
    
      //   } else {
      //     setSignInErrors(signInBody.error);
      //   }
    
      //   if(userExists) {
      //     props.navigation.navigate('BottomNavigator');
      //   }
    
      //   console.log(`[SIGN IN] USER "${signInBody.token}" LOGGED IN`);
      // };
    
      // let tabErrorsSignIn = signInErrors.map((error,i) => {
      //   return(<Text key={i} >{error}</Text>)
      // })
    
      // let tabErrorsSignUp = signUpErrors.map((error,i) => {
      //   return(<Text key={i} >{error}</Text>)
      // })
      
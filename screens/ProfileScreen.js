import React, { useState } from "react";
import {View, StyleSheet, Dimensions, Button, Image, ScrollView, TouchableOpacity} from "react-native";
import { Input } from "react-native-elements"; 
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient"; 
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons"; 
import PROXY from "../proxy";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ProfileScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState(props.route.params.name);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [myAvatar, setMyAvatar] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [userCity, setUserCity] = useState("");
  const [selected, setSelected] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [valueMusic, setValueMusic] = useState([]);
  const [openMusic, setOpenMusic] = useState(false);
  // Liste des genres musicaux
  const [selectMusic, setSelectMusic] = useState([
    { label: "Dance", value: "dance" },
    { label: "RnB", value: "rnb" },
    { label: "Hip-hop", value: "hip-hop" },
    { label: "Latino", value: "latino" },
    { label: "Jazz", value: "jazz" },
    { label: "Soul", value: "soul" },
    { label: "Rock", value: "rock" },
    { label: "Classique", value: "classique" },
    { label: "Reggae/ Dancehall", value: "reggae/ dancehall" },
    { label: "Pop", value: "pop" },
    { label: "Variété française", value: "variété française" },
    { label: "Métal", value: "métal" },
    { label: "Funk", value: "funk" },
    { label: "Folk Acoustique", value: "folk acoustique" },
    { label: "Blues", value: "blues" },
    { label: "Country", value: "country" },
    { label: "Afro beat", value: "afro beat" },
    { label: "Décennies", value: "décennies" },
    { label: "Gospel", value: "gospel" },
  ]);

  const [valueInterest, setValueInterest] = useState([]);
  const [openInterest, setOpenInterest] = useState(false);

  // Liste des centres d intérets
  const [selectInterest, setselectInterest] = useState([
    { label: "Voyages", value: "voyages" },
    { label: "Musées", value: "musées" },
    { label: "Sport", value: "Sport" },
    { label: "Gaming", value: "gaming" },
    { label: "Littérature", value: "littérature" },
    { label: "Activités manuelles", value: "activités manuelles" },
    { label: "Histoire", value: "histoire" },
    { label: "Art", value: "art" },
    { label: "Photographie", value: "photographie" },
    { label: "Théâtre", value: "théâtre" },
    { label: "Cuisine", value: "cuisine" },
    { label: "Danse", value: "danse" },
  ]);

  // console.log("token ok props",props.token);
  var selection = async (token) => {
    // console.log("funtion token", token)

    const musicToBack = JSON.stringify(valueMusic);
    const interestToBack = JSON.stringify(valueInterest);

    // Mise à jour des données au backend
    const data = await fetch(`${PROXY}/users/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&avatar=${myAvatar}&name=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}&age=${selectedAge}&gender=${selectedGender}&city=${userCity}&music=${musicToBack}&interest=${interestToBack}`,
    });

    const body = await data.json();
  };

  // console.log("coucou", props.route.params.name);
  // console.log("re", signUpUsername);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2464A2", "#693192"]}
        start={{
          x: 0,
          y: 0.25,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
        locations={[0, 0.7]}
        style={styles.box}
      >
        <TouchableOpacity>
          <Ionicons
            name="ios-settings-outline"
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
            size={24}
            color="#FFFFFF"
            style={{
              marginTop: (1 / 16) * windowHeight,
              marginLeft: (7 / 8) * windowWidth,
            }}
          />
        </TouchableOpacity>


         {/* Avatar */}
        <View
          style={{
            marginTop: (1 / 20) * windowHeight,
            marginRight: (1 / 2) * windowWidth,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            height: "auto",
          }}
        >
         
          <Image
            rounded
            source={require("../assets/pinguin.png")}
            activeOpacity={0.7}
            width={20}
            height={20}
          />

          <Button
            buttonStyle={{ backgroundColor: "#693192" }}
            title="Choisis ton avatar"
            onPress={toggleModal}
          />

          {/* Modal liste des avatars */}
          <Modal isVisible={isModalVisible}>
            <ScrollView style={styles.scrollView}>
              <TouchableOpacity
                onPress={(item) => {
                  setMyAvatar(myAvatar);
                  // console.log('selected avatar', item);
                  // console.log('ok selected avatar', setMyAvatar);
                }}
              >
                <Image
                  rounded
                  source={require("../assets/woman.png")}
                  activeOpacity={0.7}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  rounded
                  source={require("../assets/man.png")}
                  activeOpacity={0.7}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  rounded
                  source={require("../assets/pinguin.png")}
                  activeOpacity={0.7}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  rounded
                  source={require("../assets/dog.png")}
                  activeOpacity={0.7}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  rounded
                  source={require("../assets/rabbit.png")}
                  activeOpacity={0.7}
                  width={20}
                  height={20}
                />
              </TouchableOpacity>


              <Button title="Terminé" onPress={toggleModal} />
            </ScrollView>
          </Modal>
        </View>

        {/* Formulaire mise à jour des informations utilisateurs */}
        <View>
          <Input
            placeholder={props.route.params.name}
            onChangeText={(value) => setSignUpUsername(value)}
            value={signUpUsername}
            placeholderTextColor="white"
            color="white"
          />
          <Input
            placeholder="Ville"
            placeholderTextColor="white"
            color="white"
            onChangeText={(value) => setUserCity(value)}
            value={userCity}
          />

          {/* Sélection âge */}
          <View style={{ flexDirection: "row" }}>
            <Picker
              selectedValue={selectedAge}
              style={{
                marginLeft: 30,
                width: 150,
                color: "#FFFFFF",
                backgroundColor: "#FFFFFF11",
                borderRadius: 8,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedAge(itemValue)
              }
            >
              <Picker.Item label="Age" value="age" />
              <Picker.Item label="18 ans" value="18 ans" />
              <Picker.Item label="19 ans" value="19 ans" />
              <Picker.Item label="20 ans" value="20 ans" />
              <Picker.Item label="21 ans" value="21 ans" />
              <Picker.Item label="22 ans" value="22 ans" />
              <Picker.Item label="23 ans" value="23 ans" />
              <Picker.Item label="24 ans" value="24 ans" />
              <Picker.Item label="25 ans" value="25 ans" />
              <Picker.Item label="26 ans" value="26 ans" />
              <Picker.Item label="27 ans" value="27 ans" />
              <Picker.Item label="28 ans" value="28 ans" />
              <Picker.Item label="29 ans" value="29 ans" />
              <Picker.Item label="30 ans" value="30 ans" />
              <Picker.Item label="31 ans" value="31 ans" />
              <Picker.Item label="32 ans" value="32 ans" />
              <Picker.Item label="33 ans" value="33 ans" />
              <Picker.Item label="34 ans" value="34 ans" />
              <Picker.Item label="35 ans" value="35 ans" />
              <Picker.Item label="36 ans" value="36 ans" />
              <Picker.Item label="37 ans" value="37 ans" />
              <Picker.Item label="38 ans" value="38 ans" />
              <Picker.Item label="39 ans" value="39 ans" />
              <Picker.Item label="40 ans" value="40 ans" />
            </Picker>

            {/* Sélection genre */}
            <Picker
              selectedValue={selectedGender}
              style={{
                marginLeft: 60,
                width: 150,
                color: "#FFFFFF",
                backgroundColor: "#FFFFFF11",
                borderRadius: 8,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGender(itemValue)
              }
            >
              <Picker.Item label="Genre" value="genre" />
              <Picker.Item label="Femme" value="femme" />
              <Picker.Item label="Homme" value="homme" />
            </Picker>
          </View>
        </View>

       {/* Sélection genres musicaux */}
        <View
          style={{
            marginTop: (1 / 16) * windowHeight,
            flexDirection: "row",
            width: "80%",
            // height: "auto",
            // zIndex: 1,
            marginLeft: 40,
            
          }}
        >
          <DropDownPicker
            placeholder="Choisis tes 5 genres de musiques favoris"
            selected_items_count_text="{count} genre(s) ont été sélectionnés"
            multiple={true}
            min={0}
            max={5}
            // dropDownDirection="top"
            open={openMusic}
            value={valueMusic}
            items={selectMusic}
            setOpen={() => setOpenMusic(!openMusic)}
            setValue={setValueMusic}
            setItems={setSelectMusic}
            onChange={(item) => {
              setValueMusic(item);
              // console.log("selected music", item);
            }}
            renderItem={(item) => _renderItem(item)}
          />
        </View>

        {/* Sélection centres d'intérêts */}
        <View
          style={{
            marginTop: (1 / 8) * windowHeight,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            height: "auto",
            marginLeft: 40,
          }}
        >
          <DropDownPicker
            placeholder="Choisis tes 3 centres d'intérêts"
            multiple={true}
            min={0}
            max={3}
            open={openInterest}
            value={valueInterest}
            items={selectInterest}
            setOpen={() => setOpenInterest(!openInterest)}
            setValue={setValueInterest}
            setItems={setselectInterest}
            onChange={(item) => {
              setValueInterest(item);
              // console.log("selected interest", item);
              
            }}
            renderItem={(item) => _renderItem(item)}
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
            onPress={() => {
              selection(props.token),
                props.navigation.navigate("BottomNavigator");
            }}
            buttonStyle={{ backgroundColor: "#CF779E" }}
            title="Valider"
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

  scrollView: {
    backgroundColor: "#693192",
    marginHorizontal: 20,
  },
});


// Redux

function mapStateToProps(state) {
  //console.log('hi', state);
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({
        type: "addToken",
        addToken: token,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { heroReducer, updateHero } from "@redux";
import { colors, fonts } from "@assets";
import { MOCK_USER } from "@mocks";

export class UnconnectedEditProfileScreen extends React.PureComponent {
  // state = {
  //   name: MOCK_USER.name,
  //   lastName: MOCK_USER.lastName,
  //   heroName: MOCK_USER.heroName,
  //   bio: MOCK_USER.bio,
  // };

  onChangeText = inputName => inputValue => {

    this.props.updateHero({ [inputName]: inputValue });
  };

  onSubmit = async () => {
    // TODO:
    const { name, lastName, heroReducer, bio } = this.state;
    const { updateHero } = this.props;

    // loading state ON

    const newUserAttributes = {
      name,
      lastName,
      heroName,
      bio,
    };

    updateHero(newUserAttributes);

    // loading state OFF
  };

  render() {
    const { name, lastName, heroName, bio } = this.props;

    const { heroReducer, updateHero } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={this.onChangeText("name")}
        />
        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={this.onChangeText("lastName")}
        />
        <TextInput
          style={styles.textInput}
          value={heroName}
          onChangeText={this.onChangeText("heroName")}
        />
        <TextInput
          multiline
          style={styles.textInput}
          value={bio}
          onChangeText={this.onChangeText("bio")}
        />

        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "red",
          }}
          onPress={this.onSubmit}
        >
          <Text
            style={{
              color: colors.textPrimary,
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

export const EditProfileScreen = connect(
  // need state connected & the action
  mapStateToProps,
  {
    updateHero,
  },
)(UnconnectedEditProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  DescriptionContainer: {
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: colors.textPrimary,
    fontFamily: fonts.defaultFontFamily,
  },
  FirstCar: {
    color: colors.red,
    fontWeight: "bold",
  },
  SecCar: {
    color: colors.blue,
    fontWeight: "bold",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fonts.defaultFontFamily,
    fontSize: 28,
  },
  subtitle: {
    color: colors.grey,
    fontFamily: fonts.defaultFontFamily,
    fontSize: 20,
  },

  textInput: {
    color: colors.textPrimary,
  },
});

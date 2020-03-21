/* Core */
import React, { useEffect } from "react";

/* Presentational */
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get('window');


function components() {
  
  const opacity = new Animated.Value(0);
  const offset = new Animated.ValueXY(0); 

  useEffect(() => {
    _panResponder = PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, {
        dx: state.offset.x,
      }]),

      onPanResponderRelease: () => {
        Animated.spring(state.offset.x, {
          toValue: 0,
          bounciness: 15,
        }).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(state.offset.x, {
          toValue: 0,
          bounciness: 10,
        }).start();
      }
    })
  }, [])

  useEffect(() => {
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 10
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
      })
    ]).start();
  }, [])

  return (
    <Animated.View 
      {..._panResponder.panHandlers} 
      style={[
        {
          transform: [
            ...state.offset.getTranslateTransform(),
            { rotateZ: state.offset.x.interpolate({
              inputRange: [width * -1, width],
              outputRange: ['-50deg', '50deg']
            }) }
          ]
        },
        { opacity: state.opacity },
    ]}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{ uri: user.thumbnail }} />

          <View style={[styles.infoContainer, { backgroundColor: user.color }]}>
            <View style={styles.bioContainer}>
              <Text style={styles.name}>{user.name.toUpperCase()}</Text>
              <Text style={styles.description}>{user.description}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Icon name="heart" size={12} color="#FFF" />
              <Text style={styles.likes}>{user.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "column",
    marginHorizontal: 15
  },

  thumbnail: {
    width: "100%",
    height: 150
  },

  infoContainer: {
    backgroundColor: "#57BCBC",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15
  },

  bioContainer: {
    flex: 1
  },

  name: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 10
  },

  description: {
    color: "#FFF",
    fontSize: 13,
    marginTop: 2
  },

  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20
  },

  likes: {
    color: "#FFF",
    fontSize: 12,
    marginLeft: 5
  }
});

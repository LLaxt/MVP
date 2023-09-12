import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View, SafeAreaView } from '../components/Themed';
import Draggable from 'react-native-draggable';

export default function WordMagnet({word}) {
  const windWidth = Dimensions.get('window').width;
  const windHeight = Dimensions.get('window').height;
  const randRotation = (Math.random() * 4) * (Math.random() < 0.5 ? -1 : 1);
  const randX = Math.random() * windWidth / 2;
  const randY = Math.random() * windHeight;

    //x={`${randX}%`} y={randY}

  //look into gestureState, x0/y0 coordinates, and onDragRelease
  return (
    <Draggable style={styles.draggable}
    // x={100}
    // y={100}
    // minX={-5}
    // minY={-230}
    // maxY={windHeight / 2 + 30}
    // maxX={windWidth - 25}
    >
      <View style={[styles.magnet, { transform: [{ rotate: `${randRotation}deg`}]}]} >
        <Text>{ word }</Text>
      </View>
    </Draggable>
  );
};

const styles = StyleSheet.create({
  magnet: {
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'flexStart',
    position: 'relative',
    display: 'inline-block',
    // shadowColor: 'black',
    // shadowOffset: 10,
    // elevation:
    //   elevation: 20,
    //   shadowColor: 'black',
    // }
  },
  draggable: {
    backgroundColor: 'transparent',
  }
});
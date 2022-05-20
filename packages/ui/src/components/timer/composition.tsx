import React from "react"
import { View } from "react-native"
import { Timer } from '.';

export default () => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'scroll' }}>
    <View style={{ margin: 10, marginLeft: 0 }}>
      <Timer duration={10} />
    </View>
  </View>
);

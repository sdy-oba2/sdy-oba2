import React from "react"
import { View } from "react-native"
import { Button } from '.';

export default () => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'scroll' }}>
    <View style={{ margin: 10, marginLeft: 0 }}>
      <Button text="Button" />
    </View>
    <View style={{ margin: 10, marginLeft: 0 }}>
      <Button text="Button" disabled />
    </View>
    <View style={{ margin: 10, marginLeft: 0 }}>
      <Button variant="Outlined" text="Outlined Button" />
    </View>
    <View style={{ margin: 10, marginLeft: 0 }}>
      <Button variant="Outlined" text="Outlined" disabled />
    </View>
  </View>
);

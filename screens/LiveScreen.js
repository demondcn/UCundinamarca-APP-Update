import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import WebView from "react-native-webview";

const { width, height } = Dimensions.get("window");

// Lista de videos con formato embed limpio
const youtubeVideos = [
  {
    id: "1",
    embedUrl:
      "https://www.youtube.com/embed/hT8v7ysxQ-k?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1",
  },
];

const LiveScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <WebView
        source={{ uri: item.embedUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={youtubeVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToAlignment="center"
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    width: width,
    height: height,
  },
  webview: {
    flex: 1,
  },
});

export default LiveScreen;

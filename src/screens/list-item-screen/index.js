import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "./styles";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";

const pictures = ["veg1", "veg2", "veg3", "veg4"];
const listData = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
];

const ListItemScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Vegetables");
  const navigation = useNavigation();

  const handleTileClick = () => {
    navigation.navigate("ItemDetailsScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.boxTabContainer}>
          <View style={styles.tabContainer}>
            {["Fruits", "Vegetables"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTab,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.itemHeaderContainer}>
          <Text style={styles.itemHeader}>Popular Item</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={handleTileClick}>
                <View style={styles.flatItem}>
                  <View style={styles.card}>
                    <SwiperFlatList
                      autoplay
                      autoplayDelay={2}
                      autoplayLoop
                      showPagination
                      paginationStyle={{
                        position: "absolute",
                        bottom: 80,
                        alignSelf: "center",
                      }}
                      paginationStyleItem={{
                        width: 7,
                        height: 7,
                        borderRadius: 5,
                        marginHorizontal: 3,
                      }}
                      paginationActiveColor="#000000"
                      paginationDefaultColor="#ccc"
                      data={pictures}
                      renderItem={({ item }) => (
                        <View style={styles.child}>
                          <Image
                            source={images[item]}
                            style={{
                              width: "100%",
                              height: 200,
                              marginTop: 10,
                            }}
                            resizeMode="cover"
                          />
                        </View>
                      )}
                    />

                    <View style={styles.infoContainer}>
                      <View style={styles.rowBetween}>
                        <Text style={styles.author}>Ajay kumar</Text>
                        <Text style={styles.title}>Cabbage</Text>
                      </View>

                      <View style={styles.rowBetween}>
                        <Text style={styles.rating}>⭐ 4.8 (54)</Text>
                        <Text style={styles.subtitle}>Savoy Cabbage</Text>
                      </View>

                      <View style={styles.rowBetween}>
                        <Text style={styles.quantity}>
                          Qty Available{"\n"}
                          <Text style={{ fontWeight: "bold" }}>100 Kg</Text>
                        </Text>
                        <Text style={styles.price}>$200</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default ListItemScreen;

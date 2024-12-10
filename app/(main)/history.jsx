import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Card, Button, SegmentedButtons } from "react-native-paper";

const History = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const data = {
    upcoming: [
      {
        id: "1",
        type: "Rửa Nhanh",
        status: "COMPLETED",
        company: "General Motors",
        date: "27th Nov 2024, Saturday",
      },
      {
        id: "2",
        type: "Rửa Nhanh",
        status: "COMPLETED",
        company: "General Motors",
        date: "27th Nov 2024, Saturday",
      },
      {
        id: "3",
        type: "Rửa Nhanh",
        status: "COMPLETED",
        company: "General Motors",
        date: "27th Nov 2024, Saturday",
      },
      {
        id: "4",
        type: "Rửa Nhanh",
        status: "COMPLETED",
        company: "General Motors",
        date: "27th Nov 2024, Saturday",
      },
      {
        id: "5",
        type: "Rửa Nhanh",
        status: "COMPLETED",
        company: "General Motors",
        date: "27th Nov 2024, Saturday",
      },
    ],
    past: [
      {
        id: "6",
        type: "Rửa Chuyên Nghiệp",
        status: "COMPLETED",
        company: "General Motors",
        date: "15th Nov 2024, Thursday",
        image: require("../../assets/images/welcome1.png"),
        time: "Estimated Completion: Today, 9:30 PM",
      },
      {
        id: "7",
        type: "Rửa Chuyên Nghiệp",
        status: "COMPLETED",
        company: "General Motors",
        date: "15th Nov 2024, Thursday",
        image: require("../../assets/images/welcome1.png"),
        time: "Estimated Completion: Today, 9:30 PM",
      },
    ],
  };

  const renderCardItem = (item, isPast = false) => (
    <Card key={item.id} style={styles.card}>
      <Card.Content >
        <View style={styles.row}>
          <Text variant="titleMedium" style={styles.type}>
            {item.type}
          </Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.date}>{item.date}</Text>
      </Card.Content>
      {isPast && (
        <>
          {/* <Card.Cover source={item.image} style={styles.image} /> */}
          <Card.Content>
            <Card.Cover source={item.image} style={styles.image} />
            <Text style={styles.time}>{item.time}</Text>
          </Card.Content>
        </>
      )}
      <Card.Actions>
        <Button
          mode={isPast ? "outlined" : "contained"}
          onPress={() => {}}
          style={isPast ? styles.buttonOutlined : styles.button}
          labelStyle={isPast ? styles.buttonOutlinedLabel : styles.buttonLabel}
        >
          {isPast ? "View Details" : "Detail More"}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Segmented Buttons */}
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: "upcoming", label: "UPCOMING" },
          { value: "past", label: "PAST" },
        ]}
        style={styles.segmentedButtons}
      />

      {/* Danh sách hiển thị */}
      <View style={styles.list}>
        {data[selectedTab].map((item) =>
          renderCardItem(item, selectedTab === "past")
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  segmentedButtons: {
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  company: {
    marginTop: 5,
    color: "#555",
  },
  date: {
    marginTop: 5,
    color: "#777",
  },
  time: {
    marginTop: 10,
    color: "#555",
  },
  image: {
    marginTop: 10,
    borderRadius: 5,

  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonOutlined: {
    borderColor: "#6200EE",
    borderRadius: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  buttonOutlinedLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6200EE",
  },
});

export default History;

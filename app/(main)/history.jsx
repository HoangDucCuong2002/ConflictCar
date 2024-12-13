import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Card, Button, SegmentedButtons } from "react-native-paper";
import moment from "moment"; // Import moment

const History = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const today = moment().startOf('day'); // Get today's date at the start of the day

  // Function to check if the date is in the past or upcoming and set the status
  const getStatus = (date) => {
    const itemDate = moment(date, "DD-MM-YYYY").startOf('day');
    if (itemDate.isAfter(today)) {
      return "PROCESS"; // "PROCESS" if the date is in the future
    } else {
      return "COMPLETED"; // "COMPLETED" if the date is in the past
    }
  };

  // Example data
  const data = [
    {
      id: "1",
      type: "Rửa Nhanh",
      date: "12-12-2024",
      company: "General Motors",
    },
    {
      id: "2",
      type: "Rửa Nhanh",
      date: "12-12-2024",
      company: "General Motors",
    },
    {
      id: "3",
      type: "Rửa Nhanh",
      date: "12-12-2024",
      company: "General Motors",
    },
    {
      id: "4",
      type: "Rửa Nhanh",
      date: "13-12-2024",
      company: "General Motors",
    },
    {
      id: "5",
      type: "Rửa Nhanh",
      date: "13-12-2024",
      company: "General Motors",
    },
    {
      id: "6",
      type: "Rửa Chuyên Nghiệp",
      date: "09-12-2024",
      company: "General Motors",
      image: require("../../assets/images/welcome1.png"),
      time: "Estimated Completion: Today, 9:30 PM",
    },
    {
      id: "7",
      type: "Rửa Chuyên Nghiệp",
      date: "10-12-2024",
      company: "General Motors",
      image: require("../../assets/images/welcome1.png"),
      time: "Estimated Completion: Today, 9:30 PM",
    },
  ];

  // Update the status for each item dynamically based on the date
  const updatedData = data.map(item => ({
    ...item,
    status: getStatus(item.date), // Apply the getStatus function
  }));

  const upcomingData = updatedData.filter((item) => item.status === "PROCESS");
  const pastData = updatedData.filter((item) => item.status === "COMPLETED");

  const renderCardItem = (item, isPast = false) => (
    <Card key={item.id} style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text variant="titleMedium" style={styles.type}>
            {item.type}
          </Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.date}>
          {moment(item.date, "DD-MM-YYYY").format("DD MMM YYYY")}
        </Text>
      </Card.Content>
      {isPast && (
        <>
          <Card.Content>
            {item.image && (
              <Card.Cover source={item.image} style={styles.image} />
            )}
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

      {/* Display list */}
      <View style={styles.list}>
        {(selectedTab === "upcoming" ? upcomingData : pastData).map((item) =>
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

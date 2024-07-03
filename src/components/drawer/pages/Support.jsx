import React, { useState, useRef } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';

const ExampleComponent = () => {
  const [inputValue, setInputValue] = useState(''); // State to hold input value
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const textInputRef = useRef(null); // Reference for TextInput

  const rankData = [
    {
      "Destinations": [/*...*/], // Example data
      "activeTime": "5:00 AM - 11:00 PM",
      "coordinates": {"_lat": -26.007124, "_long": 28.182973},
      "name": "Ivory Park Taxi Rank",
      "rank_id": 1
    },
    {
      "Destinations": [/*...*/], // Example data
      "activeTime": "6:00 AM - 10:00 PM",
      "coordinates": {"_lat": -26.006376, "_long": 28.249306},
      "name": "Oakmore Taxi Rank",
      "rank_id": 2
    },
    {
      "Destinations": [/*...*/], // Example data
      "activeTime": "7:00 AM - 9:00 PM",
      "coordinates": {"_lat": -25.744881, "_long": 28.192783},
      "name": "Pretoria Taxi Rank",
      "rank_id": 3
    },
    {
      "Destinations": [/*...*/], // Example data
      "activeTime": "7:00 AM - 9:00 PM",
      "coordinates": {"_lat": -26.04898, "_long": 28.059108},
      "name": "Zamani Taxi Rank",
      "rank_id": 4
    },
    {
      "Destinations": [/*...*/], // Example data
      "activeTime": "5:30 AM - 11:30 PM",
      "coordinates": {"_lat": -26.198952, "_long": 28.048032},
      "name": "MTN Noord Taxi Rank",
      "rank_id": 5
    }
  ];

  const handleInputChange = (text) => {
    setInputValue(text); // Update input value state
    handleSearch(text);  // Trigger search with new input value
  };

  const handleSearch = (text) => {
    const searchTerm = text.toLowerCase();
    const results = rankData.filter(rank => rank.name.toLowerCase().includes(searchTerm));
    setSearchResults(results); // Update search results state
  };

  const renderResult = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text>{item.activeTime}</Text>
      <Text>Latitude: {item.coordinates._lat}, Longitude: {item.coordinates._long}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef} // Assign ref to TextInput
        placeholder="Where To?"
        style={styles.textInput} // Add styles to the TextInput
        onChangeText={handleInputChange} // Capture input change
      />
      <FlatList
        data={searchResults}
        renderItem={renderResult}
        keyExtractor={(item) => item.rank_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExampleComponent;

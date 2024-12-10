import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, FlatList, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const garages = [
  { id: 1, name: 'Gara 1', lat: 37.788834, lon: -122.406417, address: '123 Phố X', rating: 4.5 },
  { id: 2, name: 'Gara 2', lat: 37.786834, lon: -122.407417, address: '456 Phố Y', rating: 4.0 },
  { id: 3, name: 'Gara 3', lat: 37.787834, lon: -122.408417, address: '789 Phố Z', rating: 3.8 },
];

const Setting = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGarages, setFilteredGarages] = useState(garages);
  const [distances, setDistances] = useState([]); // Store distances from user to garages
  const mapRef = useRef(null);
  const markersRef = useRef({}); // Object to store marker refs

  // Get user location when component mounts
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Quyền vị trí bị từ chối',
          'Ứng dụng cần quyền vị trí để hoạt động. Hãy vào cài đặt và cấp quyền.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    getLocation();
  }, []);

  // Calculate distance from user to each garage whenever userLocation changes
  useEffect(() => {
    if (userLocation) {
      const updatedGarages = garages.map((garage) => {
        const distance = getDistance(userLocation.latitude, userLocation.longitude, garage.lat, garage.lon);
        return { ...garage, distance };
      });
      setDistances(updatedGarages);
      setFilteredGarages(updatedGarages); // Filter garages based on user location
    }
  }, [userLocation]);

  // Calculate the distance between two coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredGarages(distances);
    } else {
      const searchResult = distances.filter(garage =>
        garage.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGarages(searchResult);
    }
  };

  // Focus on specific garage marker when user clicks on it
  const focusOnMarker = (garage) => {
    const marker = markersRef.current[garage.id];
    if (marker && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: garage.lat,
        longitude: garage.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      marker.showCallout(); // Show the callout of the marker
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm gara"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 21.028511,
          longitude: userLocation ? userLocation.longitude : 105.804817,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Vị trí của bạn"
            description="Đây là vị trí hiện tại của bạn"
            pinColor="blue"
          />
        )}

        {/* Garages Markers */}
        {filteredGarages.map(garage => (
          <Marker
            key={garage.id}
            coordinate={{ latitude: garage.lat, longitude: garage.lon }}
            title={garage.name}
            description={garage.address}
            ref={(ref) => (markersRef.current[garage.id] = ref)} // Save the reference to the marker
          >
            <Callout>
              <View>
                <Text style={styles.markerTitle}>{garage.name}</Text>
                <Text>Địa chỉ: {garage.address}</Text>
                <Text>Đánh giá: ⭐ {garage.rating}</Text>
                <Text>Khoảng cách: {garage.distance ? garage.distance.toFixed(2) : 'Không xác định'} km</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <FlatList
        data={filteredGarages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => focusOnMarker(item)}>
            <View style={styles.garageItem}>
              <Text style={styles.garageName}>{item.name}</Text>
              <Text style={styles.garageDetails}>
                Địa chỉ: {item.address} - Đánh giá: ⭐ {item.rating}
              </Text>
              <Text style={styles.garageDistance}>
                Khoảng cách: {item.distance ? item.distance.toFixed(2) : 'Không xác định'} km
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  garageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  garageName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  garageDetails: {
    fontSize: 14,
    color: '#555',
  },
  garageDistance: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default Setting;

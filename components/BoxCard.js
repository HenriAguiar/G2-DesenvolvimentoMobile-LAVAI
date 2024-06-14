import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BoxCard = ({ nome, fila, box }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("boxDetail", { nome, fila, box });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.cardTitle}>{nome}</Text>
      <Text>Tamanho da fila: {fila.length}</Text>
      <Text>Atendendo: {box.length > 0 ? "Sim" : "Não"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: "30%",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BoxCard;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const BoxDetail = () => {
  const route = useRoute();
  const { nome, fila, box } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.subtitle}>Serviço em atendimento:</Text>
      {box.length > 0 ? (
        <Text>{box[0].Serviço} (Placa: {box[0].placa})</Text>
      ) : (
        <Text>Nenhum serviço em atendimento</Text>
      )}
      <Text style={styles.subtitle}>Fila de espera:</Text>
      {fila.length > 0 ? (
        fila.map((servico, index) => (
          <Text key={index}>
            {servico.Serviço} (Placa: {servico.placa})
          </Text>
        ))
      ) : (
        <Text>Nenhum serviço na fila</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default BoxDetail;

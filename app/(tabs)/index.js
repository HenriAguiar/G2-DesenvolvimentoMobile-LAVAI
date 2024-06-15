import React, { useState } from "react";
import { View, Button, Modal, StyleSheet, TouchableOpacity, TextInput, Text, Alert } from "react-native";
import { useAppContext } from '@/context/provider';
import BoxCard from "@/components/BoxCard";

const TelaInicial = () => {
  const { filaBox1, filaBox2, filaBox3, box1, box2, box3, atualizaTempo, adicionarOrdemServico, servicos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(servicos[0]);
  const [placaVeiculo, setPlacaVeiculo] = useState("");

  const handleAddService = () => {
    if (placaVeiculo.trim() === "") {
      Alert.alert("Atenção", "Por favor, insira a placa do veículo.");
      return;
    }
    const ordemServico = {
      ...selectedService,
      placa: placaVeiculo,
      tempoInicio: new Date().getTime(),
      tempoExecucao: selectedService["Duração"]
    };
    adicionarOrdemServico(ordemServico);
    setModalVisible(false);
    setPlacaVeiculo("");
  };

  return (
    <View style={styles.container}>
      <Button title="Atualizar Tempo" onPress={atualizaTempo} />

      <View style={styles.cardsContainer}>
        <BoxCard nome="Box 1" fila={filaBox1} box={box1} />
        <BoxCard nome="Box 2" fila={filaBox2} box={box2} />
        <BoxCard nome="Box 3" fila={filaBox3} box={box3} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Serviço</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Adicionar Serviço</Text>
          <View style={styles.serviceList}>
            {servicos.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.serviceItem,
                  selectedService.Serviço === service.Serviço && styles.selectedServiceItem
                ]}
                onPress={() => setSelectedService(service)}
              >
                <Text>{service.Serviço}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Placa do veículo"
            value={placaVeiculo}
            onChangeText={setPlacaVeiculo}
          />
          <Button title="Adicionar" onPress={handleAddService} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  serviceList: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "50%",
  },
  serviceItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedServiceItem: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
});

export default TelaInicial;
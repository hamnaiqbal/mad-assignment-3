import * as React from 'react';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
} from 'react-native';

export default function History({ navigation, route }) {
  const [record, setRecord] = useState(route.params.historyObject);
  const [showModal, setShowModal] = useState(false);

  const clearHistory = () => {
    for (let i = 0; i < record.length; i++) {
      setRecord(delete record[i]);
    }
  };

  const removeRecord = (index) => {
    setRecord(delete record[index]);
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="#196F3D" />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Original Price</DataTable.Title>
          <DataTable.Title numeric>Discount</DataTable.Title>
          <DataTable.Title numeric>Final Price</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={record}
          renderItem={({ item, index }) => {
            if (item != undefined) {
              return (
                <TouchableOpacity onPress={() => removeRecord(index)}>
                  <DataTable.Row>
                    <DataTable.Cell>{item.oPrice}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.dPercentage}%
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.priceFinal}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </DataTable>

      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.flexCentered}>
          <View style={styles.modal}>
            <Text style={styles.modalHeading}>Are you Sure?</Text>
            <Text style={{ color: '#E74C3C' }}>Do you really want to delete history?</Text>

            <View
              style={{
                flexDirection: 'row',
                paddingTop: 20,
              }}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  clearHistory();
                  setShowModal(!showModal);
                }}>
                <Text style={styles.text}>Yes</Text>
              </TouchableOpacity>
              <View style={{ paddingLeft: 20 }} />
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#33bf5c' }]}
                onPress={() => {
                  setShowModal(!showModal);
                }}>
                <Text style={styles.text}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Clear History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E74C3C',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 100,
  },
  clearBtnText: {
    fontSize: 13,
    color: '#E74C3C',
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  modalHeading: {
    textAlign: 'center',
    fontSize: 20,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  flexCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  text: {
    color: 'white',
  },
});

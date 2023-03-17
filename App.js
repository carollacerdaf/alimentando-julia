import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {db} from './firebase';
import {set, ref, onValue} from 'firebase/database';
import moment from 'moment';

function App() {
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  const [schedule, setSchedule] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        const {amamentacao} = data;
        setLeft(amamentacao.left);
        setRight(amamentacao.right);
        setSchedule(amamentacao.schedule);
        setTime(amamentacao.time);
      }
    });
  }, []);

  const leftSide = () => {
    updateFields('left');
  };

  const rightSide = () => {
    updateFields('right');
  };

  const updateFields = async side => {
    if (side === 'right') {
      setRight(true);
      setLeft(false);
    } else {
      setRight(false);
      setLeft(true);
    }
    setSchedule(moment().add(3, 'hours').format('HH:mm'));
    setTime(moment().format('HH:mm'));
    await set(ref(db, '/amamentacao'), {
      right,
      left,
      time,
      schedule,
    });
  };
  return (
    <View style={styles.view}>
      <Text>Alimentando</Text>
      <Text style={styles.name}>Júlia</Text>
      <View style={styles.rowButton}>
        <TouchableOpacity
          style={[styles.button, left === false ? styles.buttonInactive : null]}
          onPress={leftSide}>
          <Text style={styles.buttonText}>Esquerdo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            right === false ? styles.buttonInactive : null,
          ]}
          onPress={rightSide}>
          <Text style={styles.buttonText}>Direito</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeTexts}>
        <Text style={styles.text}>Horário: {time}h</Text>
        <Text style={styles.text}>Próximo horário: {schedule}h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 20,
    marginTop: 60,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  rowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    color: 'black',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 30,
  },
  buttonInactive: {
    opacity: 0.5,
  },
  timeTexts: {
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default App;

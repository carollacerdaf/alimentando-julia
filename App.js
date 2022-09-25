import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {db} from './firebase';
import {set, ref, onValue} from 'firebase/database';
import moment from 'moment';

function App() {
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        const {amamentacao} = data;
        setLeft(amamentacao.left);
        setRight(amamentacao.right);
        setSchedule(amamentacao.schedule);
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
    await set(ref(db, '/amamentacao'), {
      right,
      left,
      schedule,
    });
  };
  return (
    <View style={styles.view}>
      <View style={styles.rowButton}>
        <TouchableOpacity
          style={[styles.button, left === false ? styles.buttonInactive : null]}
          onPress={leftSide}>
          <Text style={styles.buttonText}>E</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            right === false ? styles.buttonInactive : null,
          ]}
          onPress={rightSide}>
          <Text style={styles.buttonText}>D</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeTexts}>
        <Text style={styles.text}>Próximo horário: {schedule}h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 20,
    marginTop: 80,
  },
  rowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: 20,
    borderRadius: 80,
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

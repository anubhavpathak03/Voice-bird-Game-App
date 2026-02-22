import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


const GROUND = 660;
const BIRD_SIZE = 100;

export default function App() {
  const [birdY, setBirdY] = useState<number>(300);
  const [velocity, setVelocity] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopLoop = () => {
    if(timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const startLoop = () => {
    if(timeoutRef.current) return;

    timeoutRef.current = setInterval(() => {
      setVelocity((v) => {
        let nextvel = v + 0.5;

        setBirdY((y) => {
          let newY = y + nextvel;

          if(newY + BIRD_SIZE >= GROUND) 
          {
            newY = GROUND - BIRD_SIZE;
            setGameOver(true);
            stopLoop();
          }

          return newY;

        });

        return nextvel;

      });
    }, 30);

  };

  useEffect(() => {
    startLoop();
    return stopLoop;
  }, [])

  const Jump = () => {
    if(!gameOver) {
      setVelocity(-8);
    }
  };

  const restartBtn = () => {
    setBirdY(300);
    setGameOver(false);
    setVelocity(0);
    stopLoop();
    startLoop();
  }

  return (
    <View style={styles.container}>
      {/* Bird */}
      <Image source={require("./assets/bird.jpeg")}
        style={[styles.bird, {top: birdY}]}
      />

  
      <View style={styles.ground}/>

      {/* Jump Button */}
      {!gameOver && (
        <TouchableOpacity style={styles.button} onPress={Jump}>
          <Text style={{color: "#fff", fontSize: 18}}>JUMP</Text>
        </TouchableOpacity>
      )}

      {gameOver && (
        <View style={styles.center}>
          <Text style={styles.gameOver}>Game Over</Text>
          <TouchableOpacity style={styles.button} onPress={restartBtn}>
            <Text style={{color: "#fff", fontSize: 18}}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73cede',
  },
  center: {
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    top: 220,
  },
  bird: {
    position: "absolute",
    backgroundColor: "#9f2c2c",
    left: 150,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  ground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 184,
    backgroundColor: "green",
  },
  gameOver: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    position: "absolute",
    backgroundColor: "#1a1a1a",
    borderRadius: 5,
    padding: 15,
    bottom: 60,
    alignSelf: "center",
  },

  text: {
    color: "#fff", 
    fontSize: 18,
    fontFamily: ""
  }
});

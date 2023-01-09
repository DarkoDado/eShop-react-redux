import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AlertNotify.module.css"

const AlertNotify = () => {
  const alerts  = useSelector(state => state.alerts.alert);

  const [alert, setAlert] = useState();
  const [show, setShow] = useState(false);
  // const [intervalID, setIntervalID] = useState(null)

  const handleStartTimer = () => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true)
    }
    
    setTimeout(() => {
      setShow(false)
    }, 3500)
    return clearTimeout
  }

  const handlePauseTimer = () => {
    // clearInterval(intervalID)
  }

  const deleteAlert = alerts.filter(alert1 => alert1.id !== alert)
  
  const onClose = () => {
    handlePauseTimer()
  };

  useEffect(() => {
    handleStartTimer()
    
    onClose()
    console.log(alerts);
  }, [alerts]);


  return (
    <>
      {show ? (
        <div className={styles.alert}>
          {alerts.map((item, index) => {
            return (
              <>
              
              <div key={index}>
              <p>{item.message}</p>
              <span onClick={() => setShow(false)}>X</span>
              </div>
              </>
            )
          })}
  

        </div>
        
      ) : null
      }
    </>
  );
};

export default AlertNotify;

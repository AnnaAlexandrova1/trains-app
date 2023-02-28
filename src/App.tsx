import React from "react";
import { useEffect, useState } from "react";
import { getTrains, putSpeeds } from "./api/requests";
import "./App.css";
import TrainsList from "./components/TrainsList/TrainsList";
import TrainItem from "./components/TrainItem/TrainItem";
import { SpeedItem } from "./components/TrainItem/TrainItem";

export interface ITrains {
  name: string;
  description: string;
  speedLimits: Array<ISpeedLimit>;
}

export interface ISpeedLimit {
  name: string;
  speedLimit: number;
}

function App() {
  const [trains, setTrains] = useState<Array<ITrains> | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectTrain, setSelectTrain] = useState<string>("");
  const [speedLimitList, setSpeedLimitList] = useState<Array<ISpeedLimit> | []>([])
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    getTrains()
      .then((res) => {
        setTrains(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const handleClick = (name: string) => {
    if (selectTrain === name) {
      setSelectTrain("");
      setSpeedLimitList([]);
      setChange(false)
    } else {
      setSelectTrain(name);
      const arr: any = (trains.filter(i => i.name === name))[0].speedLimits
      setSpeedLimitList(arr);
      setChange(false)
    }
  };

  const onHandleInput = (e:any, i: string) => {
    if (!Number.isInteger(+e.target.value)) {
      alert('Только целые числа')
      return
    }

    if (+e.target.value===0) {
      alert('Только целые числа больше 0')
      return
    }

    setSpeedLimitList(speedLimitList.map((item) => {
      if (item.name === i) {
        return {
          ...item,
          speedLimit: +e.target.value
        }
      }
      return item
    }))
    setChange(true)
  }

  const onSendChanges = () => {
    const sortArr: ISpeedLimit[] = speedLimitList.sort((a, b) => (a.speedLimit < b.speedLimit ? -1 : 1))
    const desc: string = trains.filter(item => item.name === selectTrain)[0].description

    let data:ITrains = {
      name: selectTrain,
      description: desc,
      speedLimits: sortArr
    }
    console.log('Отправка данных на сервер:')
    console.log(data)
      putSpeeds(data)
  }

  const drowBtn = () => {
   return  change ? "btn-send": "btn" 
  }

  return (
    <div className="container">
      <h1>Тестовое задание</h1>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>Error</div> : null}

      <div className="tables-area">
        <TrainsList
          list={trains}
          handleClick={handleClick}
          selectTrain={selectTrain}
        />
        {selectTrain.length > 0 ? <TrainItem speedLimits={speedLimitList} onHandleInput={onHandleInput} /> : <div className="select-train">Выберите поезд</div>}  
        <button className={drowBtn()}
          disabled={!change}
          onClick={() => onSendChanges()}
        >Отправить изменения</button>
      </div>
       
    </div>
  );
}

export default App;

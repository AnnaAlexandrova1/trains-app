import { ITrains } from "../../App";

interface WrapperProps {
  list: Array<ITrains>;
  handleClick: Function;
  selectTrain: string;
}

const TrainsList = ({ list, handleClick, selectTrain }: WrapperProps) => {
  if (list.length < 1) {
    return <div>'Нет ни одного поезда'</div>;
  }

  return (
    <div className="table-trains">
      <div className="table__row table__row--header">
        <div className="table__cell">Поезда</div>
      </div>
      {list.map((i: any, num: number) => {
        return (
          <div
            className={selectTrain===i.name ? "table__cell active" : "table__cell"}
            key={num}
            onClick={() => handleClick(i.name)}
          >
            {i.name}
          </div>
        );
      })}
    </div>
  );
};

export default TrainsList;



interface SpeedLimitProps {
    speedLimits: Array<SpeedItem> | [],
    onHandleInput: Function
}

export interface SpeedItem {
    name: string,
    speedLimit: number
}

const TrainItem = ({ speedLimits, onHandleInput }: SpeedLimitProps) => {
    

    if (speedLimits.length < 1) {
        return  <div className="select-train">Не задано скоростей</div>
    }


    return (
        <div className="table-speed">
            <div className="table__row table__row--header">
                <div className="table__cell">Название</div>
                <div className="table__cell">Скорость</div>
            </div>

           
            {speedLimits.map((i, num) => {
                return (
                      <div className="table__row">
                      <div className="table__cell" key={num}>{i.name}</div>
                        <div className="table__cell" key={(num + 1) * 1000}>
                            <input
                              onChange={(e) => onHandleInput(e, i.name)}
                              value={i.speedLimit}
                              type="number"
                              min="1" step="1"
                            />
                            </div>
                      </div>
                  )
            })}
        </div>
    )
}

export default TrainItem;
import {useState, useEffect} from 'react';
import './Log.css';

const Log = (props) => {
    const { data, time } = props;
    const [logData, setLogData] = useState([]);
    const [isPauseBtnVisible, setIsPauseBtnVisible] = useState(true);

    useEffect(() => {
        if (isPauseBtnVisible) {
            logData.unshift({ time, data });
            setLogData(logData);
        }
    }, [data]);

    const handlePauseClick = () => {
        setIsPauseBtnVisible(false);
    }

    const handleResumeClick = () => {
        setIsPauseBtnVisible(true);
    }

    return (
        <div>
            <h2 className="log_title">Log</h2>
            {isPauseBtnVisible && <button className="btn" onClick={handlePauseClick}>Pause</button>}
            {!isPauseBtnVisible && <button className="btn" onClick={handleResumeClick}>Resume</button>}
            <div className="log_data">
                {logData.map((dataArr) => {
                    return (
                        <div>
                            {dataArr.time !== null && <div>{`Updated for ${dataArr.time}`}</div>}
                            {dataArr.data.map((item) => {
                                return <div>{`${item.code} :  ${item.price}`}</div>
                            })
                            }
                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Log;

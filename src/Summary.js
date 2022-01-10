import { useState, useEffect } from 'react';
import './Summary.css';

const Summary = (props) => {
    const { data } = props;
    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        const updatedSumData = data.map((value) => {
            let starting = 0, lowest = 0, highest = 0, current = 0;
            if (summaryData.length > 0) {
                const filteredSumData = summaryData.filter((summaryItem) => summaryItem.name === value.code);
                lowest = value.price < filteredSumData[0].lowest ? value.price : filteredSumData[0].lowest;
                highest = value.price > filteredSumData[0].highest ? value.price : filteredSumData[0].highest;
                current = value.price;
                starting = filteredSumData[0].starting;
            } else {
                starting = value.price
                lowest = value.price;
                highest = value.price;
                current = value.price;
            }

            return ({
                name: value.code,
                starting,
                lowest,
                highest,
                current,
            });
        });

        setSummaryData(updatedSumData)
    }, [data]);

    return (
        <div>
            <h2 className="summary_title">Summary</h2>
            <div className="summary_data">
                <table>
                    <tr>
                        <th>Stock</th>
                        <th>Starting</th>
                        <th>Lowest</th>
                        <th>Highest</th>
                        <th>Current</th>
                    </tr>
                    {summaryData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.starting}</td>
                                <td>{val.lowest}</td>
                                <td>{val.highest}</td>
                                <td>{val.current}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
};

export default Summary;
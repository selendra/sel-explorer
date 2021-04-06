import React from 'react';
import { useSelector } from 'react-redux'
import { latestBlocksSelector } from '../../store/reducers/latestBlockSlice'
import { Row, Col, Card } from 'antd';
// import { Line } from 'react-chartjs-2';

export default function Analytics() {
  const blocks = useSelector(latestBlocksSelector);
  console.log(blocks)
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
    }]
  }


  return (
    <>
      <Row justify='space-between'>
        <Col>
          {/* <Card style={{ borderRadius: 8, width: 800, minHeight: 120 }}>
            <p style={{ fontWeight: 600, fontSize: 18 }}>Latest Block / Finalized</p><br/>
            <Line data={data} />
          </Card> */}
        </Col>
      </Row>
    </>
  );
}

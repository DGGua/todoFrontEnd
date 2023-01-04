import { Card, Space } from "antd-mobile";
import { useEffect, useState } from "react";
import { AnalType, dataService, InfoPair } from "../../service/dataService";
import "../scss/data.scss";
function LocalCard(props: { title: string; data: InfoPair }) {
  const { title, data } = props;
  const { count, time } = data;
  return (
    <Card title={title}>
      <div className="card-body">
        <div className="card-item">
          <div className="card-item-title">次数</div>
          <div className="card-item-data">{count}</div>
        </div>
        <div className="card-item">
          <div className="card-item-title">时长</div>
          <div className="card-item-data">{time} min</div>
        </div>
      </div>
    </Card>
  );
}

export default function Data() {
  const [data, setData] = useState<AnalType>({
    complete: { count: 0, time: 0 },
    last: { count: 0, time: 0 },
    total: { count: 0, time: 0 },
  });
  useEffect(() => {
    dataService.analysis().then((res) => setData(res.data.data));
  }, []);

  return (
    <div className="page page-data">
      <LocalCard title="累计待办" data={data.total} />
      <LocalCard title="完成待办" data={data.complete} />
      <LocalCard title="剩余待办" data={data.last} />
    </div>
  );
}

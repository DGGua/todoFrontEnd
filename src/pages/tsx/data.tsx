import { Card } from "antd-mobile";
import "../scss/data.scss";
function LocalCard(props: { title: string; count: number; mins: number }) {
  const { title, count, mins } = props;
  return (
    <Card  title={title}>
      <div className="card-body">
        <div className="card-item">
          <div className="card-item-title">次数</div>
          <div className="card-item-data">{count}</div>
        </div>
        <div className="card-item">
          <div className="card-item-title">时长</div>
          <div className="card-item-data">{mins}min</div>
        </div>
      </div>
    </Card>
  );
}

export default function Data() {
  return (
    <div className="page page-data">
      <LocalCard title="累计待办" count={1} mins={100} />
      <LocalCard title="完成待办" count={1} mins={100} />
      <LocalCard title="剩余待办" count={1} mins={100} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button, Col, Row, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

interface Response {
  resultCode:number,
  resultObj:any
}

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
];

const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData()
  },[]);

  const getData = () => {
    setLoading(true)
    axios
      .get("/api/users")
      .then((response) => {
        // 处理成功响应
        if(response.data.resultCode == 200){
          console.log(response.data);
          setDataSource(response.data.resultObj)
        }else{
          message.error(response.data.resultMsg)
          setDataSource([])
        }
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  const search = () => {
    getData()
  }

  return (
    <div>
      
      <Row gutter={[8,24]}>
        <Col span={12}>
          <Button type="primary" onClick={search}>查询</Button>
        </Col>
      </Row>
      <Row gutter={[8,24]}>
        <Col span={12}>
          <Table
          rowKey={'id'}
          loading={loading} 
          columns={columns} 
          dataSource={dataSource} />
        </Col>
      </Row>
    </div>
  )
};

export default UserList;

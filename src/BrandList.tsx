import { useEffect, useState } from "react";
import { Button, Col, Row, Table, message ,Modal,Form} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import BrandForm from './BrandForm'

interface DataType {
  id:number;
  key: string;
  name: string;
  description: number;
  brand: string;
  flavors: string[];
}

const getColumn = (edit:(record:DataType)=>void):ColumnsType<DataType> => {

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
      title: "description",
      dataIndex: "description",
      key: "addrdescriptioness",
    },
    {
      title: "brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "flavors",
      dataIndex: "flavors",
      key: "flavors",
      render:(flavors:{id:number,name:string}[])=>{
        return flavors.map(i=>i.name).join(' , ')
      }
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      render:(text:string,record)=>{
        return <Button type="link" onClick={()=>edit(record)}>修改</Button>
      }
    },
  ];

  return columns

}



const BrandList = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType>();
  const [ifEdit, setIfEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  
  useEffect(() => {
    getData()
  },[]);

  const getData = () => {
    setLoading(true)
    axios
      .get("/api/coffees")
      .then((response) => {
        // 处理成功响应
        if(response.data.resultCode == 200){
          console.log(response.data);
          setDataSource(response.data.resultObj)
        }else{
          message.error(response.data.resultMsg)
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

  const add = () => {
    setCurrentRecord(undefined)
    form.setFieldsValue({})
    setIfEdit(true)

  }

  const edit = (record:DataType)=>{
    console.log(`edit`,record);
    
    setCurrentRecord(record)
    const values = {
      id:record.id,
      name:record.name,
      description:record.description,
      brand:record.brand,
      flavors:record?.flavors?.map(i=>i.name) || []

    }
    form.setFieldsValue(values)
    setIfEdit(true)

  }

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIfEdit(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIfEdit(false);
  };  

  return (
    <div>
      
      <Row gutter={[8,24]}>
        <Col span={12}>
          <Button style={{marginRight:24}} type="primary" onClick={search}>查询</Button>
          <Button type="primary" onClick={add}>新增</Button>

        </Col>
      </Row>
      <Row gutter={[8,24]}>
        <Col span={12}>
          <Table
          rowKey={'id'}
          loading={loading} 
          columns={getColumn(edit)} 
          dataSource={dataSource} />
        </Col>
      </Row>
      <Modal
        destroyOnClose
        title={currentRecord?'编辑':'新建'}
        visible={ifEdit}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <BrandForm 
        editId={currentRecord ? currentRecord.id : 0}
        formType={currentRecord ? 'edit':'new'}
        form={form}
        />
      </Modal>
    </div>
  )
};

export default BrandList;

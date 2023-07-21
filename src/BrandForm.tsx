import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select,message } from 'antd';
import axios from "axios";
import React from 'react';



const {Option} = Select

interface Props {
  editId:number
  form:any,
  formType:'edit'|'new'
}

const BrandForm: React.FC<Props> = (props) => {
  const {form,formType,editId} = props
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('onFinish:', values);
    setLoading(true)

    if(formType === 'edit'){
        axios
          .patch(`/api/coffees/${editId}`,values)
          .then((response) => {
            // 处理成功响应
            if(response.data.resultCode == 200){
              console.log(response.data);
              message.success('提交成功.')
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
    }else{
        axios
          .post("/api/coffees",values)
          .then((response) => {
            // 处理成功响应
            if(response.data.resultCode == 200){
              console.log(response.data);
              message.success('提交成功.')
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

  };

  const onFinishFailed = (errorInfo: any) => {




    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={props.form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    //   initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="描述"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="品牌"
        name="brand"
        rules={[{ required: true, message: 'Please input brand!' }]}
      >
        <Input />
      </Form.Item>  

      <Form.Item
        label="口味"
        name="flavors"
      >
        <Select 
            mode="multiple"
        >
            <Option value="f001">f001</Option>
            <Option value="f002">f001</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item
        label="备注"
        name="remark"
      >
        <Input />
      </Form.Item>  */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BrandForm;
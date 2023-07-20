import { Button, Checkbox, Col, Form, Input, Row, Switch, message } from 'antd';
import { useState } from "react";
import React from 'react';
import axios from "axios";

type ActionType = 'login' | 'register'

const Coffee: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('login');
  const text = actionType === 'login'?'登陆':'注册'

  const onFinish = (values: any) => {

    console.log('Success:', values);
    const endPoint = actionType === 'login' ? 'sign-in' :'sign-up'
    const url = `/api/authentication/${endPoint}`
    axios
    .post(url,values)
    .then((response) => {
      // 处理成功响应
      console.log(response.data);
      if(response.data.resultCode == 200){
        console.log(response.data);
        message.success(`${text}成功.`)
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
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div style={{width:360}}>
      <Row>
        <Col>
          <Switch checked={actionType === 'login'} onChange={(checked)=>setActionType(checked?'login':'register')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {text}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Coffee;
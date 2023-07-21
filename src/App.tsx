import React, { useEffect, useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import BrandList from './BrandList'
import Login from './Login'
import UserList from './UserList'



/**
 * 模拟生成40张图表，异步加载数据+懒加载 demo
 * @returns
 */
 const Page = () => (
  <div style={{margin:24}}>
    <h2>品牌列表</h2>
    <BrandList />
    <h2>用户列表</h2>
    <UserList />
    <div style={{marginTop:24}}>
      <Login />
    </div>
  </div>
);

export default Page;

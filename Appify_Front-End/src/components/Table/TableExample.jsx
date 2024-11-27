import React, { useState } from 'react';
import { Table, Button } from 'antd';

const data = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' }
];

const TableExample = () => {
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age'
    });
  };

  let { sortedInfo: sortedInformation, filteredInfo: filteredInformation } = { sortedInfo, filteredInfo };
  sortedInformation = sortedInformation || {};
  filteredInformation = filteredInformation || {};

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' }
      ],
      filteredValue: filteredInformation.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInformation.columnKey === 'name' && sortedInformation.order
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInformation.columnKey === 'age' && sortedInformation.order
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' }
      ],
      filteredValue: filteredInformation.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInformation.columnKey === 'address' && sortedInformation.order
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
};

export default TableExample;

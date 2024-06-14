import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import CDTable from './CDTable';
import axios from 'axios';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

const EditableTable = () => {
  const [visible, setVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [realRes, setData] = useState([])
  const [cdID, setCDID] = useState("");
  const [searchTerm, setSearchTerm] = useState('');


  const [form] = Form.useForm();


  useEffect(() => {
    axios.get('https://api.example.com/data')  // 替换成你的实际 API 地址
      .then((response) => {
        // setData(response.data);
      })
      .catch((error) => {
      });
  }, []); // 仅在组件加载时执行一次


  const showModal = (record) => {
    setEditingRow(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // You would typically send a request to update the data here
      console.log('Editing data:', values);
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = () => {
    // Implement your search logic here, e.g., send a request to API or filter data.
    axios.get('https://api.example.com/data')  // 替换成你的实际 API 地址
      .then((response) => {
        // setData(response.data);
      })
      .catch((error) => {
      });
    console.log('Searching for:', searchTerm);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => {
          showModal(record)
          // 需要从这里读id，向下传递
          setCDID(record)
        }}>CDs</Button>
      ),
    },
  ];

  return (
    <div>
      <Space size={'middle'}>
        <Input
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search artist who has most tracks
        </Button>
      </Space>

      <Table dataSource={data} columns={columns} />
      <Modal
        title="CD"
        width={'60%'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CDTable cdID={cdID} />
      </Modal>
    </div>
  );
};

export default EditableTable;
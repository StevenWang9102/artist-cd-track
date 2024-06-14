import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const data = [
  {
    key: '1',
    serialNumber: 'CD001',
    Tracks: ['Track 1', 'Track 2', 'Track 3'],
  },
  {
    key: '2',
    serialNumber: 'CD002',
    Tracks: ['Track A', 'Track B', 'Track C'],
  },
];

const EditableTraceTable = ({ trackID }) => {
  const [visible, setVisible] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [realRes, setData] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('https://api.example.com/data')  // 替换成你的实际 API 地址
      .then((response) => {
        // setData(response.data);
      })
      .catch((error) => {
        // setError(error.message);
      });
  }, [trackID]);

  const showModal = (record) => {
    setEditingRow(record);
    form.setFieldsValue({ Tracks: record.Tracks.join('\n') }); // Split trace items by newline in textarea
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Split the string to array of Tracks
      const TracksArray = values.Tracks.split('\n').filter(Boolean);
      console.log('Editing data:', { ...editingRow, Tracks: TracksArray });
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Tracks',
      key: 'Tracks',
      render: (text, record) => (
        <ul>
          {record.Tracks.map((trace, index) => (
            <li key={index}>{trace}</li>
          ))}
        </ul>
      ),
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (text, record) => (
    //     <Button onClick={() => showModal(record)}>编辑</Button>
    //   ),
    // },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />

      <Modal
        title=""
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Tracks"
            label="Tracks"
            rules={[{ required: true, message: 'Tracks' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditableTraceTable;
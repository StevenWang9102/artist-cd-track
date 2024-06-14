import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import EditableTraceTable from "./TraceTable"
import axios from 'axios';

const data = [
  {
    key: '1',
    cdName: 'Album 1',
    artist: 'Artist 1',
    releaseDate: '2020-01-01',
    Tracks: ['Track 1', 'Track 2', 'Track 3'],
  },
  {
    key: '2',
    cdName: 'Album 2',
    artist: 'Artist 2',
    releaseDate: '2021-02-02',
    Tracks: ['Track A', 'Track B', 'Track C'],
  },
];

const CDtable = ({ cdID }) => {
  const [visible, setVisible] = useState(false);
  const [trackID, setTrackID] = useState("");
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
  }, [cdID]);

  const showModal = (record) => {
    setEditingRow(record);
    form.setFieldsValue(record); // 设置表单数据为当前行的数据
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

  const columns = [
    {
      title: 'CD Name',
      dataIndex: 'cdName',
      key: 'cdName',
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>Tracks</Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
      <Modal
        title="Tracks"
        visible={visible}
        width={'60%'}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <EditableTraceTable trackID={trackID} />
      </Modal>
    </div>
  );
};

export default CDtable;
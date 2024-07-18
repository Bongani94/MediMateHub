import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout"
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';

function DoctorsList() {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
  
    const getUsersData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:8080/api/admin/get-all-doctors",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.success);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };
  
    useEffect(() => {
      getUsersData();
    }, []);

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => <span>{record.firstName} {record.lastName}</span>,
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
          },
        {
          title: "Created At",
          dataIndex: "createdAt",
        },
        {
            title: "status",
            dataIndex: "status",
          },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" && <h1 className="anchor">Approve</h1>}
              {record.status === "approved" && <h1 className="anchor">Block</h1>}

            </div>
          ),
        },
      ];

  return (
    <Layout>
        <h1 className='page-header'>Doctors List</h1>
        <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default DoctorsList
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DoctorForm from "../../components/DoctorForm";

function Profile() {

    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null)
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "http://localhost:8080/api/user/apply-doctor-account",
            { ...values, userId: user._id, },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error("Something went wrong");
        }
      };

      const getDoctorData = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.post(
            "http://localhost:8080/api/doctor/get-doctor-info-by-user-id",
            {
                userId: user._id,
            },
            { token: localStorage.getItem("token") },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading())
          if (response.data.success){
            setDoctor(response.data.data)
          }
        } catch (error) {
          dispatch(hideLoading())
        }
      };
    
      useEffect(() => {
        getDoctorData()
      }, [user]);

  return (

    <Layout>
        <h1 className='page-title'>Doctor Profile</h1>
        <hr />

        <DoctorForm onFinish={onFinish} />
    </Layout>
  )
}

export default Profile
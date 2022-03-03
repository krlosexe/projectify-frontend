import React, { useEffect, useState } from 'react';
import Content from '../../components/Content';
import Layout from '../../layout/Layout';
import useAuth from '../../hooks/useAuth';
import {base_url, Api} from '../../Env'

import axios from 'axios'

import './Dashboard.scss'

const Dashboard = () => {
  const  {auth}  = useAuth();
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);


  useEffect(()=>{
    getProjects();
  }, []);
  
  const getProjects = async() => {

      const response = await axios.get(base_url(Api, "projects"), {
        headers: {
          'access-token': `${auth.token}`
        }
      })

      setProjects(response.data)
  }

  return (
    <div className='dash-container'>
      <Layout>
        <Content projects={projects} />
      </Layout>
    </div>
  
  )
};

export default Dashboard;

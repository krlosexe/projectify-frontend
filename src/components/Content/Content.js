import React, {useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import AddReport from '../AddReport/AddReport';
import Reports from '../Reports/Reports';
import Sidebar from '../Sidebar';

import './Content.scss'

const Content = ({projects}) => {
  const  {board}  = useAuth();

  return(
    <div className='content'>
    <Sidebar />
    {board === 0 ? <AddReport projects={projects}/> : <Reports projects={projects}/>}
    </div>


  )
};

export default Content;

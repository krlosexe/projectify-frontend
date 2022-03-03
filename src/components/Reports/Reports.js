import React, { useState, useEffect } from 'react';
import CalendarComponent from '../Calendar'
import { weekNumber } from 'weeknumber';
import useAuth from '../../hooks/useAuth';
import {base_url, Api} from '../../Env'

import axios from 'axios'
import './Reports.scss'

const Reports = (props) => {

  const  { auth }  = useAuth();
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState(weekNumber(date));
  const [dedication, setDedication] = useState(0);
  const [currentDedication, setCurrentDedication] = useState(0);
  const [error, setError] = useState("We couldn't find any report");
  const [success, setSuccess] = useState("You can update your monthly report by clicking on it.")
  const [data, setData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [NameProject, setNameProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projects, setProjects]       = useState([]);
  useEffect(()=>{
    getApiDedications();
  }, []);


  useEffect(()=>{
    setProjects(props.projects)
  },[props.projects])


 
  const onDateChange = (newDate) => {
    setDate(newDate)
    setWeek(weekNumber(newDate));
    console.log(newDate.getMonth()+1 === new Date().getMonth()+1)  
    if(showUpdate && weekNumber(newDate) === week && (newDate.getMonth()+1 === new Date().getMonth()+1)){
      setShowUpdate(true);
    } else {
      setShowUpdate(false);
    }

  }

  const onDedicationChange = (value) => {
      setDedication(Number(value.target.value));
  }

  const idAuxFilter = (filterKey) => {
    return data.filter(reports => reports._id === filterKey)
  }

  const weekAuxFilter = (filterKey) => {
    return data.filter(reports => reports.number_week === filterKey)
  }

  const onTableClick = (key) => {

    if(date.getMonth()+1 === new Date().getMonth()+1){
      setShowUpdate(true);
      setSelectedProject(key);
      setCurrentDedication(idAuxFilter(key)[0].hours_dedication);
    } else {
      setSelectedProject(key);
      setCurrentDedication(idAuxFilter(key)[0].hours_dedication);
    }

  }

  const getProject = () => {
    if(selectedProject !== undefined){
     
      const project = idAuxFilter(selectedProject)[0].id_project
      
      return project;
    } else {}

  }

  const submitUpdate = () => {
    let data = {
      "hours_dedication": dedication,
    }
    axios.post(base_url(Api,`projects/report/week/${selectedProject}`), data, {
      headers: {
        'access-token': `${auth.token}`
      }
    }).then(()=>{
      setSuccess("You successfully updated your weekly dedication");
      getApiDedications();
       setCurrentDedication(dedication);
    }).catch((error)=>{

      setError(error.response.data.message);
    })

  }

  const getApiDedications = async () => {


    const response = await axios.get(base_url(Api, `projects/report/week/${localStorage.getItem("id_user")}`), {
      headers: {
        'access-token': `${auth.token}`
      }
    })

    setData(response.data);
    
}

  return (  
    <div className='add-report'>
      <div className='add-report__header'>
        <h2 className='add-report__header-title'>Check or Update your reports</h2>
      </div>
      <div className='add-report__main'>
        <div className='add-report__main-table'>
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Week Number</th>
                <th>Time Spent</th>
              </tr>
            </thead>
            <tbody>

                {weekAuxFilter(week).map((project) => (
                  <tr onClick={() => {onTableClick(project._id)}} key={project._id}>
                    <td >{projects.find(value => value._id == project.id_project).name}</td>
                    <td>{project.number_week}</td>
                    <td>{project.hours_dedication}</td>
                  </tr>
              ))}

            </tbody>
          </table>
          {showUpdate ? <div className='add-report__main-table-update'>
            <h3 className="selected">You selected <span>{projects.find(value => value._id == getProject()).name}</span> for update</h3>
              <form className='update-form'>
                <div className='update-form__group'>
                  <label className='update-form__label'>Insert your new dedication</label>
                  <input onChange={onDedicationChange} className='form__input' type="number" defaultValue={0}></input>
                </div>
              </form>
              <button onClick={submitUpdate} className='update-form__button'>Submit update</button>
            </div>
          
          
          : null}
        </div>
        <div className='add-report__main-tools'>
          <div className='add-report__main-tools-info'>
          {(weekAuxFilter(week).length !== 0) ? <h3>{success}</h3> 
          : <h3>{error}</h3>}
            <h3>
              Your selected week is: <span>{week}</span>
            </h3>
            <h3>Your current dedication for this project is: <span>{currentDedication}</span></h3>
          </div>
        <div className="add-report__main-tools-calendar">
          <h3>Select a day to see your reports</h3>
          <CalendarComponent date={date} onDateChange={onDateChange}/>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Reports;

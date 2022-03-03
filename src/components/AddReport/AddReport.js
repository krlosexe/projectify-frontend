import React, { useState, useEffect } from 'react';
import CalendarComponent from '../Calendar'
import { weekNumber } from 'weeknumber';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

import {base_url, Api} from '../../Env';


import './AddReport.scss'

const AddReport = (props) => {

  const  { auth }                     = useAuth();
  const [date, setDate]               = useState(new Date());
  const [week, setWeek]               = useState(weekNumber(date));
  const [dedication, setDedication]   = useState(0);
  const [project, setProject]         = useState(0);
  const [NameProject, setNameProject] = useState("");
  const [projects, setProjects]       = useState([]);
  const [success, setSuccess]         = useState("Looks like everything is fine. We will keep you inform")
  const [error, setError]             = useState("");

  useEffect(()=>{
    setProjects(props.projects)
  },[props.projects])

  const onDateChange = (date) => {
    setDate(date)
    setWeek(weekNumber(date));
  }

  const onProjectChange = (value) => {
    setNameProject(value.target.options[value.target.selectedIndex].text)
    setProject(value.target.value);
  }

  const onDedicationChange = (value) => {
   
    setDedication(parseInt(value.target.value));
  }

  const onSubmit = async (event) =>  {
    event.preventDefault();
    setSuccess("");
    setError("");


    if(project == 0){
      alert("SELECCIONE UN PROYETO")
      return false
    }

    const data = {
      "id_project" :project,
      "id_user" :  localStorage.getItem("id_user"),
      "number_week" : week,
      "hours_dedication" : dedication 
    }

  
    axios.post(base_url(Api, "projects/report/week"), data, {
      headers: {
        'access-token': `${auth.token}`
      }
    }).then(()=>{
      setSuccess("You successfully made your weekly report! ")   
    }).catch((error)=>{
        setError(error.response.data.message);
    })
  }

  return (  
    <div className='add-report'>
      <div className='add-report__header'>
        <h2 className='add-report__header-title'>Welcome!</h2>
      </div>
      <div className='add-report__main'>
        <div className='add-report__main-selection'>
            <form className='form'>
              <div className='form__group'>
                <label className="form__label"  htmlFor="project">Choose your project</label>
                <select className='form__select' id="project" name="project" value={project} onChange={onProjectChange} required>
                   <option  value="">Seleccine un Proyecto</option>
                  {
                    projects.map((item, key)=>{
                      return <option key={key} value={item._id}>{item.name}</option>
                    })
                  }
                </select>
              </div>
              <div className='form__group'>
                <label className='form__label' htmlFor="dedication">Choose your project dedication time</label>
                <input className="form__number" type="number" defaultValue={0} onChange={onDedicationChange} htmlFor="dedication"/>
              </div>
              <div className='form__button'>
                <button className='form__button-btn' onClick={onSubmit} type='submit'>Submit your report</button>
              </div>
            </form>
            <div className='add-report__main-selection-status'>
              {error ? 
                <h3 className='error'>
                  {error}
                </h3>
                : <h3>
                    {success}
                  </h3>}
            </div>
        </div>
        <div className='add-report__main-tools'>
          <div className='add-report__main-tools-info'>
            <h3>
              Your selected project is: <span>{NameProject}</span>
            </h3>
            <h3>
              Your selected week is: <span>{week}</span>
            </h3>
          </div>
        <div className="add-report__main-tools-calendar">
          <h3>Select the week for your report</h3>
          <CalendarComponent date={date} onDateChange={onDateChange}/>
        </div>
        </div>
      </div>
    </div>
  )
};

export default AddReport;

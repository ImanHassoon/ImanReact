import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';



function App() { /** this function return a JSX element, script */
                 /** map is loop function in array */
                                    /** it imaportant to identify key of array element */
    const [activities, setActivities]= useState<Activity[]>([]);
    const [selectedActivity , setSelectedActivity] = useState<Activity |undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
      axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response => {
         setActivities(Response.data);
      })
    },[])
    function handleSelectActivity(id: string) {
      setSelectedActivity(activities.find(x=> x.id == id))
    }
    
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }
    function handleFormOpen(id?: string)
    {
      id ? handleSelectActivity(id) :handleCancelSelectActivity(); //? if id has a value
      setEditMode(true);
    }
    function handleFormClose() {
      setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
      activity.id ? setActivities([...activities.filter(x=> x.id !== activity.id), activity])// ...activities loop over existing activities to check the id for edit it
                  : setActivities([...activities, {...activity, id:uuid()}]); // ...spread to add new activity to activities array
      setEditMode(false);                                                     // with new id created by uuid
      setSelectedActivity(activity); // set to the current activity we created


    }
    function handleDeletActivity(id: string){
      setActivities([...activities.filter(x=>x.id !==id)])
    }
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{MarginTop:'7em'}}>
         <ActivityDashboard 
         activities={activities} 
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}

         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createOrEdit={handleCreateOrEditActivity}
         deleteActivity={handleDeletActivity}

        
         />
      </Container>
       
    </Fragment>
  );
}

export default App;

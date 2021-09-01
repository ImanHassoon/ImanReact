import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';



function App() { /** this function return a JSX element, script */
                 /** map is loop function in array */
                                    /** it imaportant to identify key of array element */
    const [activities, setActivities]= useState<Activity[]>([]);
    const [selectedActivity , setSelectedActivity] = useState<Activity |undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting , setSubmitting] = useState(false);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      agent.Activities.list().then(response => {
        let activities: Activity[] =[];
        response.forEach(activity => {
          activity.date =activity.date.split('T')[0];
          activities.push(activity);
        })
         setActivities(response);
         setLoading(false);
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
      setSubmitting(true);
      if(activity.id) {
      
        agent.Activities.update(activity).then(() => {
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
      } else {
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          setActivities([...activities, activity])
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
        })
      }



      //activity.id ? setActivities([...activities.filter(x=> x.id !== activity.id), activity])// ...activities loop over existing activities to check the id for edit it
              //    : setActivities([...activities, {...activity, id:uuid()}]); // ...spread to add new activity to activities array
      //setEditMode(false);                                                     // with new id created by uuid
     // setSelectedActivity(activity); // set to the current activity we created


    }
    function handleDeletActivity(id: string){
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter(x=>x.id !==id)]);
        setSubmitting(false);
      })
     
    }
    if (loading) return <LoadingComponent content='loading app' />
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container>
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
         submitting={submitting}

        
         />
      </Container>
       
    </Fragment>
  );
}

export default App;

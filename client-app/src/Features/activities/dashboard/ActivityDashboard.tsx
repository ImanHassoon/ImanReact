import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Probs {

    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity:(id: string) => void;
}
export default function ActivityDashboard({activities, selectedActivity, 
    selectActivity , cancelSelectActivity , editMode, openForm, closeForm, createOrEdit, deleteActivity}: Probs) {
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities}
             selectActivity={selectActivity} 
             deleteActivity={deleteActivity}
             />
                   
            </Grid.Column>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
              <ActivityDetails 
              activity={selectedActivity} 
              cancelSelectActivity={cancelSelectActivity} 
              openForm={openForm}

              />}
              {editMode &&
              <ActivityForm closeForm={closeForm} activity={selectedActivity} 
              createOrEdit={createOrEdit} />}
            </GridColumn>
        </Grid>
    )
}
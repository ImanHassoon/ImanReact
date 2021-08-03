import React from "react";
import { Button, Item, Segment, Label} from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity:(id: string) => void;

}

export default function ActivityList({activities , selectActivity, deleteActivity}: Props)
{
    return (
        <Segment style={{marginTop: '7em'}}>
            
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>

                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.descr}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                            <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red' />
                            <Label basic content={activity.catg} />
                        </Item.Extra>
                    </Item.Content>
                     
                    </Item>                ))}
            </Item.Group>
        </Segment>
    )
}

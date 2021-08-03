import React from "react";
import { Button, ButtonGroup, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {

    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activity , cancelSelectActivity , openForm}: Props) {
    return (
    
            <Card fluid style={{marginTop:'7em'}}>
              <Image src={`/assets/categoryImages/${activity.catg}.jpg`} />
              <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                  <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                  {activity.descr}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group widths='2'>
                  <Button basic onClick={() => openForm(activity.id)} color='blue' content='Edit' />
                  <Button onClick={cancelSelectActivity} basic color='grey' content='cancel' />
                  </Button.Group>
              </Card.Content>
            </Card>
          )
    
}
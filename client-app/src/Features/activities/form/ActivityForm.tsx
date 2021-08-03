import React, { ChangeEvent, useDebugValue } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({activity: selectedActivity, closeForm , createOrEdit}: Props) {
    const initialState= selectedActivity ?? {
        id: '',
        title: '',
        catg: '',
        descr:'',
        date:'',
        city:'',
        venue:''
    }
    const [activity, setActivity] =useState(initialState);
    function handleSubmit() {
        createOrEdit(activity);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
          const {name, value} =event.target; // destructure two properties name and value , blong to Form.Input placeholder='title' value={activity.title} name='title'
          setActivity({...activity,[name]: value}); // ....spread the existing properties of the activity , and target the property that matches this 'name ' which is title property
        }
        /**name='' must be the exact field name in DB and onchange with allow user to enter input */
    return (
        <Segment clearing style={{marginTop:'10em'}}>
            <Form onSubmit={handleSubmit} autoComplete='off'> 
                <Form.Input placeholder='title' value={activity.title} name='title' onChange={handleInputChange}/> 
                <Form.TextArea placeholder='descr' value={activity.descr} name='descr' onChange={handleInputChange} />
                <Form.Input placeholder='catg' value={activity.catg} name='catg' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Vnue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}
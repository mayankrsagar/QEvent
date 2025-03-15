"use client";
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import EventDetailsCard from '@/components/EventDetailsCard';

const EventDetail=({params})=>{

const [eventData,setEventData]=useState({});
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await axios.get(`https://qevent-backend.labs.crio.do/events/${params.eventId}`);
            setEventData(response.data);
        }
        fetchData();
    },[params])

   

    return(

    <div className='w-full'>
        <EventDetailsCard  eventDetail={eventData}/>
    </div>
)
}
export default EventDetail;
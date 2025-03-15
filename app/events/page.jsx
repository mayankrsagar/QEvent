"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import EventCard from '@/components/EventCard';

const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [filteredTagData,setFilteredTagData]=useState([]);
  const artist = searchParams.get('artist'); 
  const tagParam = searchParams.get('tag');
  const tag = tagParam ? tagParam.toLowerCase() : '';
  useEffect(() => { 
    fetchData();
  }, [artist, tag]);

  useEffect(() => {
    const filterData = () => {
      if (tag) {
        // Case-insensitive tag comparison
        const filtered = eventData.filter((data) =>
          Array.isArray(data.tags) &&
          data.tags.some((t) => t.toLowerCase() === tag)
        );
        setFilteredTagData(filtered);
      } else {
        setFilteredTagData(eventData); // Show all if no tag
      }
    };
    filterData();
  }, [eventData, tag]);


  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "https://qevent-backend.labs.crio.do/events";
      if (artist) {
        url += `?artist=${encodeURIComponent(artist)}`;
      }
      const response = await axios.get(url);
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {loading ? (
      <p>Loading events...</p>
    ) : filteredTagData && filteredTagData.length > 0 ? (
      filteredTagData.map((event) => (
        <EventCard eventData={event} key={event.id} />
      ))
    ) : (
      <p>No events found {artist ? `for ${artist}` : ""}{tag ? ` with tag "${tag}"` : ""}.</p>
    )}
  </div>
  );
};

export default Events;

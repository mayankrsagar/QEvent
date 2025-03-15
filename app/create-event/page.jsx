"use client";
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const CreateEvent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tagsList, setTagsList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    tags: [],
    image: "",
    artist: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.warning("Please login to create events");
      router.push('/');
    }
  }, [status, router]);

  const fetchTags = async () => {
    try {
      const response = await axios.get("https://qevent-backend.labs.crio.do/tags");
      // If API returns objects, format them properly
      const formattedTags = response.data.map(tag => ({
        id: tag.id,
        name: tag.name.toLowerCase()
      }));
      setTagsList(formattedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Fix 2: Proper datetime input handling
  const splitDateTime = (datetimeStr) => {
    if (!datetimeStr) return { date: '', time: '' };
    const [date, time] = datetimeStr.split('T');
    return { 
      date, 
      time: time ? time.slice(0, 5) : '' // Ensure HH:MM format
    };
  };

  // Fix 3: Correct state update for datetime
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "datetime") {
      const { date, time } = splitDateTime(value);
      setFormData(prev => ({
        ...prev,
        date,
        time
      }));
      return; // Prevent further state updates
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag.name)
        ? prev.tags.filter(t => t !== tag.name) // Filter by string
        : [...prev.tags, tag.name] // Store only the tag name
    }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

   // Fix 4: Proper image URL generation
   const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.tags.length===0){
      toast.warning("At least select one tag");
      return ;
    }

    const eventData = {
      ...formData,
      image: `https://randomuser.me/api/portraits/men/${
        Math.floor(Math.random() * 99) + 1
      }.jpg`,
      id: uuidv4(),
    };

    try {
      const response = await fetch('https://qevent-backend.labs.crio.do/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.status === 201) {
        router.push("/events");
        console.log(response);
      } else {
        toast.warning("Event creation failed");
      }
    } catch (error) {
      toast.error("Error submitting event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="block mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist" className="block mb-2">Artist Name</label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="form-group">
      <label htmlFor="datetime" className="block mb-2">Date and Time</label>
      <input
        type="datetime-local"
        name="datetime"
        id="datetime"
        value={`${formData.date}T${formData.time}`}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
    </div>

    <div className="form-group">
        <label className="block mb-2">Tags</label>
        <div className="flex flex-wrap gap-3">
          {tagsList.map(tag => (
            <div key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={tag.id}
                checked={formData.tags.includes(tag.name)} // Check by string
                onChange={() => handleCheckboxChange(tag)}
                className="w-4 h-4"
              />
              <label htmlFor={tag.id} className="capitalize">
                {tag.name}
              </label>
            </div>
          ))}
        </div>
      </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
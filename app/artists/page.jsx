'use client';
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import ArtistCard from '@/components/ArtistCard';

const Artist = () => {
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://qevent-backend.labs.crio.do/artists");
        setArtistData(response.data);
      } catch (error) {
        console.error("The error is", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {loading ? (
        <div className="col-span-full text-center">Loading...</div>
      ) : artistData.length > 0 ? (
        artistData.map((artist) => (
          <ArtistCard artistData={artist} key={artist.id} />
        ))
      ) : (
        <div className="col-span-full text-center">No artists found.</div>
      )}
    </div>
  );
};

export default Artist;

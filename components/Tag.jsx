"use client";
import { useRouter } from 'next/navigation';

const Tag = ({ text }) => {
  const router = useRouter();

  const handleTagClick = () => {
    router.push(`/events?tag=${encodeURIComponent(text)}`);
  };

  return (
    <div
      className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer"
      onClick={handleTagClick}
    >
      # {text}
    </div>
  );
};

export default Tag;

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaChartLine, FaUsers, FaPen, FaGift, FaBrain, FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [ebbPoints, setEbbPoints] = useState(0);
  const [dailyCheckIn, setDailyCheckIn] = useState({
    mood: 5,
    workload: 5,
    sleep: 5,
    selfCare: 5,
  });
  const [journalEntry, setJournalEntry] = useState('');
  const [hobbyGroups, setHobbyGroups] = useState([
    { id: 1, name: 'Art & Creativity', members: 128, active: true },
    { id: 2, name: 'Fitness & Wellness', members: 256, active: true },
    { id: 3, name: 'Music & Performance', members: 192, active: true },
    { id: 4, name: 'Reading & Writing', members: 164, active: true },
  ]);
  const [aiInsights, setAiInsights] = useState({
    moodTrend: 'Improving',
    recommendations: [
      'Try a 10-minute meditation session today',
      'Consider joining the Art & Creativity hobby group',
      'Your sleep quality has improved by 15% this week',
    ],
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleCheckInChange = (metric, value) => {
    setDailyCheckIn({
      ...dailyCheckIn,
      [metric]: value,
    });
  };

  const submitDailyCheckIn = async () => {
    // In a real app, this would save to Supabase
    setEbbPoints(ebbPoints + 10);
    alert('Daily check-in submitted! +10 Ebboints');
  };

  const submitJournalEntry = async () => {
    if (journalEntry.trim()) {
      // In a real app, this would save to Supabase
      setEbbPoints(ebbPoints + 5);
      setJournalEntry('');
      alert('Journal entry saved! +5 Ebboints');
    }
  };

  const joinHobbyGroup = (groupId) => {
    setHobbyGroups(
      hobbyGroups.map((group) =>
        group.id === groupId ? { ...group, active: !group.active } : group
      )
    );
    setEbbPoints(ebbPoints + 15);
    alert('Joined hobby group! +15 Ebboints');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user?.user_metadata?.username || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Your mental wellness journey starts here. Complete your daily check-in to earn Ebboints!
          </p>
          <div className="mt-4 flex items-center">
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
              {ebbPoints} Ebboints
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Check-in Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaChartLine className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Daily Emotional Check-in</h2>
            </div>
            <p className="text-gray-600 mb-4">
              How are you feeling today? Take 2 minutes to track your wellness metrics.
            </p>
            <div className="space-y-4">
              {Object.entries(dailyCheckIn).map(([metric, value]) => (
                <div key={metric}>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <span className="text-sm text-gray-500">{value}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => handleCheckInChange(metric, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
              <button
                onClick={submitDailyCheckIn}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Submit Check-in
              </button>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaBrain className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">AI Weekly Insights</h2>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <p className="text-indigo-800 font-medium">
                Your mood trend: <span className="text-green-600">{aiInsights.moodTrend}</span>
              </p>
            </div>
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {aiInsights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hobby Groups Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaUsers className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Hobby Groups</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Connect with like-minded peers through shared interests.
            </p>
            <div className="space-y-3">
              {hobbyGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members} members</p>
                  </div>
                  <button
                    onClick={() => joinHobbyGroup(group.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      group.active
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {group.active ? 'Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Journaling Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaPen className="text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Text Journaling</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Reflect on your day with guided prompts.
            </p>
            <div className="space-y-4">
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="How are you feeling today? What's on your mind?"
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={submitJournalEntry}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>

        {/* Ebboints Rewards Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <div className="flex items-center mb-4">
            <FaGift className="text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Ebboints Rewards</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Redeem your Ebboints for exciting rewards!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Gift Cards</h3>
              <p className="text-sm text-gray-500 mb-2">Starting at 500 points</p>
              <button className="text-indigo-600 text-sm flex items-center">
                View Options <FaArrowRight className="ml-1" />
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Merchandise</h3>
              <p className="text-sm text-gray-500 mb-2">Starting at 300 points</p>
              <button className="text-indigo-600 text-sm flex items-center">
                View Options <FaArrowRight className="ml-1" />
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">Event Passes</h3>
              <p className="text-sm text-gray-500 mb-2">Starting at 200 points</p>
              <button className="text-indigo-600 text-sm flex items-center">
                View Options <FaArrowRight className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
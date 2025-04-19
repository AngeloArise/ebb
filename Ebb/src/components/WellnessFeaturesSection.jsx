import { FaUsers, FaTrophy, FaChartLine, FaBrain, FaQuoteLeft, FaPalette, FaMusic, FaRunning, FaBook, FaMicrophone, FaStop } from 'react-icons/fa';
import { useState, useRef } from 'react';

const WellnessFeaturesSection = () => {
  const [moodValues, setMoodValues] = useState({
    feeling: 50,
    workload: 50,
    sleep: 50,
    selfTime: 50
  });
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  const handleSliderChange = (key, value) => {
    setMoodValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Update audio level visualization
      const updateAudioLevel = () => {
        if (!isRecording) return;
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        
        requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();

      // Handle recording completion
      mediaRecorder.ondataavailable = (e) => {
        const audioUrl = URL.createObjectURL(e.data);
        console.log('Recording complete:', audioUrl);
        // Here you would typically send the audio to your backend
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
    setAudioLevel(0);
  };

  const features = [
    {
      icon: <FaPalette className="text-3xl text-blue-500" />,
      title: "Hobby Exploration Groups",
      description: "Discover new interests and connect with like-minded peers in a relaxed environment",
      benefits: [
        "Low-pressure group activities",
        "Diverse hobby categories",
        "Flexible participation"
      ],
      testimonial: {
        text: "The art group helped me find my creative side. It's the perfect break from my engineering coursework.",
        author: "Rahul Sharma, Computer Science Engineering"
      }
    },
    {
      icon: <FaChartLine className="text-3xl text-yellow-500" />,
      title: "Daily Emotional Check-ins",
      description: "Simple, reflective questions to track your mood and stress levels",
      benefits: [
        "Quick 2-minute check-ins",
        "Pattern recognition",
        "Early stress detection"
      ],
      testimonial: {
        text: "The daily check-ins help me stay aware of my stress levels. It's like having a personal wellness coach.",
        author: "Priya Patel, Electronics Engineering"
      }
    },
    {
      icon: <FaBrain className="text-3xl text-green-500" />,
      title: "AI Weekly Insights",
      description: "Get personalized analysis of your emotional journey and hobby engagement",
      benefits: [
        "Weekly progress reports",
        "Hobby recommendations",
        "Stress pattern analysis"
      ],
      testimonial: {
        text: "The AI insights suggested I try photography, and it's become my favorite stress-reliever.",
        author: "Arjun Mehta, Mechanical Engineering"
      }
    },
    {
      icon: <FaTrophy className="text-3xl text-purple-500" />,
      title: "Ebboints Rewards",
      description: "Earn points for engagement and redeem them for exciting rewards",
      benefits: [
        "Gift cards and event tickets",
        "Campus activity passes",
        "Wellness product discounts"
      ],
      testimonial: {
        text: "Earning Ebboints for exploring hobbies makes self-care feel rewarding. I've already redeemed points for concert tickets!",
        author: "Ananya Reddy, Civil Engineering"
      }
    }
  ];

  const hobbyCategories = [
    { icon: <FaPalette />, name: "Art & Design" },
    { icon: <FaMusic />, name: "Music" },
    { icon: <FaRunning />, name: "Sports & Fitness" },
    { icon: <FaBook />, name: "Reading & Writing" }
  ];

  const checkInQuestions = [
    { emoji: "😊", text: "How are you feeling today?" },
    { emoji: "📚", text: "How's your academic workload?" },
    { emoji: "💤", text: "Did you get enough sleep?" },
    { emoji: "🧘", text: "Have you taken time for yourself?" }
  ];

  return (
    <section className="py-16 bg-white" id="wellness-features">
      <div className="container mx-auto px-4">
        {/* Interactive Daily Check-in Demo */}
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg mb-16">
          <h3 className="text-2xl font-semibold text-center mb-6">Try Our Daily Check-in</h3>
          <div className="space-y-6">
            {checkInQuestions.map((question, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{question.emoji}</span>
                  <label className="block text-gray-700">{question.text}</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moodValues[Object.keys(moodValues)[index]]}
                  onChange={(e) => handleSliderChange(Object.keys(moodValues)[index], e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Not Great</span>
                  <span>Neutral</span>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isRecording 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isRecording ? <FaStop className="mr-2" /> : <FaMicrophone className="mr-2" />}
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
              {isRecording && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 transition-all duration-100"
                      style={{ width: `${audioLevel}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">Recording in progress...</p>
                </div>
              )}
            </div>
            <div className="text-center">
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Save Today's Check-in
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
              <div className="flex items-center space-x-4 mb-6">
                {feature.icon}
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2 mb-6">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="text-primary-600 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="bg-white p-4 rounded-lg">
                <FaQuoteLeft className="text-primary-600 mb-2" />
                <p className="text-gray-600 italic mb-2">{feature.testimonial.text}</p>
                <p className="text-sm text-gray-500">— {feature.testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hobby Categories */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Explore Popular Hobby Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hobbyCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center transform hover:-translate-y-1 transition-transform duration-200">
                <div className="text-3xl text-primary-600 mb-3">{category.icon}</div>
                <h4 className="font-semibold">{category.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <button 
            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors transform hover:scale-105"
            onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })}
          >
            Start Exploring Hobbies
          </button>
        </div>
      </div>
    </section>
  );
};

export default WellnessFeaturesSection; 
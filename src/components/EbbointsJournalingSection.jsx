import { FaMicrophone, FaPen, FaFire, FaGift, FaTicketAlt, FaCoffee, FaShoppingBag, FaStop } from 'react-icons/fa';
import { useState, useRef } from 'react';

const EbbointsJournalingSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const timerRef = useRef(null);

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
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

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
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setAudioLevel(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextJournalSave = async () => {
    if (!journalText.trim()) return;
    
    setIsSaving(true);
    try {
      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Journal entry saved:', journalText);
      setJournalText('');
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const journalingOptions = [
    {
      icon: <FaPen className="text-3xl text-blue-500" />,
      title: "Text Journaling",
      description: "Write your thoughts and reflections at your own pace",
      benefits: [
        "Perfect for deep reflection",
        "Easy to review later",
        "Great for tracking progress"
      ]
    },
    {
      icon: <FaMicrophone className="text-3xl text-purple-500" />,
      title: "Voice Journaling",
      description: "Speak your mind when writing feels like too much",
      benefits: [
        "Quick and natural",
        "Perfect for busy days",
        "Capture emotions in your voice"
      ]
    }
  ];

  const earningMethods = [
    {
      points: "+10",
      action: "Daily Check-in",
      description: "Complete your daily emotional check-in (voice or text)"
    },
    {
      points: "+5",
      action: "Streak Bonus",
      description: "Maintain your daily check-in streak"
    },
    {
      points: "+15",
      action: "Journaling Prompt",
      description: "Complete a suggested journaling exercise"
    }
  ];

  const rewards = [
    {
      icon: <FaGift className="text-3xl text-red-500" />,
      title: "Gift Cards",
      description: "Redeem for Swiggy, Zomato, and more"
    },
    {
      icon: <FaShoppingBag className="text-3xl text-pink-500" />,
      title: "College Merch",
      description: "Official university merchandise"
    },
    {
      icon: <FaTicketAlt className="text-3xl text-purple-500" />,
      title: "Event Passes",
      description: "Access to campus events"
    },
    {
      icon: <FaCoffee className="text-3xl text-amber-600" />,
      title: "Café Discounts",
      description: "Discounts at campus spots"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50" id="ebboints-journaling">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ebboints + Journaling — Wellness That Adapts to You
          </h2>
          <p className="text-xl text-gray-600">
            Choose how you want to reflect and earn rewards that make your college experience better.
          </p>
        </div>

        {/* Journaling Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Flexible Journaling Options</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {journalingOptions.map((option, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
                <div className="flex justify-center mb-6">{option.icon}</div>
                <h4 className="text-2xl font-semibold text-center mb-4">{option.title}</h4>
                <p className="text-gray-600 text-center mb-6">{option.description}</p>
                <ul className="space-y-2">
                  {option.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="text-primary-600 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Journal Sample */}
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <FaMicrophone className="text-2xl text-purple-500" />
            <h4 className="text-xl font-semibold">Voice Journal</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            {isRecording ? (
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 transition-all duration-100"
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Recording time: {formatTime(recordingTime)}</span>
                  <button 
                    onClick={stopRecording}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <FaStop className="mr-2" />
                    Stop Recording
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button 
                  onClick={startRecording}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center mx-auto"
                >
                  <FaMicrophone className="mr-2" />
                  Start Recording
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Text Journal */}
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <FaPen className="text-2xl text-blue-500" />
            <h4 className="text-xl font-semibold">Text Journal</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full h-40 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleTextJournalSave}
                disabled={!journalText.trim() || isSaving}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  !journalText.trim() || isSaving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                } transition-colors`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaPen className="mr-2" />
                    Save Entry
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Earning Methods */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">How to Earn Ebboints</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {earningMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">{method.points}</div>
                <h4 className="text-xl font-semibold mb-2">{method.action}</h4>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Redeem Your Points</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
                <div className="flex justify-center mb-4">{reward.icon}</div>
                <h4 className="text-xl font-semibold text-center mb-2">{reward.title}</h4>
                <p className="text-gray-600 text-center">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbbointsJournalingSection; 
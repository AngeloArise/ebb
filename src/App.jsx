import { FaHeart, FaBrain, FaUsers, FaGift, FaExclamationTriangle, FaCalendarAlt, FaPhone, FaGlobe, FaMapMarkerAlt, FaUser, FaLock, FaEnvelope, FaLocationArrow } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EbbointsJournalingSection from './components/EbbointsJournalingSection';
import WellnessFeaturesSection from './components/WellnessFeaturesSection';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { supabase } from './lib/supabaseClient';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to home page but save the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Landing page component
const LandingPage = ({ showAuthModal, setShowAuthModal, showSOSModal, setShowSOSModal, handleLogout, isAuthenticated }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [collegeInfo, setCollegeInfo] = useState({
    name: "Your College",
    counselingCenter: {
      name: "Campus Counseling Center",
      number: "1800-765-4321",
      hours: "24/7"
    },
    healthCenter: {
      name: "Campus Health Center",
      number: "1800-987-6543",
      hours: "Mon-Fri: 8AM-8PM"
    },
    security: {
      name: "Campus Security",
      number: "1800-123-4567",
      hours: "24/7"
    }
  });

  useEffect(() => {
    if (showSOSModal) {
      getLocation();
    }
  }, [showSOSModal]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const crisisResources = [
    {
      icon: <FaPhone className="text-red-600" />,
      title: "Emergency Helpline",
      number: "1800-123-4567",
      description: "24/7 crisis support and counseling"
    },
    {
      icon: <FaGlobe className="text-red-600" />,
      title: collegeInfo.counselingCenter.name,
      number: collegeInfo.counselingCenter.number,
      description: `Available ${collegeInfo.counselingCenter.hours}`
    },
    {
      icon: <FaMapMarkerAlt className="text-red-600" />,
      title: collegeInfo.healthCenter.name,
      number: collegeInfo.healthCenter.number,
      description: `Available ${collegeInfo.healthCenter.hours}`
    },
    {
      icon: <FaLocationArrow className="text-red-600" />,
      title: collegeInfo.security.name,
      number: collegeInfo.security.number,
      description: `Available ${collegeInfo.security.hours}`
    }
  ];

  const upcomingEvents = [
    {
      title: "Mindfulness Meditation Workshop",
      date: "May 25, 2025",
      time: "4:00 PM",
      location: "Student Wellness Center",
      description: "Join us for a guided meditation session to reduce stress and improve focus."
    },
    {
      title: "Art Therapy Session",
      date: "May 28, 2025",
      time: "3:00 PM",
      location: "Campus Art Studio",
      description: "Express yourself through art in a supportive, creative environment."
    },
    {
      title: "Yoga for Stress Relief",
      date: "May 30, 2025",
      time: "5:30 PM",
      location: "Campus Gym",
      description: "Learn yoga techniques to manage academic stress and improve well-being."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Mental Wellness Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Daily check-ins, AI insights, and hobby exploration to support your college journey.
            </p>
            <div>
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors mr-4">
                Start Your Wellness Journey
              </button>
              <button className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Insight Section */}
      <section className="py-16 bg-white" id="problem">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The Silent Struggle of Student Mental Health</h2>
            <p className="text-lg text-gray-600 mb-8">
              College students often face stress, anxiety, and burnout in silence. Ebb provides proactive support through daily check-ins, AI insights, and immediate access to help when needed.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <StatCard number="72%" description="of college students report experiencing stress that affects their academic performance" />
              <StatCard number="40%" description="of students don't seek help due to stigma or lack of awareness" />
              <StatCard number="85%" description="of students who use Ebb report improved stress management" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Ebb Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaHeart className="text-primary-600" />}
              title="Daily Check-ins"
              description="Quick, reflective questions to track your mood and stress levels."
            />
            <FeatureCard
              icon={<FaBrain className="text-primary-600" />}
              title="AI Insights"
              description="Personalized weekly summaries and actionable recommendations."
            />
            <FeatureCard
              icon={<FaUsers className="text-primary-600" />}
              title="Hobby Groups"
              description="Connect with peers through shared interests in a relaxed environment."
            />
            <FeatureCard
              icon={<FaGift className="text-primary-600" />}
              title="Ebboints"
              description="Earn rewards for engagement and redeem them for exciting perks."
            />
          </div>
        </div>
      </section>

      {/* Wellness Features Section */}
      <WellnessFeaturesSection />

      {/* Upcoming Events Section */}
      <section className="py-12 bg-white" id="events">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Upcoming Wellness Events</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-primary-600 mr-2" />
                    <span className="text-sm text-gray-600">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>
                  <button className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors w-full">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ebboints + Journaling Section */}
      <EbbointsJournalingSection />

      {/* Student CTA Section */}
      <section className="py-16 bg-primary-600 text-white" id="signup">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Prioritize Your Mental Wellness?</h2>
          <p className="text-xl mb-8">Join thousands of students who are taking control of their mental health with Ebb.</p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Colleges & Universities Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Help Your Students Thrive</h2>
            <p className="text-xl mb-8">
              As a college or university, you have the opportunity to support your students' well-being by enrolling in Ebb. Give them the tools and resources they need to prioritize their mental health in a simple, effective way.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Schedule a Demo
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Contact Our Team
              </button>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Proactive Support</h3>
                <p className="text-gray-200">Help students catch stress early and prevent burnout before it happens.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
                <p className="text-gray-200">Access anonymized wellness trends to better support your student body.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Campus Integration</h3>
                <p className="text-gray-200">Seamlessly connect students with campus resources and support services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ebb</h3>
              <p className="text-gray-400">Your mental wellness companion for college success.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Ebb. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

const App = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [collegeInfo, setCollegeInfo] = useState({
    name: "Your College",
    counselingCenter: {
      name: "Campus Counseling Center",
      number: "1800-765-4321",
      hours: "24/7"
    },
    healthCenter: {
      name: "Campus Health Center",
      number: "1800-987-6543",
      hours: "Mon-Fri: 8AM-8PM"
    },
    security: {
      name: "Campus Security",
      number: "1800-123-4567",
      hours: "24/7"
    }
  });

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (showSOSModal) {
      getLocation();
    }
  }, [showSOSModal]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const crisisResources = [
    {
      icon: <FaPhone className="text-red-600" />,
      title: "Emergency Helpline",
      number: "1800-123-4567",
      description: "24/7 crisis support and counseling"
    },
    {
      icon: <FaGlobe className="text-red-600" />,
      title: collegeInfo.counselingCenter.name,
      number: collegeInfo.counselingCenter.number,
      description: `Available ${collegeInfo.counselingCenter.hours}`
    },
    {
      icon: <FaMapMarkerAlt className="text-red-600" />,
      title: collegeInfo.healthCenter.name,
      number: collegeInfo.healthCenter.number,
      description: `Available ${collegeInfo.healthCenter.hours}`
    },
    {
      icon: <FaLocationArrow className="text-red-600" />,
      title: collegeInfo.security.name,
      number: collegeInfo.security.number,
      description: `Available ${collegeInfo.security.hours}`
    }
  ];

  const upcomingEvents = [
    {
      title: "Mindfulness Meditation Workshop",
      date: "May 25, 2025",
      time: "4:00 PM",
      location: "Student Wellness Center",
      description: "Join us for a guided meditation session to reduce stress and improve focus."
    },
    {
      title: "Art Therapy Session",
      date: "May 28, 2025",
      time: "3:00 PM",
      location: "Campus Art Studio",
      description: "Express yourself through art in a supportive, creative environment."
    },
    {
      title: "Yoga for Stress Relief",
      date: "May 30, 2025",
      time: "5:30 PM",
      location: "Campus Gym",
      description: "Learn yoga techniques to manage academic stress and improve well-being."
    }
  ];

  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary-600">Ebb</div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-primary-600">Features</a>
                <a href="#wellness-features" className="text-gray-600 hover:text-primary-600">Hobbies</a>
                <a href="#events" className="text-gray-600 hover:text-primary-600">Events</a>
                <a href="#ebboints-journaling" className="text-gray-600 hover:text-primary-600">Ebboints</a>
                <a href="#faq" className="text-gray-600 hover:text-primary-600">FAQ</a>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  onClick={() => setShowSOSModal(true)}
                >
                  <FaExclamationTriangle className="mr-2" />
                  SOS
                </button>
                {isAuthenticated ? (
                  <button 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <button 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Auth Modal */}
        {showAuthModal && (
          <AuthForm onClose={() => setShowAuthModal(false)} />
        )}

        {/* SOS Modal */}
        {showSOSModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-red-600">Emergency Support</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowSOSModal(false)}
                >
                  ✕
                </button>
              </div>
              
              {userLocation && (
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center space-x-3">
                    <FaLocationArrow className="text-red-600" />
                    <div>
                      <h3 className="font-semibold">Your Current Location</h3>
                      <p className="text-sm text-gray-600">
                        Latitude: {userLocation.latitude.toFixed(6)}<br />
                        Longitude: {userLocation.longitude.toFixed(6)}
                      </p>
                      <a 
                        href={`https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 mb-6">
                If you're in immediate distress, please reach out to one of these resources:
              </p>
              <div className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{resource.icon}</div>
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <a 
                          href={`tel:${resource.number}`}
                          className="text-red-600 hover:text-red-700 block"
                        >
                          {resource.number}
                        </a>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button 
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => setShowSOSModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={
            <LandingPage 
              showAuthModal={showAuthModal}
              setShowAuthModal={setShowAuthModal}
              showSOSModal={showSOSModal}
              setShowSOSModal={setShowSOSModal}
              handleLogout={handleLogout}
              isAuthenticated={isAuthenticated}
            />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-3xl font-bold text-primary-600 mb-2">{number}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default App;

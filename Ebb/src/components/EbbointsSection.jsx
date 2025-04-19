import { FaGift, FaFire, FaPen, FaUserPlus, FaCoffee, FaTicketAlt, FaShoppingBag } from 'react-icons/fa';

const EbbointsSection = () => {
  const earningMethods = [
    {
      icon: <FaFire className="text-3xl text-orange-500" />,
      title: "Daily Check-ins",
      description: "Earn points for consistent daily check-ins and maintain your streak"
    },
    {
      icon: <FaPen className="text-3xl text-blue-500" />,
      title: "Journaling",
      description: "Complete mindfulness exercises and journaling prompts"
    },
    {
      icon: <FaUserPlus className="text-3xl text-green-500" />,
      title: "Refer Friends",
      description: "Get bonus points when you invite friends to join Ebb"
    }
  ];

  const rewards = [
    {
      icon: <FaCoffee className="text-3xl text-amber-600" />,
      title: "Campus Café Discounts",
      description: "Enjoy discounts at your favorite campus spots"
    },
    {
      icon: <FaTicketAlt className="text-3xl text-purple-500" />,
      title: "Event Passes",
      description: "Access to exclusive campus events and activities"
    },
    {
      icon: <FaShoppingBag className="text-3xl text-pink-500" />,
      title: "College Merch",
      description: "Redeem points for official college merchandise"
    },
    {
      icon: <FaGift className="text-3xl text-red-500" />,
      title: "Gift Cards",
      description: "Redeem for popular services like Swiggy and Zomato"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50" id="ebboints">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ebboints – Wellness That Rewards You
          </h2>
          <p className="text-xl text-gray-600">
            Turn your wellness journey into rewards! Earn points for taking care of your mental health and redeem them for exciting perks.
          </p>
        </div>

        {/* Earning Methods */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">How to Earn Ebboints</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {earningMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
                <div className="flex justify-center mb-4">{method.icon}</div>
                <h4 className="text-xl font-semibold text-center mb-2">{method.title}</h4>
                <p className="text-gray-600 text-center">{method.description}</p>
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

        {/* Streak Tracker */}
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-4xl font-bold text-primary-600">120</div>
            <div className="text-left">
              <p className="font-semibold">Ebboints earned this week!</p>
              <p className="text-sm text-gray-500">Keep up the great work!</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors transform hover:scale-105"
            onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })}
          >
            Start Earning Ebboints
          </button>
        </div>
      </div>
    </section>
  );
};

export default EbbointsSection; 
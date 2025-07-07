import React from 'react';
import { ChefHat, Clock, Users, Calendar, Search, Share2 } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Recipe Discovery",
      description: "Find recipes based on your specific needs - prep time, ingredients, dietary restrictions, or meal type. Our intelligent filtering helps you discover exactly what you're looking for."
    },
    {
      icon: Clock,
      title: "Time-Conscious Cooking",
      description: "Every recipe includes detailed timing information. Whether you have 5 minutes or an hour, find recipes that fit your schedule perfectly."
    },
    {
      icon: Calendar,
      title: "Simple Meal Planning",
      description: "Organize your week with our intuitive meal planner. Drag and drop recipes into your weekly schedule and never wonder 'what's for dinner?' again."
    },
    {
      icon: Users,
      title: "No Account Required",
      description: "Start using QuickBite immediately. No signups, no passwords, no hassle. Just open and start cooking."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Found a great recipe? Share it with friends and family with just one click. Spread the joy of cooking!"
    },
    {
      icon: ChefHat,
      title: "Curated Content",
      description: "Every recipe is carefully selected to focus on practical, everyday cooking with ingredients you can actually find."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About QuickBite
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Your smart companion for everyday cooking and meal planning
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe cooking should be <strong>simple</strong>, <strong>accessible</strong>, and <strong>enjoyable</strong>.
              QuickBite was born from the daily struggle of answering "What should I cook?" - especially when you're
              short on time, ingredients, or inspiration.
            </p>
            <p className="text-lg text-gray-600">
              Our goal is to eliminate the friction between wanting to cook and actually cooking. No complicated
              workflows, no endless ingredient lists, no cooking show theatrics - just practical, delicious recipes
              that work in real kitchens for real people.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes QuickBite Special
            </h2>
            <p className="text-xl text-gray-600">
              Built for busy people who still want to eat well
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-900">Simplicity first:</strong> We prioritize recipes with common ingredients
                  and straightforward techniques. No hunting for specialty items or mastering complex skills.
                </p>
                <p>
                  <strong className="text-gray-900">Time-conscious:</strong> Every recipe respects your schedule. Whether
                  you're a busy parent, student, or professional, we help you cook within your time constraints.
                </p>
                <p>
                  <strong className="text-gray-900">Practical planning:</strong> Our meal planning tool is designed to be
                  actually useful, not overwhelming. Simple drag-and-drop functionality that fits real life.
                </p>
                <p>
                  <strong className="text-gray-900">No barriers:</strong> No accounts, no paywalls, no complicated onboarding.
                  Open the app and start cooking.
                </p>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-primary-900 mb-4">
                Perfect for:
              </h3>
              <ul className="space-y-3 text-primary-800">
                <li className="flex items-start">
                  <span className="bg-primary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Busy professionals who want home-cooked meals</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Students learning to cook on a budget</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Parents juggling family meals</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Anyone who wants to eat well without the fuss</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Fast, responsive, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">⚛️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">React Frontend</h3>
              <p className="text-gray-600">
                Modern, responsive user interface built with React and Tailwind CSS for a smooth experience on any device.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">🟢</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Node.js Backend</h3>
              <p className="text-gray-600">
                Reliable API built with Node.js and Express, designed for speed and scalability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimized Performance</h3>
              <p className="text-gray-600">
                Fast loading times and efficient data handling to keep your cooking workflow smooth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of home cooks who've simplified their meal planning with QuickBite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recipes"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Explore Recipes
            </a>
            <a
              href="/meal-planner"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-primary-500"
            >
              Plan Your Week
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

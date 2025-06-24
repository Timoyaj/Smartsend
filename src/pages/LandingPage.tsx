import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Users, BarChart2, Zap, Shield, Check } from 'lucide-react';

const LandingPage = () => {
  // Stats for animation
  const [deliveryRate, setDeliveryRate] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [customers, setCustomers] = useState(0);
  
  // Track if element is in viewport
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Function to animate counting
  const animateValue = (setter, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer to detect when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Start animation when stats section becomes visible
  useEffect(() => {
    if (isStatsVisible) {
      animateValue(setDeliveryRate, 0, 99.8, 2000);
      animateValue(setMessagesSent, 0, 5, 2500);
      animateValue(setCustomers, 0, 2500, 3000);
    }
  }, [isStatsVisible]);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">SmartSend</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Log In</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Bulk Messaging Made Simple</h1>
              <p className="text-xl mb-8">SmartSend helps businesses connect with their audience through seamless SMS and email campaigns. Reach thousands of customers in seconds.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition">Start Free Trial</Link>
                <a href="#features" className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium text-center hover:bg-white hover:bg-opacity-10 transition">Learn More</a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="SmartSend Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center transform transition duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {deliveryRate.toFixed(1)}%
              </div>
              <div className="text-gray-600">Delivery Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center transform transition duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {messagesSent}M+
              </div>
              <div className="text-gray-600">Messages Sent Daily</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center transform transition duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {customers.toLocaleString()}+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to create, send, and analyze your messaging campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Contact Management</h3>
              <p className="text-gray-600">Easily import, organize, and segment your contacts. Create custom fields and tags for precise targeting.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Channel Campaigns</h3>
              <p className="text-gray-600">Send SMS and email campaigns from a single platform. Reach your audience where they're most responsive.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
              <p className="text-gray-600">Track delivery rates, opens, clicks, and conversions in real-time. Make data-driven decisions to optimize your campaigns.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automation Workflows</h3>
              <p className="text-gray-600">Create automated sequences based on customer behavior. Deliver the right message at the right time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Tools</h3>
              <p className="text-gray-600">Stay compliant with built-in tools for managing opt-outs, consent, and regulatory requirements like GDPR and TCPA.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customizable Templates</h3>
              <p className="text-gray-600">Choose from dozens of professionally designed templates or create your own. Personalize messages with dynamic content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that's right for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">Perfect for small businesses just getting started</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {['1,000 SMS credits', '5,000 email credits', '1,000 contacts', 'Basic templates', 'Email support', 'Basic analytics'].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8 block text-center bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform scale-105 relative transition duration-300 hover:shadow-xl">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6 border-b bg-blue-600 text-white">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-blue-200 ml-2">/month</span>
                </div>
                <p className="text-blue-100">Ideal for growing businesses with regular campaigns</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    '5,000 SMS credits',
                    '25,000 email credits',
                    '10,000 contacts',
                    'Advanced templates',
                    'A/B testing',
                    'Phone support',
                    'Advanced analytics',
                    'API access'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8 block text-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">For businesses with high-volume messaging needs</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    '20,000 SMS credits',
                    '100,000 email credits',
                    '50,000 contacts',
                    'Custom templates',
                    'Automation workflows',
                    'Priority support',
                    'Advanced integrations',
                    'Custom reporting'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8 block text-center bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
                <p className="text-gray-600 max-w-2xl">Need a custom solution for your large organization? Our Enterprise plan offers unlimited messaging, dedicated account management, custom integrations, and more.</p>
              </div>
              <Link to="/contact" className="mt-6 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Businesses Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See what our customers have to say about SmartSend</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M10 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-6">"SmartSend has transformed how we communicate with our customers. The platform is intuitive, the deliverability is excellent, and the analytics help us continuously improve our messaging strategy."</p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M10 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-6">"We've tried several messaging platforms, but SmartSend stands out for its reliability and ease of use. Our appointment reminders now have a 98% delivery rate, and we've seen a 35% reduction in no-shows."</p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="David Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-gray-600 text-sm">Operations Manager, HealthFirst Clinic</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M10 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                  <path d="M18 19h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-6">"The ability to segment our audience and send personalized messages has been a game-changer. Our email open rates have increased by 42% since switching to SmartSend, and our SMS campaigns consistently outperform industry standards."</p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Emily Rodriguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-gray-600 text-sm">E-commerce Director, Fashion Forward</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your customer communications?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of businesses that use SmartSend to engage their audience and drive results.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition">
              Start Your Free Trial
            </Link>
            <Link to="/login" className="bg-transparent border border-white text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-white hover:bg-opacity-10 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-xl font-bold">SmartSend</span>
              </div>
              <p className="text-gray-400 mb-4">Powerful bulk SMS and email platform for businesses of all sizes.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SmartSend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
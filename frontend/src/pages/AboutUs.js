import React from 'react';
import fitTribeLogo from './components/images/fittribe.png'; // Import the Fit Tribe logo image

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <img src={fitTribeLogo} alt="Fit Tribe" className="mx-auto mb-8" style={{ maxWidth: '200px' }} /> {/* Add the Fit Tribe logo */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We are a team of passionate individuals dedicated to promoting health and fitness in our community.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Our mission is to inspire and empower people to lead healthier lives through exercise, nutrition, and mindfulness.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Thank you for being a part of our journey towards a healthier future.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

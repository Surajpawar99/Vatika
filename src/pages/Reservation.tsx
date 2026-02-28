import React from 'react';
import VatikaBooking from '../components/VatikaBooking';
import SEO from '../components/SEO';

const Reservation = () => {
  return (
    <div className="pt-8">
      <SEO 
        title="Book a Table | Vatika Pure Veg Restaurant"
        description="Reserve your table at Vatika Pure Veg, Parbhani. Perfect for family dinners, birthday parties, and group celebrations. Book online now."
        schema={{
          "@type": "Reservation",
          "reservationFor": {
            "@type": "FoodEstablishment",
            "name": "Vatika Pure Veg",
            "address": "Parbhani"
          }
        }}
      />
      <VatikaBooking />
    </div>
  );
};

export default Reservation;

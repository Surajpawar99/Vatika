import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, MapPin, Phone, Users, Utensils, Award, CheckCircle, ChevronRight, Car, Flame, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  { customerName: "Akash Maid", reviewText: "जेवण खूप स्वादिष्ट होते, पण पापड थोडे मऊ होते, ते अधिक कुरकुरीत असू शकले असते. तरीही एकंदरीत सेवा आणि अनुभव उत्तम!", rating: 4 },
  { customerName: "Shri samarth electricals", reviewText: "परभणी शहरातील सर्वोत्तम जेवण. येथील खाद्यपदार्थ, सेवा आणि वातावरण सर्वच उत्कृष्ट आहे. नक्की भेट द्या!", rating: 5 },
  { customerName: "SUDHIR SALVE", reviewText: "जगात जर्मनी आणि आपल्या भारतात परभणी... आणि परभणीत खमंग स्वादिष्ट जेवणाची जबरदस्त सोय म्हणजे हॉटेल वाटिका! मॅनेजर प्रशांत सर खूप चांगली सर्विस देतात. रबरी जिलेबी आणि पनीर टिक्का नक्की ट्राय करा.", rating: 5 },
  { customerName: "Swapnil Shelke", reviewText: "खूप छान जागा आहे. जेवणाची चव आणि येथील वातावरण दोन्हीही मनाला भावणारे आहे.", rating: 5 },
  { customerName: "Dr. Sunil. H. Patil", reviewText: "एकंदरीत अनुभव ठीक होता. जेवण आणि वातावरण छान आहे, पण सेवेमध्ये थोडी सुधारणा करण्यास वाव आहे.", rating: 3 },
  { customerName: "Pradeep Dhage", reviewText: "वाटिका हॉटेल खूप छान आहे. त्यांची सर्विस उत्तम आहे. जर तुम्ही फॅमिली सोबत जाण्याचा विचार करत असाल, तर हे एक उत्तम ठिकाण आहे.", rating: 5 },
  { customerName: "Navnath Jadhav", reviewText: "हॉटेलचे वातावरण सुंदर आहे, पण वेटर आणि स्टाफमध्ये समन्वयाचा (mutual understanding) अभाव जाणवला. पनीर टिक्का मसालाची चव उत्तम होती.", rating: 4 },
  { customerName: "Keshav Bochare", reviewText: "प्रत्येकाने एकदा येथील जेवणाची चव नक्की घ्यावी. जेवण आणि सर्विस दोन्हीही खूप छान आहे.", rating: 5 },
  { customerName: "Jawad Shaikh", reviewText: "परभणीतील सर्वोत्तम हॉटेल. उत्तम जेवण आणि उत्कृष्ट सेवा.", rating: 5 },
  { customerName: "Pritam Jain", reviewText: "रामकृष्ण नगर, वसमत रोडवर स्थित हे एक उत्तम ठिकाण आहे. येथील वातावरण खूप शांत आणि आल्हाददायक आहे.", rating: 5 },
  { customerName: "shankar balshetwar", reviewText: "Excellent food, service, and atmosphere. वारंवार जावेसे वाटेल असे ठिकाण. व्हेज गोल्ड फिंगर नक्की ट्राय करा.", rating: 5 },
  { customerName: "Sangram Gite", reviewText: "दुपारच्या जेवणासाठी उत्तम ठिकाण. मसाला पापड आणि जीरा राईसची चव अप्रतिम होती. पार्किंगसाठी भरपूर जागा उपलब्ध आहे.", rating: 5 },
  { customerName: "Ramesh Satdive", reviewText: "परभणी भेटीत हॉटेल वाटिकाला भेट देण्याची संधी मिळाली. जेवण आणि वातावरण खूप छान होते. कर्मचाऱ्यांची वागणूक घरच्यासारखी होती, विशेषतः श्री. रमेश यांची सेवा उत्तम होती. शाकाहारी जेवणासाठी सर्वोत्तम जागा.", rating: 5 },
  { customerName: "Vishwajit Bhosle", reviewText: "शहरातील सर्वोत्तम हॉटेल्सपैकी एक. उत्कृष्ट सेवा, जेवणाचा दर्जा आणि आनंददायी वातावरण. पनीर टिक्का मसाला आणि पनीर रजवाडी आवर्जून ट्राय करा.", rating: 5 },
  { customerName: "Chinmay Kulkarni", reviewText: "जेवण, वाढदिवस आणि इतर कार्यक्रमांसाठी परभणीतील सर्वोत्तम ठिकाण. मॅनेजमेंट नेहमीच सहकार्य करते आणि जेवणाच्या दर्जात कोणतीही तडजोड करत नाही.", rating: 5 },
  { customerName: "Shubham Phulari", reviewText: "शुद्ध शाकाहारी जेवणासाठी सर्वोत्तम हॉटेल. येथील मेथी मलाई खूपच चविष्ट आहे, नक्की ऑर्डर करा.", rating: 5 },
  { customerName: "Lalani Adil", reviewText: "परभणीतील शाकाहारी लोकांसाठी अनेक पर्यायांसह उत्तम रेस्टॉरंट. घरगुती चव आणि उत्तम दर्जाचे ताजे अन्न येथे मिळते.", rating: 5 },
  { customerName: "Bhagwan Shinde", reviewText: "खूप छान जेवण. चव उत्तम आहे आणि जागाही मोठी आहे. कुटुंबासोबत वेळ घालवण्यासाठी आणि ग्रुप फंक्शनसाठी हे सर्वोत्तम ठिकाण आहे.", rating: 5 },
  { customerName: "Swapnashri KSHATRIYA", reviewText: "कुटुंब आणि मित्रांसोबत मौल्यवान वेळ घालवण्यासाठी खूप छान जागा. माझ्या बालपणीच्या अनेक आठवणी या ठिकाणाशी जोडलेल्या आहेत.", rating: 5 },
  { customerName: "Rahul Jawale", reviewText: "जर तुम्ही चांगले पंजाबी जेवण शोधत असाल, तर परभणीतील वाटिका हे सर्वोत्तम ठिकाण आहे. हॉल, जेवण आणि सर्व्हिंग स्टाफची सेवा अतिशय उत्तम आहे.", rating: 5 },
  { customerName: "Rajani_2509", reviewText: "परभणीतील सर्वोत्तम आणि प्रशस्त रेस्टॉरंट. स्वच्छतागृहे स्वच्छ आहेत, आणि जेवणाची गुणवत्ता उत्तम आहे.", rating: 5 },
  { customerName: "Shubham Ghatul", reviewText: "हे ठिकाण ५-स्टार रेटिंगला पात्र आहे! शहरातील सर्वात जुन्या शाकाहारी रेस्टॉरंटपैकी एक. व्यवस्थित देखभाल केलेले लॉन आणि व्यावसायिक कर्मचारी.", rating: 5 },
  { customerName: "Dr Shrinivas Karle", reviewText: "एमआयडीसी जवळ वसमत रोडवर स्थित, परभणीतील सर्वोत्तम फॅमिली रेस्टॉरंट! कुटुंबासह जेवणासाठी आल्हाददायक वातावरण.", rating: 5 },
  { customerName: "ambar gangale", reviewText: "ठिकाण स्वच्छ आणि नीटनेटके आहे. कुटुंबासाठी चांगली जागा. मसाला पापड, मंचुरियन, काला मसाला आणि पनीर टिक्का खूप चविष्ट होते.", rating: 5 },
  { customerName: "Shivdas Yeske", reviewText: "जेवण चविष्ट आहे आणि हॉटेल कर्मचारी अतिशय सभ्य आहेत. कुटुंब आणि मित्रांसोबत जाण्यासाठी हे एक योग्य ठिकाण आहे.", rating: 5 },
  { customerName: "Shahbaz Khan", reviewText: "शहरातील सर्वोत्तम व्हेज रेस्टॉरंट. उत्तम आदरातिथ्य, मुलांसाठी खेळाचे मैदान आणि स्वच्छ, जलद सेवा.", rating: 5 },
  { customerName: "Amit Sonpethkar", reviewText: "चांगले फॅमिली व्हेज रेस्टॉरंट आहे, पण सणांच्या दिवशी गर्दीत ऑर्डर मॅनेजमेंट थोडे कोलमडते. स्टाफला आणखी ट्रेनिंगची गरज आहे. दिवाळीच्या गर्दीत अनुभव थोडा खराब होता.", rating: 3 },
  { customerName: "Dinesh Suryavanshi", reviewText: "शुद्ध शाकाहारी आणि खूप चांगले हॉटेल. कुटुंब आणि मुलांसाठी सर्वात सुरक्षित आणि योग्य.", rating: 5 },
  { customerName: "abhijit khaladkar", reviewText: "मोठे आणि खुले रेस्टॉरंट. सेवा जलद आहे, चव चांगली आहे पण आणखी उत्कृष्ट होऊ शकते. ग्रुप पार्टीसाठी योग्य जागा.", rating: 4 },
  { customerName: "Amit 11", reviewText: "छान जेवण आणि स्वच्छ जागा. कर्मचारी मैत्रीपूर्ण आहेत, विशेषतः रिसेप्शनिस्ट श्री. धनराज सर यांची सर्व्हिस उत्तम आहे.", rating: 5 }
];

const heroImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", // Restaurant Exterior/Ambience
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", // Dining Interior
  "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1887&auto=format&fit=crop", // Veg Thali
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1888&auto=format&fit=crop"  // Paneer Dish
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-stone-800 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] h-auto md:h-[90vh] flex items-center justify-center overflow-hidden py-20 md:py-0">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover animate-slow-zoom"
              />
              {/* Dark Overlay per image to ensure text readability on all slides */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center w-full">
          {/* Since Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-black/30 backdrop-blur-md text-amber-400 text-xs md:text-sm font-serif tracking-wider mb-6 md:mb-8 shadow-[0_0_15px_rgba(251,191,36,0.2)] animate-fade-in-down">
            <Star size={12} className="fill-current" /> Since 2010 <Star size={12} className="fill-current" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 md:mb-6 font-bold tracking-tight leading-tight animate-fade-in-up drop-shadow-lg">
            Pure Veg Family Restaurant <br className="hidden md:block" /> in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Parbhani</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-2xl text-stone-200 mb-8 md:mb-10 font-light max-w-3xl mx-auto animate-fade-in-up delay-100 drop-shadow-md px-2">
            Authentic Taste. Family Ambience. Affordable Pricing.
          </p>

          {/* Highlights Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in-up delay-200 w-full sm:w-auto">
             <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg cursor-default select-none w-full sm:w-auto">
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-sm font-medium tracking-wide">100% Pure Veg</span>
             </div>
             <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg cursor-default select-none w-full sm:w-auto">
                <Users size={18} className="text-amber-400" />
                <span className="text-sm font-medium tracking-wide">Family Friendly</span>
             </div>
             <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg cursor-default select-none w-full sm:w-auto">
                <Car size={18} className="text-blue-400" />
                <span className="text-sm font-medium tracking-wide">Spacious Parking</span>
             </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center w-full sm:w-auto animate-fade-in-up delay-300 px-4 sm:px-0">
            <Link
              to="/vatika"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 min-w-[220px] shadow-lg"
            >
              <Utensils size={20} />
              View Vatika Menu
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-slow-zoom {
            animation: slow-zoom 20s ease-in-out infinite;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out forwards;
          }
          .delay-100 { animation-delay: 0.2s; opacity: 0; }
          .delay-200 { animation-delay: 0.4s; opacity: 0; }
          .delay-300 { animation-delay: 0.6s; opacity: 0; }
        `}</style>
      </section>

      {/* 2. LIVE RATING BADGE SECTION */}
      <section className="py-8 md:py-12 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { platform: 'Google Rating', score: '3.9', count: 'Reviews', color: 'text-blue-600', bg: 'bg-blue-50' },
              { platform: 'Zomato', score: '4.2/5', count: '11 Votes', color: 'text-red-600', bg: 'bg-red-50' },
              { platform: 'magicpin', score: '4.2/5', count: '23 Reviews', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((rating, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className={`font-bold text-base md:text-lg ${rating.color}`}>{rating.platform}</h3>
                  <p className="text-stone-500 text-xs md:text-sm">{rating.count}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl ${rating.bg}`}>
                  <span className={`font-bold text-lg md:text-xl ${rating.color}`}>{rating.score}</span>
                  <Star className={`fill-current ${rating.color}`} size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AMBIENCE SECTION */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[300px] md:h-[500px] shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                alt="Vatika Ambience"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-bold tracking-widest uppercase text-xs md:text-sm">Our Ambience</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2 mb-4 md:mb-6">
                Warm, Welcoming & <br/><span className="text-amber-600">Family Friendly</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 mb-6 md:mb-8 leading-relaxed">
                Step into a world of comfort and elegance. Our spacious seating and warm lighting create the perfect atmosphere for family dinners, celebrations, and casual meetups. We pride ourselves on maintaining a hygienic and peaceful environment where you can truly enjoy your meal.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-stone-700 font-medium text-sm md:text-base">
                  <CheckCircle className="text-amber-600" size={18} /> AC Dining
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium text-sm md:text-base">
                  <CheckCircle className="text-amber-600" size={18} /> Party Hall
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium text-sm md:text-base">
                  <CheckCircle className="text-amber-600" size={18} /> Clean Washrooms
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE FOOD SHOWCASE */}
      <section className="py-12 md:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs md:text-sm">Culinary Masterpieces</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">Signature Dishes</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Special Veg Thali", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1887&auto=format&fit=crop" },
              { name: "Paneer Butter Masala", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1888&auto=format&fit=crop" },
              { name: "South Indian Dosa", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1888&auto=format&fit=crop" }
            ].map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative rounded-3xl overflow-hidden shadow-lg h-72 md:h-96 cursor-pointer"
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-4 group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                  <a
                    href="https://www.zomato.com/parbhani/hotel-vatika-1-parbhani-locality/order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E23744] text-white text-sm font-bold rounded-xl hover:bg-[#d12533] transition-all shadow-lg hover:shadow-[#E23744]/40 w-fit transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Order on Zomato <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZOMATO TRUST SECTION */}
      <section className="py-12 md:py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-50 rounded-3xl p-6 md:p-12 border border-stone-100 shadow-lg relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#E23744]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
               {/* Left Column */}
               <div className="space-y-6 md:space-y-8">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg" alt="Zomato" className="h-8 md:h-12" />
                 
                 <div className="flex flex-wrap gap-4 md:gap-6">
                   <div className="flex items-center gap-3">
                     <div className="bg-[#E23744] text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">4.2 ★</div>
                     <div>
                       <p className="font-bold text-stone-900 leading-tight text-sm md:text-base">Dining Rating</p>
                       <p className="text-[10px] md:text-xs text-stone-500">11 Reviews</p>
                     </div>
                   </div>
                   <div className="w-px h-10 bg-stone-300 hidden sm:block"></div>
                   <div className="flex items-center gap-3">
                     <div className="bg-[#E23744] text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">4.3 ★</div>
                     <div>
                       <p className="font-bold text-stone-900 leading-tight text-sm md:text-base">Delivery Rating</p>
                       <p className="text-[10px] md:text-xs text-stone-500">2,711 Reviews</p>
                     </div>
                   </div>
                 </div>

                 <p className="text-lg md:text-xl text-stone-700 font-serif italic">
                   "Trusted by thousands of delivery customers."
                 </p>
               </div>

               {/* Right Column */}
               <div className="flex flex-col items-start lg:items-end w-full">
                 <a
                   href="https://www.zomato.com/parbhani/hotel-vatika-1-parbhani-locality/order"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 bg-[#E23744] text-white rounded-2xl font-bold text-base md:text-lg hover:bg-[#d12533] transition-all shadow-xl hover:shadow-[#E23744]/40 flex items-center justify-center gap-3 transform hover:-translate-y-1 group"
                 >
                   Order Now on Zomato
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </a>
               </div>
             </div>

             {/* Highlight Strip */}
             <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
               {[
                 { text: "Fast Delivery in Parbhani", icon: Clock },
                 { text: "Fresh Packed Meals", icon: CheckCircle },
                 { text: "Highly Rated on Zomato", icon: Star }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-stone-700 font-medium justify-center md:justify-start bg-white/50 p-3 rounded-xl border border-stone-100 text-sm md:text-base">
                   <item.icon size={18} className="text-[#E23744]" />
                   {item.text}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE VATIKA SECTION */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs md:text-sm">Experience Excellence</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">Why Choose Vatika?</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: CheckCircle, title: "100% Pure Veg", desc: "Strictly vegetarian kitchen maintaining highest purity standards." },
              { icon: Users, title: "Family Dining", desc: "Warm, welcoming atmosphere perfect for family gatherings." },
              { icon: Utensils, title: "Unlimited Thali", desc: "Experience our signature unlimited thali with authentic flavors." },
              { icon: Award, title: "Spacious Seating", desc: "Comfortable seating arrangement for large groups and parties." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 md:p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 md:mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 text-amber-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-2 md:mb-3 font-serif">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROMO BANNER SECTION */}
      <section className="relative py-16 md:py-24 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Ambience"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-900/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 md:mb-6">
              "Perfect Place for Family <br/><span className="text-amber-500">Dinners & Celebrations"</span>
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto mb-8 md:mb-10 text-base md:text-lg">
              Create beautiful memories with your loved ones while enjoying our delectable vegetarian delicacies.
            </p>
            <Link
              to="/book"
              className="inline-block px-8 md:px-10 py-3 md:py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/30 text-sm md:text-base"
            >
              Book Your Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW STRIP */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">Visual Treat</h2>
            <p className="text-stone-500 mt-1 md:mt-2 text-sm md:text-base">A glimpse into our culinary world</p>
          </div>
          <Link to="/gallery" className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1 text-sm md:text-base">
            View All <ChevronRight size={18} />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 px-4 md:px-0 no-scrollbar snap-x">
          {[
            'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070',
            'https://images.unsplash.com/photo-1606491956689-2ea28c674675?q=80&w=1974',
            'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974',
            'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070'
          ].map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-64 md:w-72 h-48 md:h-56 rounded-2xl overflow-hidden shadow-md snap-center cursor-pointer"
            >
              <img src={src} alt="Gallery" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="py-16 md:py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12 text-center">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs md:text-sm">Guest Love</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">What Our Guests Say</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full">
          <div className="flex animate-scroll hover:pause">
            {/* Double the reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[400px] mx-3 md:mx-4 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < review.rating ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                    alt="Google" 
                    className="w-4 h-4 md:w-5 md:h-5 opacity-70"
                  />
                </div>
                
                <p className="text-stone-600 mb-6 italic text-xs md:text-sm leading-relaxed min-h-[60px] md:min-h-[80px]">
                  "{review.reviewText}"
                </p>
                
                <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center font-bold text-amber-700 text-base md:text-lg shadow-inner">
                    {review.customerName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs md:text-sm">{review.customerName}</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Source: Google</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Vatika+Pure+Veg+Parbhani+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-white border border-stone-200 text-stone-600 rounded-full font-bold hover:bg-stone-50 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm text-sm md:text-base"
          >
            View All Reviews on Google <ArrowRight size={18} />
          </a>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 120s linear infinite;
          }
          .hover\\:pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* 9. STRONG CALL-TO-ACTION SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6 md:mb-8">
            Ready to Taste the Best Veg Food?
          </h2>
          <p className="text-lg md:text-xl text-stone-500 mb-8 md:mb-10">
            Order now or book a table for an unforgettable dining experience.
          </p>
          <Link
            to="/vatika"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-amber-600 text-white rounded-full text-lg md:text-xl font-bold hover:bg-amber-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Utensils size={20} />
            View Full Menu
          </Link>
        </div>
      </section>

      {/* 10. MINI LOCATION PREVIEW */}
      <section className="py-12 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-amber-500">Visit Us Today</h3>
              <div className="flex items-start gap-4">
                <MapPin className="text-amber-500 shrink-0 mt-1" />
                <p className="text-stone-300 text-sm md:text-base">
                  7R46+J2W, Vasmat Road, Near MIDC, Opposite Jain Dadawadi, Satkar Colony, Madhav Nagar, Parbhani, Maharashtra 431402
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:09022960646" className="px-6 py-3 bg-white text-stone-900 rounded-lg font-bold hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
                  <Phone size={18} /> Call Now
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-6 py-3 border border-stone-600 text-white rounded-lg font-bold hover:bg-stone-800 transition-colors text-center">
                  Get Directions
                </a>
              </div>
            </div>
            <div className="h-48 md:h-64 rounded-2xl overflow-hidden border border-stone-700">
              <iframe 
                src="https://maps.google.com/maps?q=7R46+J2W,+Vasmat+Road,+Parbhani&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Vatika Location"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

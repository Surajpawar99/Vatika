import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, MapPin, Phone, Users, Utensils, Award, CheckCircle, ChevronRight } from 'lucide-react';
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

const Home = () => {
  const whatsappLink = "https://wa.me/919022960646?text=Hello%20Vatika%20Pure%20Veg,%20I%20want%20to%20order.";

  return (
    <div className="font-sans text-stone-800">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Vatika Pure Veg Exterior"
            className="w-full h-full object-cover brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-amber-600/20 border border-amber-500/50 text-amber-400 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            Welcome to Vatika
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 font-bold tracking-tight leading-tight"
          >
            Pure Veg Family Restaurant <br className="hidden md:block" /> in <span className="text-amber-500">Parbhani</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-stone-200 mb-10 font-light max-w-3xl mx-auto"
          >
            Authentic Taste. Family Ambience. Affordable Pricing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:bg-[#20bd5a] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Order on WhatsApp <ArrowRight size={20} />
            </a>
            <Link
              to="/vatika"
              className="px-8 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-amber-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              View Vatika Menu <Utensils size={20} className="text-amber-600" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. LIVE RATING BADGE SECTION */}
      <section className="py-12 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className={`font-bold text-lg ${rating.color}`}>{rating.platform}</h3>
                  <p className="text-stone-500 text-sm">{rating.count}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${rating.bg}`}>
                  <span className={`font-bold text-xl ${rating.color}`}>{rating.score}</span>
                  <Star className={`fill-current ${rating.color}`} size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AMBIENCE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-2xl"
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
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Our Ambience</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2 mb-6">
                Warm, Welcoming & <br/><span className="text-amber-600">Family Friendly</span>
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Step into a world of comfort and elegance. Our spacious seating and warm lighting create the perfect atmosphere for family dinners, celebrations, and casual meetups. We pride ourselves on maintaining a hygienic and peaceful environment where you can truly enjoy your meal.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle className="text-amber-600" size={20} /> AC Dining
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle className="text-amber-600" size={20} /> Party Hall
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle className="text-amber-600" size={20} /> Clean Washrooms
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE FOOD SHOWCASE */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Culinary Masterpieces</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">Signature Dishes</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="group relative rounded-3xl overflow-hidden shadow-lg h-80 cursor-pointer"
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white text-2xl font-serif font-bold group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE VATIKA SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Experience Excellence</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">Why Choose Vatika?</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="group p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 text-amber-600">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROMO BANNER SECTION */}
      <section className="relative py-24 bg-stone-900 overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              "Perfect Place for Family <br/><span className="text-amber-500">Dinners & Celebrations"</span>
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto mb-10 text-lg">
              Create beautiful memories with your loved ones while enjoying our delectable vegetarian delicacies.
            </p>
            <Link
              to="/book"
              className="inline-block px-10 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/30"
            >
              Book Your Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW STRIP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">Visual Treat</h2>
            <p className="text-stone-500 mt-2">A glimpse into our culinary world</p>
          </div>
          <Link to="/gallery" className="text-amber-600 font-bold hover:text-amber-700 flex items-center gap-1">
            View All <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-8 gap-6 px-4 md:px-0 no-scrollbar snap-x">
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
              className="flex-shrink-0 w-72 h-56 rounded-2xl overflow-hidden shadow-md snap-center cursor-pointer"
            >
              <img src={src} alt="Gallery" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIAL SECTION */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Guest Love</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mt-2">What Our Guests Say</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full">
          <div className="flex animate-scroll hover:pause">
            {/* Double the reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[400px] mx-4 bg-white p-8 rounded-2xl shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                    alt="Google" 
                    className="w-5 h-5 opacity-70"
                  />
                </div>
                
                <p className="text-stone-600 mb-6 italic text-sm leading-relaxed min-h-[80px]">
                  "{review.reviewText}"
                </p>
                
                <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center font-bold text-amber-700 text-lg shadow-inner">
                    {review.customerName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{review.customerName}</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Source: Google</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Vatika+Pure+Veg+Parbhani+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-stone-200 text-stone-600 rounded-full font-bold hover:bg-stone-50 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm"
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">
            Ready to Taste the Best Veg Food?
          </h2>
          <p className="text-xl text-stone-500 mb-10">
            Order now or book a table for an unforgettable dining experience.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-full text-xl font-bold hover:bg-[#20bd5a] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
            Order on WhatsApp
          </a>
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
                <p className="text-stone-300">
                  7R46+J2W, Vasmat Road, Near MIDC, Opposite Jain Dadawadi, Satkar Colony, Madhav Nagar, Parbhani, Maharashtra 431402
                </p>
              </div>
              <div className="flex gap-4">
                <a href="tel:09022960646" className="px-6 py-3 bg-white text-stone-900 rounded-lg font-bold hover:bg-stone-200 transition-colors flex items-center gap-2">
                  <Phone size={18} /> Call Now
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="px-6 py-3 border border-stone-600 text-white rounded-lg font-bold hover:bg-stone-800 transition-colors">
                  Get Directions
                </a>
              </div>
            </div>
            <div className="h-64 rounded-2xl overflow-hidden border border-stone-700">
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

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default Home;

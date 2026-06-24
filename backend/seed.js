const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trainer = require('./models/Trainer');
const Booking = require('./models/Booking');

dotenv.config();

const trainers = [
  {
    name: 'Arjun Sharma',
    specialization: 'Strength & Conditioning',
    experience: 8,
    rating: 4.9,
    bio: 'Former national powerlifter with 8 years of coaching experience. Specializes in hypertrophy and functional strength.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    certifications: ['NSCA-CSCS', 'ACE Certified', 'CPR/AED'],
  },
  {
    name: 'Priya Kapoor',
    specialization: 'Yoga & Flexibility',
    experience: 6,
    rating: 4.8,
    bio: 'Certified yoga instructor and wellness coach. Helps clients achieve mind-body balance and flexibility goals.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    certifications: ['RYT-500', 'Wellness Coaching', 'Meditation Guide'],
  },
  {
    name: 'Ravi Mehta',
    specialization: 'HIIT & Cardio',
    experience: 5,
    rating: 4.7,
    bio: 'High-energy HIIT trainer passionate about fat loss and cardiovascular health. Makes every session intense and fun.',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    certifications: ['ACE-CPT', 'TRX Certified', 'Nutrition Specialist'],
  },
  {
    name: 'Sneha Verma',
    specialization: 'Pilates & Core',
    experience: 7,
    rating: 4.9,
    bio: 'Expert Pilates instructor focused on core strength, posture correction, and injury rehabilitation.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    certifications: ['Balanced Body Pilates', 'Polestar Pilates', 'Pre/Post Natal'],
  },
  {
    name: 'Karan Singh',
    specialization: 'Boxing & MMA',
    experience: 10,
    rating: 4.8,
    bio: 'Pro-level boxing coach with 10 years in combat sports. Trains clients for self-defense, fitness, and competition.',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    certifications: ['USA Boxing Coach', 'MMA Certified', 'First Aid'],
  },
  {
    name: 'Ananya Rao',
    specialization: 'Zumba & Dance Fitness',
    experience: 4,
    rating: 4.6,
    bio: 'Energetic Zumba instructor bringing the joy of dance into fitness. Perfect for those who love to move and groove.',
    image: 'https://randomuser.me/api/portraits/women/25.jpg',
    certifications: ['Zumba Instructor', 'AFAA Group Fitness', 'Dance Therapy'],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apexgym');
    console.log('✅ Connected to MongoDB');

    await Trainer.deleteMany({});
    await Booking.deleteMany({});

    await Trainer.insertMany(trainers);
    console.log(`✅ Seeded ${trainers.length} trainers`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();

// Fictional preview records. Stable IDs make the one-time migration repeat-safe.
const people = [
 ['Ahmad Safi', 'Kabul', 'University student', 'Demo Kabul University'],
 ['Maryam Azizi', 'Herat', 'Teacher', 'Demo Learning Center'],
 ['Omar Rahimi', 'Mazar-e-Sharif', 'Software developer', 'Demo Technology Studio'],
 ['Fatima Noori', 'Kabul', 'Medical student', 'Demo Medical Institute'],
 ['Bilal Karimi', 'Jalalabad', 'Business owner', 'Demo Market Collective'],
 ['Zahra Ahmadi', 'Bamyan', 'Designer', 'Demo Creative Studio'],
 ['Hamid Wardak', 'Kabul', 'School counselor', 'Demo Community School'],
 ['Amina Habibi', 'Kandahar', 'University student', 'Demo Higher Education Institute'],
 ['Yusuf Mohammadi', 'Kunduz', 'Civil engineer', 'Demo Engineering Group'],
 ['Laila Sultani', 'Herat', 'Journalist', 'Demo Media Workshop'],
 ['Farid Hotak', 'Ghazni', 'Teacher', 'Demo Secondary School'],
 ['Nadia Sadat', 'Kabul', 'Entrepreneur', 'Demo Business Lab'],
 ['Khalid Niazi', 'Khost', 'University student', 'Demo Technical Institute'],
 ['Sahar Alizai', 'Herat', 'Community volunteer', 'Demo Youth Circle'],
 ['Nasir Hakimi', 'Mazar-e-Sharif', 'Accountant', 'Demo Finance Office'],
 ['Hina Popal', 'Kandahar', 'Nursing student', 'Demo Health Institute'],
 ['Wahid Amiri', 'Kabul', 'Project coordinator', 'Demo Development Group'],
 ['Roya Danish', 'Bamyan', 'Research assistant', 'Demo Research Center'],
 ['Tariq Akbari', 'Jalalabad', 'Marketing specialist', 'Demo Communications Studio'],
 ['Shabnam Faizi', 'Kabul', 'School administrator', 'Demo Academy'],
 ['Faisal Raufi', 'Kunduz', 'Graduate student', 'Demo Graduate School'],
 ['Parisa Zaman', 'Herat', 'Writer', 'Demo Writers Circle'],
 ['Sami Barak', 'Ghazni', 'Sales representative', 'Demo Retail Group'],
 ['Soraya Wafa', 'Kabul', 'Librarian', 'Demo Community Library'],
];

export const demoReservations = people.map(([name, city, occupation, organization], index) => {
 const number = String(index + 1).padStart(3, '0');
 const status = index < 10 ? 'Waiting' : index < 20 ? 'Confirmed' : index < 22 ? 'Payment failed' : 'Cancelled';
 return {
  id: `DEMO-${number}-reservation`, name, city, occupation, organization,
  email: `${name.toLowerCase().replaceAll(' ', '.')}@example.com`,
  phone: `+93 000 000 ${number}`, // Intentionally non-operational demo numbers.
  notes: index === 0 ? 'Demo: please reserve an aisle seat.' : index === 3 ? 'Demo: step-free access requested.' : index === 7 ? 'Demo: interested in the Q&A session.' : 'Fictional attendee for preview.',
  createdAt: new Date(Date.UTC(2026, 10, 10, 8, 0) - index * 45 * 60 * 1000).toISOString(),
  method: index % 2 ? 'Visa' : 'HesabPay',
  payment: status === 'Payment failed' ? 'Failed (demo)' : 'Paid (demo)',
  amount: 1500, status,
 };
});

const topics = [
 ['personal-growth', 'Personal growth', 'Build a thoughtful, sustainable approach to everyday growth.', 'Understanding your values', 'Turning intentions into action'],
 ['emotional-wellbeing', 'Emotional wellbeing', 'Make space for feelings and healthier daily routines.', 'Recognizing your emotions', 'Creating a calming routine'],
 ['study-skills', 'Study skills', 'Practical tools for more focused and confident learning.', 'Planning your study week', 'Practicing active recall'],
 ['family-connections', 'Family connections', 'Create more understanding and connection at home.', 'Listening with patience', 'Building shared routines'],
 ['communication', 'Confident communication', 'Express yourself clearly and listen with care.', 'Speaking with clarity', 'Giving constructive feedback'],
 ['mindful-living', 'Mindful living', 'Bring greater attention to the small moments of your day.', 'A pause before responding', 'Noticing everyday moments'],
 ['career-direction', 'Career direction', 'Explore your strengths and plan your next professional step.', 'Mapping your strengths', 'Preparing for an interview'],
 ['healthy-habits', 'Healthy habits', 'Build routines that support your goals over time.', 'Starting small', 'Tracking your progress'],
 ['leadership', 'Community leadership', 'Lead with responsibility, empathy, and a shared purpose.', 'Leading by example', 'Supporting your team'],
 ['resilience', 'Resilience & change', 'Navigate setbacks and approach change with perspective.', 'Learning from setbacks', 'Planning your next step'],
];

export const demoSeries = topics.map(([id, name, description]) => ({ id, name, description }));
export const demoVideos = topics.flatMap(([series, , , ...lessons]) => lessons.map((title, index) => ({
 id: `demo-lesson-${series}-${index + 1}`, series, title,
 sample: true, filename: 'Sample lesson · upload a video to add real content', size: 0,
})));

export function withDemoRecords(current) {
 if (current.demoSeedVersion === 1) return current;
 const appendMissing = (existing, samples) => [...existing, ...samples.filter(sample => !existing.some(item => item.id === sample.id))];
 return {
  ...current, demoSeedVersion: 1,
  reservations: appendMissing(current.reservations, demoReservations),
  series: appendMissing(current.series, demoSeries),
  videos: appendMissing(current.videos, demoVideos),
 };
}

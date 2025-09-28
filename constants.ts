
import { Job, UserProfile } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Engineer',
    company: 'InnovateTech',
    location: 'Remote (Global)',
    description: 'Seeking an experienced Frontend Engineer proficient in React, TypeScript, and Tailwind CSS. The ideal candidate will have a strong portfolio of building scalable web applications and a keen eye for UI/UX design. Experience with state management libraries like Redux or Zustand is a plus. Must be able to work effectively in an agile team.',
    salary: { min: 120000, max: 160000, currency: 'USD' },
    analytics: { views: 1250, applications: 75, avgMatchScore: 88 }
  },
  {
    id: 'job2',
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    location: 'New York, NY',
    description: 'We are looking for a Data Scientist with expertise in Python, Pandas, and machine learning frameworks like TensorFlow or PyTorch. The role involves analyzing large datasets to extract actionable insights, building predictive models, and communicating findings to stakeholders. A PhD or Master\'s in a quantitative field is preferred.',
    salary: { min: 130000, max: 175000, currency: 'USD' },
    analytics: { views: 980, applications: 42, avgMatchScore: 91 }
  },
  {
    id: 'job3',
    title: 'Community Farm Manager',
    company: 'Green Sprouts Org',
    location: 'Rural Kenya',
    description: 'Manage a community banana plantation, overseeing daily operations from planting to harvest. Requires hands-on experience in agriculture, strong leadership skills to manage a team of local workers, and knowledge of sustainable farming practices. Experience with local market logistics and distribution is highly valuable.',
    salary: { min: 65000, max: 85000, currency: 'KES' },
    analytics: { views: 450, applications: 68, avgMatchScore: 82 }
  },
  {
    id: 'job4',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'Remote (Europe)',
    description: 'Join our team to design intuitive and beautiful user interfaces for our mobile and web products. You should be proficient in Figma, Sketch, or Adobe XD. A strong portfolio demonstrating your design process, from wireframes to high-fidelity mockups, is required. Experience with user research and usability testing is a must.',
    salary: { min: 75000, max: 95000, currency: 'EUR' },
    analytics: { views: 2100, applications: 110, avgMatchScore: 85 }
  },
  {
    id: 'job5',
    title: 'Full Stack Developer (Node.js/React)',
    company: 'CloudNova',
    location: 'Austin, TX',
    description: 'We are hiring a Full Stack Developer to build and maintain our cloud platform. The tech stack includes Node.js, Express, React, and PostgreSQL. Experience with AWS or GCP services is a significant advantage. You will be responsible for both front-end and back-end development in a fast-paced environment.',
    salary: { min: 110000, max: 150000, currency: 'USD' },
    analytics: { views: 1800, applications: 95, avgMatchScore: 89 }
  }
];

export const MOCK_CANDIDATE_PROFILES: UserProfile[] = [
    {
        name: 'Elena Rodriguez',
        email: 'elena.r@example.com',
        professionalSkills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'UI/UX Design'],
        informalSkills: ['Agile Methodologies', 'Team Leadership', 'Public Speaking'],
        workSummary: 'A Senior Frontend Engineer with over 8 years of experience building scalable and user-friendly web applications for tech startups. Specializes in the React ecosystem and has a passion for creating beautiful and intuitive user interfaces.',
        marketability: { score: 92, topSkills: ['React', 'TypeScript', 'Leadership'], suggestedSkills: ['Next.js', 'Web3', 'GraphQL Federation'] },
        availability: { timezone: 'America/New_York', schedule: { 'Monday': {isAvailable: true, startTime: '09:00', endTime: '18:00'}, 'Tuesday': {isAvailable: true, startTime: '09:00', endTime: '18:00'}, 'Wednesday': {isAvailable: true, startTime: '09:00', endTime: '18:00'}, 'Thursday': {isAvailable: true, startTime: '09:00', endTime: '18:00'}, 'Friday': {isAvailable: true, startTime: '09:00', endTime: '18:00'}, 'Saturday': {isAvailable: false, startTime: '09:00', endTime: '17:00'}, 'Sunday': {isAvailable: false, startTime: '09:00', endTime: '17:00'} }}
    },
    {
        name: 'Juma Okoro',
        email: 'juma.o@example.com',
        professionalSkills: ['Sustainable Agriculture', 'Crop Management', 'Supply Chain Logistics'],
        informalSkills: ['Banana Plantation Management', 'Local Market Negotiation', 'Team Management', 'Kiswahili'],
        workSummary: 'An experienced agricultural manager with a decade of experience overseeing farm operations in rural Kenya. Proven ability to increase crop yield and manage teams of local workers effectively. Deep knowledge of banana cultivation and local distribution networks.',
        marketability: { score: 85, topSkills: ['Banana Plantation Management', 'Team Management', 'Supply Chain Logistics'], suggestedSkills: ['Organic Certification', 'Financial Planning', 'Export Regulations'] },
        availability: { timezone: 'Africa/Nairobi', schedule: { 'Monday': {isAvailable: true, startTime: '06:00', endTime: '16:00'}, 'Tuesday': {isAvailable: true, startTime: '06:00', endTime: '16:00'}, 'Wednesday': {isAvailable: true, startTime: '06:00', endTime: '16:00'}, 'Thursday': {isAvailable: true, startTime: '06:00', endTime: '16:00'}, 'Friday': {isAvailable: true, startTime: '06:00', endTime: '16:00'}, 'Saturday': {isAvailable: true, startTime: '07:00', endTime: '12:00'}, 'Sunday': {isAvailable: false, startTime: '09:00', endTime: '17:00'} }}
    }
];

export const TIMEZONES: string[] = [
  'UTC', 'GMT', 'Africa/Abidjan', 'Africa/Accra', 'Africa/Algiers', 'Africa/Bissau', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta',
  'Africa/El_Aaiun', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Khartoum', 'Africa/Lagos', 'Africa/Maputo', 'Africa/Monrovia',
  'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Sao_Tome', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak',
  'America/Anchorage', 'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/Cordoba',
  'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia', 'America/Asuncion', 'America/Atikokan', 'America/Bahia', 'America/Bahia_Banderas', 'America/Barbados',
  'America/Belem', 'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota', 'America/Boise',
  'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun', 'America/Caracas', 'America/Cayenne', 'America/Chicago',
  'America/Chihuahua', 'America/Costa_Rica', 'America/Creston', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn',
  'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Edmonton', 'America/Eirunepe',
  'America/El_Salvador', 'America/Fort_Nelson', 'America/Fortaleza', 'America/Glace_Bay', 'America/Goose_Bay', 'America/Grand_Turk',
  'America/Guatemala', 'America/Guayaquil', 'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo',
  'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg',
  'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Inuvik',
  'America/Iqaluit', 'America/Jamaica', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello',
  'America/La_Paz', 'America/Lima', 'America/Los_Angeles', 'America/Maceio', 'America/Managua', 'America/Manaus', 'America/Martinique',
  'America/Matamoros', 'America/Mazatlan', 'America/Menominee', 'America/Merida', 'America/Metlakatla', 'America/Mexico_City',
  'America/Miquelon', 'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Nassau', 'America/New_York',
  'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem', 'America/Nuuk', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung',
  'America/Paramaribo', 'America/Phoenix', 'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Porto_Velho',
  'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Recife',
  'America/Regina', 'America/Resolute', 'America/Rio_Branco', 'America/Santarem', 'America/Santiago', 'America/Santo_Domingo',
  'America/Sao_Paulo', 'America/Scoresbysund', 'America/Sitka', 'America/St_Johns', 'America/Swift_Current', 'America/Tegucigalpa',
  'America/Thule', 'America/Thunder_Bay', 'America/Tijuana', 'America/Toronto', 'America/Vancouver', 'America/Whitehorse',
  'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville',
  'Antarctica/Macquarie', 'Antarctica/Mawson', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/Syowa', 'Antarctica/Troll',
  'Antarctica/Vostok', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Atyrau',
  'Asia/Baghdad', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Chita',
  'Asia/Choibalsan', 'Asia/Colombo', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta',
  'Asia/Gaza', 'Asia/Hebron', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Jakarta', 'Asia/Jayapura',
  'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Khandyga', 'Asia/Kolkata',
  'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila',
  'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Pontianak', 'Asia/Pyongyang',
  'Asia/Qatar', 'Asia/Qostanay', 'Asia/Qyzylorda', 'Asia/Riyadh', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai',
  'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Thimphu',
  'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ulaanbaatar', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vladivostok', 'Asia/Yakutsk',
  'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde',
  'Atlantic/Faroe', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia', 'Atlantic/Stanley', 'Australia/Adelaide',
  'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/Lindeman',
  'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney', 'Europe/Amsterdam', 'Europe/Andorra',
  'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest',
  'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Helsinki', 'Europe/Istanbul',
  'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid',
  'Europe/Malta', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Europe/Oslo', 'Europe/Paris', 'Europe/Prague', 'Europe/Riga',
  'Europe/Rome', 'Europe/Samara', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn',
  'Europe/Tirane', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw',
  'Europe/Zaporozhye', 'Europe/Zurich', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos', 'Indian/Kerguelen', 'Indian/Mahe',
  'Indian/Maldives', 'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville',
  'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji',
  'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu',
  'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Nauru', 'Pacific/Niue',
  'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Port_Moresby',
  'Pacific/Rarotonga', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Wake', 'Pacific/Wallis'
];

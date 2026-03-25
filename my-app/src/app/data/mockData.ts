export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: "Upcoming" | "Completed" | "Ongoing";
  guidelines: string[];
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface Notification {
  id: string;
  type: "new_activity" | "reminder" | "confirmation";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AwarenessResource {
  id: string;
  title: string;
  description: string;
  image: string;
  tips: string[];
}

export const activities: Activity[] = [
  {
    id: "1",
    title: "Campus Tree Plantation Drive",
    category: "Plantation",
    description: "Join us for a massive tree plantation drive to make our campus greener. We aim to plant 500 trees across the campus grounds.",
    date: "2026-02-15",
    time: "09:00 AM - 12:00 PM",
    location: "Main Campus Ground",
    organizer: "Dr. Sarah Green, Environmental Science Dept.",
    status: "Upcoming",
    guidelines: [
      "Wear comfortable clothes and covered shoes",
      "Bring gardening gloves if available",
      "Water bottles will be provided",
      "Meeting point: Main Gate at 8:45 AM"
    ],
    maxParticipants: 200,
    currentParticipants: 87
  },
  {
    id: "2",
    title: "Energy Conservation Workshop",
    category: "Energy",
    description: "Learn practical ways to conserve energy in daily life and understand the impact of renewable energy sources.",
    date: "2026-02-18",
    time: "02:00 PM - 04:00 PM",
    location: "Auditorium Hall A",
    organizer: "Prof. Michael Chen, Physics Dept.",
    status: "Upcoming",
    guidelines: [
      "Bring a notebook for taking notes",
      "Interactive session with Q&A",
      "Certificate of participation will be provided"
    ],
    maxParticipants: 150,
    currentParticipants: 112
  },
  {
    id: "3",
    title: "Waste Segregation Training",
    category: "Waste Management",
    description: "Hands-on training on proper waste segregation techniques and understanding the importance of recycling.",
    date: "2026-02-12",
    time: "10:00 AM - 11:30 AM",
    location: "Green Lab Building",
    organizer: "Ms. Emma Wilson, Environmental Coordinator",
    status: "Completed",
    guidelines: [
      "Practical demonstration included",
      "Learn about composting",
      "Tour of campus recycling facility"
    ],
    maxParticipants: 100,
    currentParticipants: 95
  },
  {
    id: "4",
    title: "Campus Cleanup Drive",
    category: "Cleanliness",
    description: "A collaborative effort to clean up the entire campus and surrounding areas. Let's make our campus spotless!",
    date: "2026-02-20",
    time: "07:00 AM - 10:00 AM",
    location: "All Campus Areas",
    organizer: "Student Green Council",
    status: "Upcoming",
    guidelines: [
      "Gloves and bags will be provided",
      "Wear casual clothes",
      "Breakfast will be served after the drive",
      "Teams will be assigned on arrival"
    ],
    maxParticipants: 300,
    currentParticipants: 156
  },
  {
    id: "5",
    title: "Water Conservation Seminar",
    category: "Water",
    description: "Expert talk on water conservation methods, rainwater harvesting, and sustainable water management practices.",
    date: "2026-02-22",
    time: "11:00 AM - 01:00 PM",
    location: "Lecture Hall 3",
    organizer: "Dr. Priya Sharma, Civil Engineering Dept.",
    status: "Upcoming",
    guidelines: [
      "Open to all students",
      "Refreshments will be served",
      "Discussion session included"
    ],
    maxParticipants: 120,
    currentParticipants: 78
  },
  {
    id: "6",
    title: "Organic Farming Workshop",
    category: "Plantation",
    description: "Learn the basics of organic farming and help set up the campus organic garden.",
    date: "2026-02-08",
    time: "03:00 PM - 05:00 PM",
    location: "Campus Garden Area",
    organizer: "Dr. Raj Kumar, Botany Dept.",
    status: "Completed",
    guidelines: [
      "Wear clothes suitable for outdoor work",
      "Basic tools will be provided",
      "Learn about composting and natural fertilizers"
    ],
    maxParticipants: 80,
    currentParticipants: 72
  }
];

export const notifications: Notification[] = [
  {
    id: "1",
    type: "new_activity",
    title: "New Activity Announced!",
    message: "Campus Tree Plantation Drive has been scheduled for Feb 15, 2026. Register now!",
    timestamp: "2026-02-09T10:30:00",
    read: false
  },
  {
    id: "2",
    type: "reminder",
    title: "Activity Reminder",
    message: "Energy Conservation Workshop is starting tomorrow at 2:00 PM. Don't forget!",
    timestamp: "2026-02-09T09:00:00",
    read: false
  },
  {
    id: "3",
    type: "confirmation",
    title: "Registration Confirmed",
    message: "You have successfully registered for the Campus Cleanup Drive on Feb 20, 2026.",
    timestamp: "2026-02-08T16:45:00",
    read: true
  },
  {
    id: "4",
    type: "new_activity",
    title: "New Activity Added",
    message: "Water Conservation Seminar scheduled for Feb 22. Check it out!",
    timestamp: "2026-02-07T14:20:00",
    read: true
  },
  {
    id: "5",
    type: "reminder",
    title: "Activity Starting Soon",
    message: "Campus Tree Plantation Drive starts in 6 days. Prepare accordingly!",
    timestamp: "2026-02-09T08:00:00",
    read: false
  }
];

export const awarenessResources: AwarenessResource[] = [
  {
    id: "1",
    title: "Reduce, Reuse, Recycle",
    description: "The three R's are essential principles for sustainable living. Learn how to implement them in your daily life.",
    image: "recycle-bins",
    tips: [
      "Always carry a reusable water bottle",
      "Use cloth bags instead of plastic",
      "Donate old clothes and books",
      "Avoid single-use plastics",
      "Compost organic waste"
    ]
  },
  {
    id: "2",
    title: "Energy Conservation Tips",
    description: "Small changes in daily habits can lead to significant energy savings and reduced carbon footprint.",
    image: "solar-panel",
    tips: [
      "Turn off lights when leaving a room",
      "Unplug devices when not in use",
      "Use natural light whenever possible",
      "Opt for energy-efficient appliances",
      "Use stairs instead of elevators when possible"
    ]
  },
  {
    id: "3",
    title: "Water Conservation",
    description: "Water is precious. Every drop counts in creating a sustainable future for our planet.",
    image: "water-drop",
    tips: [
      "Fix leaky faucets immediately",
      "Take shorter showers",
      "Don't let water run while brushing teeth",
      "Collect rainwater for plants",
      "Use a bucket instead of a hose for washing"
    ]
  },
  {
    id: "4",
    title: "Green Transportation",
    description: "Choose eco-friendly transportation options to reduce air pollution and carbon emissions.",
    image: "bicycle-commute",
    tips: [
      "Walk or bike for short distances",
      "Use public transportation",
      "Carpool with classmates",
      "Maintain vehicles for better fuel efficiency",
      "Support electric vehicle initiatives"
    ]
  }
];

export const studentProfile = {
  id: "STU2024001",
  name: "Alex Johnson",
  email: "alex.johnson@campus.edu",
  department: "Computer Science",
  year: "3rd Year",
  enrollmentDate: "2023-08-15",
  totalParticipations: 3,
  greenPoints: 45
};

# Revision Tracker - Folder Structure

Revision-Tracker/
│
├── docs/
│   ├── FEATURES.md
│   ├── USER_FLOW.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── PAGES.md
│   ├── FOLDER_STRUCTURE.md
│   ├── FUTURE_FEATURES.md
│   ├── ER_DIAGRAM.md
│   ├── ARCHITECTURE.md
│   └── README.md
│
├── client/
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── illustrations/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Loader/
│   │   │   │   ├── Spinner/
│   │   │   │   ├── Card/
│   │   │   │   └── Toast/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Footer/
│   │   │   │   └── DashboardLayout/
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   ├── revision/
│   │   │   ├── subject/
│   │   │   ├── topic/
│   │   │   ├── analytics/
│   │   │   └── profile/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Dashboard/
│   │   │   ├── Subjects/
│   │   │   ├── Topics/
│   │   │   ├── TodayRevision/
│   │   │   ├── WeeklyPlanner/
│   │   │   ├── Analytics/
│   │   │   ├── Profile/
│   │   │   ├── Settings/
│   │   │   └── NotFound/
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useAxios.js
│   │   │   ├── useRevision.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── subjectService.js
│   │   │   ├── topicService.js
│   │   │   ├── revisionService.js
│   │   │   └── dashboardService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── calculateStreak.js
│   │   │   ├── revisionSchedule.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── constants/
│   │   │   ├── api.js
│   │   │   ├── revisionDays.js
│   │   │   └── colors.js
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── subjectController.js
│   │   ├── topicController.js
│   │   ├── revisionController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── loggerMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Topic.js
│   │   ├── Revision.js
│   │   └── Notification.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── topicRoutes.js
│   │   ├── revisionRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── services/
│   │   ├── revisionScheduler.js
│   │   ├── notificationService.js
│   │   ├── analyticsService.js
│   │   └── emailService.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── subjectValidator.js
│   │   ├── topicValidator.js
│   │   └── revisionValidator.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── dateUtils.js
│   │   ├── response.js
│   │   └── logger.js
│   │
│   ├── cron/
│   │   ├── dailyReminder.js
│   │   ├── weeklySummary.js
│   │   └── streakChecker.js
│   │
│   ├── uploads/
│   │   ├── profile/
│   │   └── notes/
│   │
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── LICENSE
```
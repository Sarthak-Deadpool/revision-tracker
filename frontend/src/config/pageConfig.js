/** @format */

export const pageConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back! Ready for today's revision?",
  },

  "/dashboard/subjects/:subjectId/topics": {
    title: "Subject Topics",
    subtitle: "Manage topics for this subject.",
    action: {
      id: "create-subject-topic",
      label: "Add Subject Topic",
    },
  },

  "/dashboard/topics": {
    title: "Topics",
    subtitle: "Organize and revise your learning topics.",
    action: {
      id: "create-topic",
      label: "Add Topic",
    },
  },

  "/dashboard/subjects": {
    title: "Subjects",
    subtitle: "Manage all your study subjects.",
    action: {
      id: "create-subject",
      label: "Add Subject",
    },
  },
  "/dashboard/revisions": {
    title: "Today's Revisions",
    subtitle: "Complete today's scheduled revision sessions.",
  },

  "/dashboard/calendar": {
    title: "Revision Calendar",
    subtitle: "View your upcoming revision schedule.",
  },

  "/dashboard/analytics": {
    title: "Analytics",
    subtitle: "Track your learning progress and mastery.",
  },

  "/dashboard/profile": {
    title: "Profile",
    subtitle: "Manage your personal information.",
  },

  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Customize your Revision Tracker.",
  },
};

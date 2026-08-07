/** @format */

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import HomePage from "../pages/HomePage";

import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";

import SubjectPage from "@/pages/SubjectPage";
import TopicPage from "@/pages/TopicPage";
import RevisionPage from "@/pages/RevisionPage";

import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingPage";

import CalendarPage from "@/pages/CalendarPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import NotificationPage from "@/pages/NotificationPage";

import StudyTopicPage from "@/pages/StudyTopicPage";
import StudyRevisionPage from "@/pages/StudyRevisionPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Authentication Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="subjects" element={<SubjectPage />} />

          <Route path="topics" element={<TopicPage />} />

          <Route
            path="subjects/:subjectId/topics"
            element={<TopicPage />}
          />

          <Route path="topics/:topicId" element={<StudyTopicPage />} />

          <Route path="revisions" element={<RevisionPage />} />

          <Route
            path="revisions/:revisionId"
            element={<StudyRevisionPage />}
          />

          <Route path="calendar" element={<CalendarPage />} />

          <Route path="analytics" element={<AnalyticsPage />} />

          <Route path="notifications" element={<NotificationPage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
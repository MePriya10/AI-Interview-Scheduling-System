// src/pages/Settings.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaSave, FaFileExport, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

export default function Settings() {
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [timezone, setTimezone] = useState('UTC');
  const [exportedData, setExportedData] = useState(null);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    panelWarnings: true,
  });

  const handleExportData = () => {
    const dummyData = {
      user: 'John Doe',
      preferences: {
        timezone,
        autoSchedule,
        smartSuggestions,
        notifications,
      },
    };
    setExportedData(dummyData);
    alert('Your data has been exported and will be available for download.');
  };

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
    alert('Settings saved successfully!');
  };

  const handleConnectCalendar = () => {
    window.open('https://calendar.google.com/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 pt-24 px-6 pb-16 text-gray-800">
      <h1 className="text-4xl font-bold text-purple-900 mb-10 text-center">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* General Preferences */}
        <Section title="General Preferences">
          <Label title="Time Zone">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="UTC">UTC</option>
              <option value="IST">IST (India)</option>
              <option value="EST">EST (Eastern US)</option>
              <option value="PST">PST (Pacific US)</option>
            </select>
          </Label>
        </Section>

        {/* AI Settings */}
        <Section title="AI Scheduling">
          <Toggle
            label="Enable Auto-Scheduling"
            enabled={autoSchedule}
            setEnabled={setAutoSchedule}
          />
          <Toggle
            label="Enable Smart Suggestions"
            enabled={smartSuggestions}
            setEnabled={setSmartSuggestions}
          />
        </Section>

        {/* Calendar Sync */}
        <Section title="Calendar Sync">
          <p className="text-sm text-purple-700 mb-2">Select a date to sync and open your Google Calendar for integration.</p>
          <div className="mb-4">
            <DatePicker
              selected={calendarDate}
              onChange={(date) => setCalendarDate(date)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleConnectCalendar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaCalendarAlt /> Connect Google Calendar <FaExternalLinkAlt className="text-sm" />
          </button>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Toggle
            label="Email Reminders"
            enabled={notifications.email}
            setEnabled={(val) => setNotifications({ ...notifications, email: val })}
          />
          <Toggle
            label="SMS Alerts"
            enabled={notifications.sms}
            setEnabled={(val) => setNotifications({ ...notifications, sms: val })}
          />
          <Toggle
            label="Panel Availability Warnings"
            enabled={notifications.panelWarnings}
            setEnabled={(val) => setNotifications({ ...notifications, panelWarnings: val })}
          />
        </Section>

        {/* Privacy Settings */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Privacy & Data">
            <Toggle
              label="Allow AI to use past feedback for predictions"
              enabled={true}
              setEnabled={() => {}}
            />
            <button
              onClick={handleExportData}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
            >
              <FaFileExport /> Export My Data
            </button>
            {exportedData && (
              <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto max-h-40">
                {JSON.stringify(exportedData, null, 2)}
              </pre>
            )}
          </Section>

          <Section title="Security Info">
            <div className="text-sm text-purple-800 space-y-2">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="mt-1" />
                <span>Your settings are private and stored securely.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaInfoCircle className="mt-1" />
                <span>Only you have access to your exported data.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaInfoCircle className="mt-1" />
                <span>You can delete your data anytime from your account page.</span>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right mt-12 max-w-6xl mx-auto">
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <FaSave /> Save Settings
        </button>
        {settingsSaved && <p className="mt-2 text-green-700 font-medium">Settings saved successfully!</p>}
      </div>
    </div>
  );
}

// Helper Components
const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-md h-full">
    <h2 className="text-lg font-semibold text-purple-800 mb-4">{title}</h2>
    {children}
  </div>
);

const Label = ({ title, children }) => (
  <label className="block mb-4">
    <span className="text-sm font-medium text-purple-700">{title}</span>
    {children}
  </label>
);

const Toggle = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between mb-3">
    <span className="text-sm text-purple-800">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        enabled ? 'bg-purple-600' : 'bg-gray-300'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
          enabled ? 'translate-x-6' : ''
        }`}
      ></div>
    </button>
  </div>
);

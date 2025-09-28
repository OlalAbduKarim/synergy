import React from 'react';
import { Availability } from '../types';
import { TIMEZONES } from '../constants';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface AvailabilityCalendarProps {
  availability: Availability;
  setAvailability: (availability: Availability) => void;
  disabled?: boolean;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ availability, setAvailability, disabled = false }) => {
  
  const handleScheduleChange = (day: string, field: 'isAvailable' | 'startTime' | 'endTime', value: boolean | string) => {
    setAvailability({
      ...availability,
      schedule: {
        ...availability.schedule,
        [day]: {
          ...availability.schedule[day],
          [field]: value,
        },
      },
    });
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvailability({
      ...availability,
      timezone: e.target.value,
    });
  };

  return (
    <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
        <div className="mb-4">
            <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">Timezone</label>
            <select
                id="timezone"
                value={availability.timezone}
                onChange={handleTimezoneChange}
                disabled={disabled}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
        </div>

        <div className="space-y-3">
            {daysOfWeek.map(day => {
                const daySchedule = availability.schedule[day];
                return (
                    <div key={day} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 p-2 rounded-md hover:bg-slate-100">
                        <div className="sm:col-span-1 flex items-center">
                            <input
                                type="checkbox"
                                id={`check-${day}`}
                                checked={daySchedule.isAvailable}
                                onChange={(e) => handleScheduleChange(day, 'isAvailable', e.target.checked)}
                                disabled={disabled}
                                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`check-${day}`} className="ml-3 block text-sm font-medium text-slate-700">{day}</label>
                        </div>
                        <div className="sm:col-span-3 flex items-center gap-2">
                           <label htmlFor={`start-${day}`} className="text-sm text-slate-500">From</label>
                           <input
                            type="time"
                            id={`start-${day}`}
                            value={daySchedule.startTime}
                            onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value)}
                            disabled={!daySchedule.isAvailable || disabled}
                            className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-primary focus:ring-primary disabled:bg-slate-200 disabled:cursor-not-allowed"
                           />
                           <label htmlFor={`end-${day}`} className="text-sm text-slate-500">To</label>
                           <input
                            type="time"
                            id={`end-${day}`}
                            value={daySchedule.endTime}
                            onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value)}
                            disabled={!daySchedule.isAvailable || disabled}
                            className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-primary focus:ring-primary disabled:bg-slate-200 disabled:cursor-not-allowed"
                           />
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default AvailabilityCalendar;
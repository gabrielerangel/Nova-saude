"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Patient, Doctor, Appointment } from '@/lib/types';
import { initialPatients, initialDoctors, initialAppointments } from '@/lib/data';

interface AppContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (patientId: string) => void;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (doctorId: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (appointmentId: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  getDoctorById: (id: string) => Doctor | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const serializedValue = JSON.stringify(storedValue);
        window.localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  // Set initial value from localStorage only once on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        } else {
          // If no data in local storage, use initial mock data
          setStoredValue(initialValue);
        }
      } catch (error) {
        console.error(error);
        setStoredValue(initialValue);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setStoredValue];
};


export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients] = useLocalStorage<Patient[]>('patients', initialPatients);
  const [doctors, setDoctors] = useLocalStorage<Doctor[]>('doctors', initialDoctors);
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', initialAppointments);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    setPatients([...patients, { ...patient, id: crypto.randomUUID() }]);
  };
  const updatePatient = (updatedPatient: Patient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };
  const deletePatient = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    setDoctors([...doctors, { ...doctor, id: crypto.randomUUID() }]);
  };
  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
  };
  const deleteDoctor = (doctorId: string) => {
    setDoctors(doctors.filter(d => d.id !== doctorId));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    setAppointments([...appointments, { ...appointment, id: crypto.randomUUID(), status: 'scheduled' }]);
  };
  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(a => a.id === updatedAppointment.id ? updatedAppointment : a));
  };
  const deleteAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter(a => a.id !== appointmentId));
  };

  const getPatientById = (id: string) => patients.find(p => p.id === id);
  const getDoctorById = (id: string) => doctors.find(d => d.id === id);

  const value = {
    patients,
    doctors,
    appointments,
    addPatient,
    updatePatient,
    deletePatient,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getPatientById,
    getDoctorById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

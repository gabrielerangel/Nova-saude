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
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'price'>) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (appointmentId: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  getDoctorById: (id: string) => Doctor | undefined;
  isDataLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] => {
  const [storedValue, setStoredValue] = useState<T>(() => initialValue);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
         window.localStorage.setItem(key, JSON.stringify(initialValue));
         setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    } finally {
        setIsDataLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (isDataLoaded) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue, isDataLoaded]);

  return [storedValue, setStoredValue, isDataLoaded];
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [patients, setPatients, patientsLoaded] = useLocalStorage<Patient[]>('patients', initialPatients);
  const [doctors, setDoctors, doctorsLoaded] = useLocalStorage<Doctor[]>('doctors', initialDoctors);
  const [appointments, setAppointments, appointmentsLoaded] = useLocalStorage<Appointment[]>('appointments', initialAppointments);
  
  const isDataLoaded = patientsLoaded && doctorsLoaded && appointmentsLoaded;

  const getPatientById = (id: string) => patients.find(p => p.id === id);
  const getDoctorById = (id: string) => doctors.find(d => d.id === id);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    setPatients(prev => [...prev, { ...patient, id: crypto.randomUUID() }]);
  };
  const updatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };
  const deletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
  };

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    setDoctors(prev => [...prev, { ...doctor, id: crypto.randomUUID() }]);
  };
  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
  };
  const deleteDoctor = (doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status' | 'price'>) => {
    const doctor = getDoctorById(appointment.doctorId);
    const specialtyPrices: { [key: string]: number } = {
        'Cardiologia': 550,
        'Dermatologia': 600,
        'Ortopedia': 450,
        'Pediatria': 400,
        'Neurologia': 700,
        'Ginecologia': 500,
        'Psiquiatria': 800,
    }
    const price = doctor ? specialtyPrices[doctor.specialty] || 400 : 400;
    setAppointments(prev => [...prev, { ...appointment, id: crypto.randomUUID(), status: 'scheduled', price }]);
  };
  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === updatedAppointment.id ? updatedAppointment : a));
  };
  const deleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(a => a.id !== appointmentId));
  };

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
    isDataLoaded,
  };

  return <AppContext.Provider value={value}>{isDataLoaded ? children : null}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

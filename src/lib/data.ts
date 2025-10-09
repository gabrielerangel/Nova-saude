import type { Patient, Doctor, Appointment } from './types';
import { format } from 'date-fns';

export const initialPatients: Patient[] = [
  { id: 'p1', name: 'Maria Silva', birthDate: '1985-05-20', cpf: '111.222.333-44', phone: '(11) 98765-4321', email: 'maria.silva@example.com' },
  { id: 'p2', name: 'João Pereira', birthDate: '1990-11-15', cpf: '222.333.444-55', phone: '(21) 91234-5678', email: 'joao.pereira@example.com' },
  { id: 'p3', name: 'Ana Costa', birthDate: '1978-02-10', cpf: '333.444.555-66', phone: '(31) 95555-4444', email: 'ana.costa@example.com' },
];

export const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Carlos Andrade', specialty: 'Cardiologia', crm: '12345-SP', phone: '(11) 91111-2222', email: 'carlos.andrade@saude.com' },
  { id: 'd2', name: 'Dra. Beatriz Lima', specialty: 'Dermatologia', crm: '67890-RJ', phone: '(21) 93333-4444', email: 'beatriz.lima@saude.com' },
  { id: 'd3', name: 'Dr. Ricardo Souza', specialty: 'Ortopedia', crm: '54321-MG', phone: '(31) 98888-7777', email: 'ricardo.souza@saude.com' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

export const initialAppointments: Appointment[] = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: format(today, 'yyyy-MM-dd'), time: '10:00', status: 'scheduled' },
  { id: 'a2', patientId: 'p2', doctorId: 'd2', date: format(tomorrow, 'yyyy-MM-dd'), time: '14:30', status: 'scheduled' },
  { id: 'a3', patientId: 'p3', doctorId: 'd1', date: format(nextWeek, 'yyyy-MM-dd'), time: '09:00', status: 'scheduled' },
  { id: 'a4', patientId: 'p1', doctorId: 'd3', date: '2024-06-10', time: '11:00', status: 'completed' },
];


import type { Patient, Doctor, Appointment } from './types';
import { format, addDays } from 'date-fns';

export const initialPatients: Patient[] = [
  { id: 'p1', name: 'Maria Silva', birthDate: '1985-05-20', cpf: '111.222.333-44', phone: '(11) 98765-4321', email: 'maria.silva@example.com' },
  { id: 'p2', name: 'João Pereira', birthDate: '1990-11-15', cpf: '222.333.444-55', phone: '(21) 91234-5678', email: 'joao.pereira@example.com' },
  { id: 'p3', name: 'Ana Costa', birthDate: '1978-02-10', cpf: '333.444.555-66', phone: '(31) 95555-4444', email: 'ana.costa@example.com' },
];

export const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Carlos Andrade', specialty: 'Cardiologia', crm: '12345-SP', phone: '(11) 91111-2222', email: 'carlos.andrade@saude.com' },
  { id: 'd2', name: 'Dra. Beatriz Lima', specialty: 'Dermatologia', crm: '67890-RJ', phone: '(21) 93333-4444', email: 'beatriz.lima@saude.com' },
  { id: 'd3', name: 'Dr. Ricardo Souza', specialty: 'Ortopedia', crm: '54321-MG', phone: '(31) 98888-7777', email: 'ricardo.souza@saude.com' },
  { id: 'd4', name: 'Dra. Fernanda Alves', specialty: 'Pediatria', crm: '11223-SP', phone: '(11) 92222-3333', email: 'fernanda.alves@saude.com' },
  { id: 'd5', name: 'Dr. Lucas Martins', specialty: 'Neurologia', crm: '44556-RJ', phone: '(21) 94444-5555', email: 'lucas.martins@saude.com' },
  { id: 'd6', name: 'Dra. Juliana Santos', specialty: 'Ginecologia', crm: '77889-SP', phone: '(11) 96666-7777', email: 'juliana.santos@saude.com' },
  { id: 'd7', name: 'Dr. Roberto Dias', specialty: 'Psiquiatria', crm: '10101-MG', phone: '(31) 91010-1010', email: 'roberto.dias@saude.com' },
];

export const initialAppointments: Appointment[] = [];

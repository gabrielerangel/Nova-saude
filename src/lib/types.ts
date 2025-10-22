export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  phone: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'canceled';
  price: number;
  rating?: number;
  type: 'presencial' | 'online';
}

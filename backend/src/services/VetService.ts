import vetRepository from '../repositories/VetRepository';
import cowService from './CowService';
import financeRepository from '../repositories/FinanceRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { IVetService } from '../interfaces/services/IVetService';

export class VetService implements IVetService {
  public async getMedicalRecords(params: { page: number; limit: number; cowId?: string; status?: string }) {
    return vetRepository.getMedicalRecords(params);
  }

  public async getMedicalRecordById(id: string) {
    const record = await vetRepository.getMedicalRecordById(id);
    if (!record) {
      throw new NotFoundError(`Medical record with ID ${id} not found`);
    }
    return record;
  }

  public async openMedicalRecord(data: {
    cowId: string;
    date: Date;
    diagnosis: string;
    treatment: string;
    doctorName: string;
    prescription?: string;
    cost?: number;
    notes?: string;
  }) {
    await cowService.getCowById(data.cowId); // Verify cow exists

    // If cost is supplied, record as operating expense
    const record = await vetRepository.createMedicalRecord({
      cowId: data.cowId,
      date: data.date,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      doctorName: data.doctorName,
      prescription: data.prescription || null,
      cost: data.cost || 0,
      status: 'OPEN',
      notes: data.notes || null,
    });

    // Update cow status to SICK
    await cowService.updateCow(data.cowId, { status: 'SICK' });

    return record;
  }

  public async closeMedicalRecord(id: string, additionalCost = 0, loggedByUserId: string) {
    const record = await this.getMedicalRecordById(id);
    if (record.status === 'CLOSED') {
      throw new BadRequestError('This medical record is already closed');
    }

    const finalCost = Number(record.cost) + additionalCost;

    const updatedRecord = await vetRepository.updateMedicalRecord(id, {
      status: 'CLOSED',
      cost: finalCost,
    });

    // Reset cow status to HEALTHY
    await cowService.updateCow(record.cowId, { status: 'HEALTHY' });

    // Record total medical costs in financial expenses
    if (finalCost > 0) {
      await financeRepository.createExpense({
        category: 'VET',
        amount: finalCost,
        date: new Date(),
        description: `Vet doctor treatment cost for Cow Tag: ${record.cow.tagNumber} (${record.diagnosis})`,
        recordedById: loggedByUserId,
      });
    }

    return updatedRecord;
  }

  public async getVaccinations(params: {
    page: number;
    limit: number;
    cowId?: string;
    status?: string;
    dueDateRangeStart?: Date;
    dueDateRangeEnd?: Date;
  }) {
    return vetRepository.getVaccinations(params);
  }

  public async scheduleVaccination(data: { cowId: string; vaccineName: string; dueDate: Date }) {
    await cowService.getCowById(data.cowId);
    return vetRepository.createVaccination({
      cowId: data.cowId,
      vaccineName: data.vaccineName,
      dueDate: data.dueDate,
      status: 'PENDING',
    });
  }

  public async administerVaccine(id: string, administeredBy: string, notes?: string) {
    const vaccinations = await vetRepository.getVaccinations({ page: 1, limit: 1000 });
    const vaccine = vaccinations.data.find((v) => v.id === id);

    if (!vaccine) {
      throw new NotFoundError(`Vaccination entry ${id} not found`);
    }

    return vetRepository.updateVaccination(id, {
      status: 'COMPLETED',
      administeredDate: new Date(),
      administeredBy,
      notes,
    });
  }

  public async getDiseases() {
    return vetRepository.getDiseases();
  }

  public async addDisease(name: string, description?: string, symptoms?: string, severity?: 'LOW' | 'MEDIUM' | 'HIGH') {
    return vetRepository.createDisease({
      name,
      description,
      symptoms,
      severity: severity || 'LOW',
    });
  }
}

export default new VetService();

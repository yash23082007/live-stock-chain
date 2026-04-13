// Animal Types
export interface Animal {
  id: string;
  farmId: string;
  tagNumber: string;
  nftTokenId?: string;
  name?: string;
  species: string;
  breed?: string;
  gender?: "male" | "female" | "unknown";
  dateOfBirth?: Date;
  birthWeightKg?: number;
  colorMarkings?: string;
  photoUrl?: string;
  status: "active" | "sold" | "deceased" | "transferred";
  healthScore: number;
  lastHealthCheck?: Date;
  currentOwnerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Health Event Types
export type HealthEventType = "vaccination" | "treatment" | "checkup" | "illness" | "injury";
export type Severity = "low" | "medium" | "high" | "critical";

export interface HealthEvent {
  id: string;
  animalId: string;
  eventType: HealthEventType;
  eventDate: Date;
  description?: string;
  veterinarianId?: string;
  drugName?: string;
  dosage?: string;
  withdrawalDays?: number;
  withdrawalEndDate?: Date;
  batchNumber?: string;
  dataHash?: string;
  onChainTxHash?: string;
  onChainAnchored: boolean;
  severity?: Severity;
  notes?: string;
  createdAt: Date;
}

// Farm Types
export interface Farm {
  id: string;
  name: string;
  ownerId: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  onChainFarmId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Alert Types
export type AlertType = "vaccination_due" | "outbreak_risk" | "withdrawal_expiry" | "health_check_due";

export interface Alert {
  id: string;
  farmId: string;
  animalId?: string;
  alertType: AlertType;
  message: string;
  severity: Severity;
  isRead: boolean;
  createdAt: Date;
}

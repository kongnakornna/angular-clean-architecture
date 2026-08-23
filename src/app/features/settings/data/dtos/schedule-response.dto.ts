export interface ScheduleResponseDto {
  id: string;
  name: string;
  startTime: string;
  event: string;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

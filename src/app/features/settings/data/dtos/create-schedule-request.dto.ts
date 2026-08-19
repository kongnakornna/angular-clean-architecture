export interface CreateScheduleRequestDto {
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
}

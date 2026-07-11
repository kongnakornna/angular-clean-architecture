export interface AlarmValidationRequest {
  actionName: string;
  deviceName: string;
  hardwareID: number;
  unit: string;
  valueData: number;
  sensorValueData: number;
  min: number;
  max: number;
  valueAlarm: number;
  statusAlert: number;
  statusWarning: number;
  recoveryAlert: number;
  recoveryWarning: number;
  countAlarm: number;
  mqttName: string;
  mqttControlOn: string;
  mqttControlOff: string;
  event: number;
  valueRelay: number;
  valueControlRelay: number;
}

export interface AlarmValidationResponse {
  alarmActionName: string;
  title: string;
  subject: string;
  content: string;
  lang: string;
  deviceNameStr: string;
  deviceNameVal: string;
  mqttControlOnVal: string;
  mqttControlOffVal: string;
  status: number;
  statusAlertVal: number;
  statusWarningVal: number;
  recoveryAlertVal: number;
  recoveryWarningVal: number;
  typeId: number;
  alarmTypeId: number;
  hardwareId: number;
  alarmStatusSet: number;
  unit: string;
  timestamp: string;
  messageMqttControl: string;
  eventControl: number;
  eventVal: number;
  dataAlarm: number;
  dataAlarmRaw: number;
  sensorData: null;
  sensorValue: null;
}

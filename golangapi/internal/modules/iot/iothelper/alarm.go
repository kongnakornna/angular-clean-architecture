// internal/modules/iot/iothelper/alarm.go
package iothelper

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type AlarmDetailDto struct {
	HardwareID      interface{}
	ValueData       interface{}
	Max             interface{}
	Min             interface{}
	StatusAlert     interface{}
	StatusWarning   interface{}
	RecoveryWarning interface{}
	RecoveryAlert   interface{}
	DeviceName      string
	ActionName      string
	MqttName        string
	MqttControlOn   string
	MqttControlOff  string
	CountAlarm      interface{}
	Event           interface{}
	Unit            string
}

type AlarmDetailResult struct {
	Status             int         `json:"status"`
	StatusControl      int         `json:"status_control"`
	AlarmTypeId        int         `json:"alarm_type_id"`
	TypeId             int         `json:"type_id"`
	HardwareId         int         `json:"hardware_id"`
	AlarmStatusSet     int         `json:"alarm_status_set"`
	Title              string      `json:"title"`
	Subject            string      `json:"subject"`
	Content            string      `json:"content"`
	DataAlarm          int         `json:"data_alarm"`
	EventControl       int         `json:"event_control"`
	MessageMqttControl string      `json:"message_mqtt_control"`
	SensorData         interface{} `json:"sensor_data"`
	CountAlarm         int         `json:"count_alarm"`
	Unit               string      `json:"unit"`
	Timestamp          string      `json:"timestamp"`
}

var thaiMessages = map[string]string{
	"warning":          "คำเตือน มีความผิดปกติ",
	"critical":         "ภาวะวิกฤตต้องแก้ไขทันที",
	"recoveryWarning":  "คืนสู่ภาวะปกติ (คำเตือน)",
	"recoveryCritical": "คืนสู่ภาวะปกติ (วิกฤต)",
	"normal":           "ปกติ",
	"normal2":          "ปกติ",
	"criticalMax":      "วิกฤต มีค่าสูงเกินกำหนด",
	"criticalMin":      "วิกฤต มีค่าต่ำกว่ากำหนด",
	"normal3":          "ปกติ",
}

var englishMessages = map[string]string{
	"warning":          "Warning",
	"critical":         "Critical",
	"recoveryWarning":  "Recovery Warning",
	"recoveryCritical": "Recovery Critical",
	"normal":           "Normal",
	"normal2":          "Normal",
	"criticalMax":      "Critical! Maximum limit.",
	"criticalMin":      "Critical! Minimum limit",
	"normal3":          "Normal",
}

func toInt(v interface{}) int {
	switch val := v.(type) {
	case int:
		return val
	case int64:
		return int(val)
	case float64:
		return int(val)
	case string:
		i, _ := strconv.Atoi(val)
		return i
	default:
		return 0
	}
}

func toFloat(v interface{}) float64 {
	switch val := v.(type) {
	case float64:
		return val
	case int:
		return float64(val)
	case int64:
		return float64(val)
	case string:
		f, _ := strconv.ParseFloat(val, 64)
		return f
	default:
		return 0
	}
}

func normalizeSensorValue(v interface{}) interface{} {
	if v == nil {
		return nil
	}
	switch val := v.(type) {
	case string:
		if f, err := strconv.ParseFloat(val, 64); err == nil {
			return f
		}
		up := strings.ToUpper(val)
		if up == "ON" {
			return 1
		}
		if up == "OFF" {
			return 0
		}
		return val
	default:
		return val
	}
}

func processAlarmDetail(dto AlarmDetailDto, messages map[string]string) AlarmDetailResult {
	hardwareID := toInt(dto.HardwareID)
	typeID := hardwareID

	sensorValue := normalizeSensorValue(dto.ValueData)
	maxVal := toFloat(dto.Max)
	minVal := toFloat(dto.Min)
	statusAlert := toInt(dto.StatusAlert)
	statusWarning := toInt(dto.StatusWarning)
	recoveryWarning := toInt(dto.RecoveryWarning)
	recoveryAlert := toInt(dto.RecoveryAlert)
	countAlarm := toInt(dto.CountAlarm)
	event := toInt(dto.Event)

	unit := dto.Unit
	mqttName := dto.MqttName
	deviceName := dto.DeviceName
	alarmActionName := dto.ActionName
	mqttControlOn := dto.MqttControlOn
	mqttControlOff := dto.MqttControlOff
	valueAlarm := dto.ValueData

	var sensorData interface{}

	switch hardwareID {
	case 1:
		sensorData = dto.ValueData
	case 2:
		if toInt(dto.ValueData) == 1 {
			sensorData = 1
			sensorValue = 1
		} else {
			sensorData = toInt(dto.ValueData)
			sensorValue = toInt(dto.ValueData)
		}
	case 3:
		sensorData = toInt(dto.ValueData)
		sensorValue = dto.ValueData
	case 4:
		sensorData = dto.ValueData
	default:
		sensorData = toInt(dto.ValueData)
	}

	alarmStatusSet := 999
	dataAlarm := 0
	eventControl := event
	messageMqttControl := mqttControlOff
	if event == 1 {
		messageMqttControl = mqttControlOn
	}
	status := 5
	title := messages["normal"]
	subject := messages["normal"]
	content := messages["normal"] + " "

	if hardwareID == 3 && (sensorValue == 1 || sensorValue == 0 || sensorValue == "ON" || sensorValue == "OFF" || sensorValue == "on" || sensorValue == "off") {
		alarmStatusSet = 999
		title = messages["normal"]
		subject = messages["normal"]
		content = fmt.Sprintf("%s %v %s", messages["normal"], sensorValue, unit)
		status = 5
	} else if hardwareID == 4 && sensorValue != 1 {
		alarmStatusSet = 2
		title = messages["critical"]
		subject = fmt.Sprintf("%s %s %s : %v %s", mqttName, messages["critical"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s : %s :%v %s", mqttName, alarmActionName, messages["critical"], deviceName, sensorValue, unit)
		dataAlarm = statusWarning
		status = 2
	} else if hardwareID == 4 && sensorValue == 1 {
		alarmStatusSet = 999
		title = messages["normal2"]
		subject = messages["normal2"]
		content = fmt.Sprintf("%s %v %s", messages["normal2"], sensorValue, unit)
		status = 5
	} else if maxVal != 0 && toFloat(sensorValue) >= maxVal && (hardwareID == 1 || hardwareID == 2) {
		alarmStatusSet = 2
		title = messages["criticalMax"]
		subject = fmt.Sprintf("%s %s %s : %v %s", mqttName, messages["criticalMax"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s : %s :%v %s", mqttName, alarmActionName, messages["criticalMax"], deviceName, sensorValue, unit)
		dataAlarm = statusWarning
		status = 2
	} else if minVal != 0 && toFloat(sensorValue) <= minVal && (hardwareID == 1 || hardwareID == 2) {
		alarmStatusSet = 1
		title = messages["criticalMin"]
		subject = fmt.Sprintf("%s %s %s : %v %s", mqttName, messages["criticalMin"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s : %s :%v %s", mqttName, alarmActionName, messages["criticalMin"], deviceName, sensorValue, unit)
		dataAlarm = statusWarning
		status = 1
	} else if hardwareID == 1 && statusWarning > 0 && toFloat(sensorValue) >= float64(statusWarning) && toFloat(sensorValue) < float64(statusAlert) {
		alarmStatusSet = 1
		title = messages["warning"]
		subject = fmt.Sprintf("%s %s : %s : %v %s", mqttName, messages["warning"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s: %s :%v %s", mqttName, alarmActionName, messages["warning"], deviceName, sensorValue, unit)
		dataAlarm = statusWarning
		status = 1
	} else if hardwareID == 1 && statusAlert > 0 && toFloat(sensorValue) >= float64(statusAlert) {
		alarmStatusSet = 2
		title = messages["critical"]
		subject = fmt.Sprintf("%s %s : %s :%v %s", mqttName, messages["critical"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s: %s :%v %s", mqttName, alarmActionName, messages["critical"], deviceName, sensorValue, unit)
		dataAlarm = statusAlert
		status = 2
	} else if toInt(valueAlarm) == 0 && (hardwareID == 2 || hardwareID == 3 || hardwareID == 4) {
		isCritical := hardwareID == 4
		if isCritical {
			alarmStatusSet = 2
			title = messages["critical"]
		} else {
			alarmStatusSet = 1
			title = messages["warning"]
		}
		subject = fmt.Sprintf("%s %s : %s : %v %s", mqttName, title, deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s: %s :%v %s", mqttName, alarmActionName, title, deviceName, sensorValue, unit)
		if isCritical {
			dataAlarm = statusAlert
		} else {
			dataAlarm = statusWarning
		}
		status = 2
		if !isCritical {
			status = 1
		}
	} else if countAlarm >= 1 && recoveryWarning > 0 && toFloat(sensorValue) <= float64(recoveryWarning) && (hardwareID == 1 || hardwareID == 2) {
		alarmStatusSet = 3
		title = messages["recoveryWarning"]
		subject = fmt.Sprintf("%s %s : %s :%v %s", mqttName, messages["recoveryWarning"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s: %s :%v %s", mqttName, alarmActionName, messages["recoveryWarning"], deviceName, sensorValue, unit)
		dataAlarm = recoveryWarning
		eventControl = 0
		if event == 1 {
			eventControl = 1
		}
		if event == 1 {
			messageMqttControl = mqttControlOff
		} else {
			messageMqttControl = mqttControlOn
		}
		status = 3
	} else if countAlarm >= 1 && recoveryAlert > 0 && toFloat(sensorValue) <= float64(recoveryAlert) && (hardwareID == 1 || hardwareID == 2) {
		alarmStatusSet = 4
		title = fmt.Sprintf("%s %s", mqttName, messages["recoveryCritical"])
		subject = fmt.Sprintf("%s %s :%s :%v %s", mqttName, messages["recoveryCritical"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s :%s :%v %s", mqttName, alarmActionName, messages["recoveryCritical"], deviceName, sensorValue, unit)
		dataAlarm = recoveryAlert
		eventControl = 0
		if event == 1 {
			eventControl = 1
		}
		if event == 1 {
			messageMqttControl = mqttControlOff
		} else {
			messageMqttControl = mqttControlOn
		}
		status = 4
	} else if countAlarm >= 1 && toInt(valueAlarm) >= 1 && (hardwareID == 2 || hardwareID == 3 || hardwareID == 4) {
		alarmStatusSet = 4
		title = fmt.Sprintf("%s %s", mqttName, messages["recoveryCritical"])
		subject = fmt.Sprintf("%s %s :%s :%v %s", mqttName, messages["recoveryCritical"], deviceName, sensorValue, unit)
		content = fmt.Sprintf("%s %s %s :%s :%v %s", mqttName, alarmActionName, messages["recoveryCritical"], deviceName, sensorValue, unit)
		dataAlarm = recoveryAlert
		eventControl = 0
		if event == 1 {
			eventControl = 1
		}
		if event == 1 {
			messageMqttControl = mqttControlOff
		} else {
			messageMqttControl = mqttControlOn
		}
		status = 4
	} else {
		alarmStatusSet = 999
		title = messages["normal3"]
		subject = messages["normal3"]
		content = messages["normal"] + " "
		dataAlarm = 0
		status = 5
	}

	return AlarmDetailResult{
		Status:             status,
		StatusControl:      status,
		AlarmTypeId:        hardwareID,
		TypeId:             typeID,
		HardwareId:         hardwareID,
		AlarmStatusSet:     alarmStatusSet,
		Title:              title,
		Subject:            subject,
		Content:            content,
		DataAlarm:          dataAlarm,
		EventControl:       eventControl,
		MessageMqttControl: messageMqttControl,
		SensorData:         sensorData,
		CountAlarm:         countAlarm,
		Unit:               unit,
		Timestamp:          time.Now().Format("2006-01-02 15:04:05"),
	}
}

func AlarmDetailValidate(dto AlarmDetailDto) AlarmDetailResult {
	return processAlarmDetail(dto, thaiMessages)
}

func AlarmDetailValidateEn(dto AlarmDetailDto) AlarmDetailResult {
	return processAlarmDetail(dto, englishMessages)
}

func AlarmDetailValidateTh(dto AlarmDetailDto) AlarmDetailResult {
	return processAlarmDetail(dto, thaiMessages)
}

func ConvertSortInput(sort string) (field string, order string, err error) {
	if sort == "" {
		return "", "", nil
	}
	parts := strings.SplitN(sort, ":", 2)
	if len(parts) != 2 {
		return "", "", errors.New("invalid sort option, expected format 'field:asc|desc'")
	}
	order = strings.ToUpper(parts[1])
	if order != "ASC" && order != "DESC" {
		return "", "", errors.New("sort order must be ASC or DESC")
	}
	return parts[0], order, nil
}

# Node-RED REST API Examples

## 1. สร้าง Flow ใหม่ (Create Flow)

### cURL

```bash
curl -X POST http://localhost:1880/flows \
  -u admin:password \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d '{
    "flows": [
      {
        "id": "flow-1",
        "type": "tab",
        "label": "My New Flow",
        "disabled": false,
        "info": ""
      },
      {
        "id": "inject-1",
        "type": "inject",
        "name": "Inject Timestamp",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 150,
        "y": 100,
        "z": "flow-1",
        "wires": [["debug-1"]]
      },
      {
        "id": "debug-1",
        "type": "debug",
        "name": "Debug Output",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 350,
        "y": 100,
        "z": "flow-1",
        "wires": []
      }
    ]
  }'
```

### Python (requests)

```python
import requests
from requests.auth import HTTPBasicAuth

url = "http://localhost:1880/flows"
auth = HTTPBasicAuth("admin", "password")

payload = {
    "flows": [
        {
            "id": "flow-1",
            "type": "tab",
            "label": "My New Flow",
            "disabled": False,
            "info": ""
        },
        {
            "id": "inject-1",
            "type": "inject",
            "name": "Inject Timestamp",
            "repeat": "",
            "crontab": "",
            "once": False,
            "onceDelay": 0.1,
            "topic": "",
            "payload": "",
            "payloadType": "date",
            "x": 150,
            "y": 100,
            "z": "flow-1",
            "wires": [["debug-1"]]
        },
        {
            "id": "debug-1",
            "type": "debug",
            "name": "Debug Output",
            "active": True,
            "tosidebar": True,
            "console": False,
            "tostatus": False,
            "complete": "payload",
            "targetType": "msg",
            "statusVal": "",
            "statusType": "auto",
            "x": 350,
            "y": 100,
            "z": "flow-1",
            "wires": []
        }
    ]
}

headers = {
    "Content-Type": "application/json",
    "Node-RED-Deployment-Type": "full"
}

response = requests.post(url, json=payload, headers=headers, auth=auth)
print(response.json())
```

### JavaScript (fetch)

```javascript
const flows = {
  flows: [
    {
      id: "flow-1",
      type: "tab",
      label: "My New Flow",
      disabled: false,
      info: ""
    },
    {
      id: "inject-1",
      type: "inject",
      name: "Inject Timestamp",
      repeat: "",
      crontab: "",
      once: false,
      onceDelay: 0.1,
      topic: "",
      payload: "",
      payloadType: "date",
      x: 150,
      y: 100,
      z: "flow-1",
      wires: [["debug-1"]]
    },
    {
      id: "debug-1",
      type: "debug",
      name: "Debug Output",
      active: true,
      tosidebar: true,
      console: false,
      tostatus: false,
      complete: "payload",
      targetType: "msg",
      statusVal: "",
      statusType: "auto",
      x: 350,
      y: 100,
      z: "flow-1",
      wires: []
    }
  ]
};

fetch("http://localhost:1880/flows", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa("admin:password"),
    "Node-RED-Deployment-Type": "full"
  },
  body: JSON.stringify(flows)
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 2. ดึง Flows ทั้งหมด (Get All Flows)

### cURL

```bash
curl -u admin:password http://localhost:1880/flows
```

### Python

```python
import requests
from requests.auth import HTTPBasicAuth

url = "http://localhost:1880/flows"
auth = HTTPBasicAuth("admin", "password")

response = requests.get(url, auth=auth)
flows = response.json()

for flow in flows:
    print(f"Flow ID: {flow['id']}, Label: {flow['label']}")
```

---

## 3. ดึง Flow เดี่ยว (Get Single Flow)

```bash
curl -u admin:password http://localhost:1880/flow/{flow-id}
```

---

## 4. อัพเดท Flow (Update Flow)

```bash
curl -X PUT http://localhost:1880/flow/{flow-id} \
  -u admin:password \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d '{
    "flows": [
      {
        "id": "flow-1",
        "type": "tab",
        "label": "Updated Flow Name",
        "disabled": false,
        "info": "Updated description"
      }
    ]
  }'
```

---

## 5. ลบ Flow (Delete Flow)

```bash
curl -X DELETE http://localhost:1880/flow/{flow-id} \
  -u admin:password
```

---

## 6. ติดตั้ง Node Module (Install Module)

### ติดตั้ง Email Node

```bash
curl -X POST http://localhost:1880/nodes \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "module": "node-red-node-email",
    "version": "1.0.0"
  }'
```

### ติดตั้ง MQTT Node

```bash
curl -X POST http://localhost:1880/nodes \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "module": "node-red-node-mqtt"
  }'
```

---

## 7. เปิด/ปิด Module (Enable/Disable Module)

```bash
curl -X PUT http://localhost:1880/nodes/node-red-node-email \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true
  }'
```

---

## 8. ลบ Module (Remove Module)

```bash
curl -X DELETE http://localhost:1880/nodes/node-red-node-email \
  -u admin:password
```

---

## 9. สร้าง HTTP Endpoint

### สร้าง GET API

```json
{
  "flows": [
    {
      "id": "http-endpoint-1",
      "type": "tab",
      "label": "HTTP API Flow"
    },
    {
      "id": "http-in-1",
      "type": "http in",
      "name": "GET /api/data",
      "url": "/api/data",
      "method": "get",
      "upload": false,
      "swaggerDoc": "",
      "x": 150,
      "y": 100,
      "z": "http-endpoint-1",
      "wires": [["function-1"]]
    },
    {
      "id": "function-1",
      "type": "function",
      "name": "Process Data",
      "func": "msg.payload = { status: 'ok', data: 'Hello World' };\nreturn msg;",
      "outputs": 1,
      "timeout": "",
      "noerr": 0,
      "initialize": "",
      "finalize": "",
      "libs": [],
      "x": 350,
      "y": 100,
      "z": "http-endpoint-1",
      "wires": [["http-response-1"]]
    },
    {
      "id": "http-response-1",
      "type": "http response",
      "name": "Response",
      "statusCode": "200",
      "headers": {},
      "x": 550,
      "y": 100,
      "z": "http-endpoint-1",
      "wires": []
    }
  ]
}
```

### สร้าง POST API

```json
{
  "flows": [
    {
      "id": "http-post-1",
      "type": "http in",
      "name": "POST /api/users",
      "url": "/api/users",
      "method": "post",
      "upload": true,
      "swaggerDoc": "",
      "x": 150,
      "y": 200,
      "z": "http-endpoint-1",
      "wires": [["function-2"]]
    },
    {
      "id": "function-2",
      "type": "function",
      "name": "Process User",
      "func": "const user = msg.payload;\nmsg.payload = { \n  id: Date.now(), \n  name: user.name, \n  email: user.email,\n  created: new Date().toISOString()\n};\nreturn msg;",
      "outputs": 1,
      "timeout": "",
      "noerr": 0,
      "initialize": "",
      "finalize": "",
      "libs": [],
      "x": 350,
      "y": 200,
      "z": "http-endpoint-1",
      "wires": [["http-response-2"]]
    },
    {
      "id": "http-response-2",
      "type": "http response",
      "name": "Response",
      "statusCode": "201",
      "headers": {},
      "x": 550,
      "y": 200,
      "z": "http-endpoint-1",
      "wires": []
    }
  ]
}
```

---

## 10. สร้าง Flow ที่มี Switch Node

```json
{
  "flows": [
    {
      "id": "switch-flow-1",
      "type": "tab",
      "label": "Switch Flow"
    },
    {
      "id": "http-in-switch",
      "type": "http in",
      "name": "POST /api/route",
      "url": "/api/route",
      "method": "post",
      "x": 150,
      "y": 150,
      "z": "switch-flow-1",
      "wires": [["switch-1"]]
    },
    {
      "id": "switch-1",
      "type": "switch",
      "name": "Route by Action",
      "property": "payload.action",
      "propertyType": "msg",
      "rules": [
        {
          "t": "eq",
          "v": "create",
          "vt": "str"
        },
        {
          "t": "eq",
          "v": "update",
          "vt": "str"
        },
        {
          "t": "eq",
          "v": "delete",
          "vt": "str"
        }
      ],
      "checkall": "true",
      "repair": false,
      "outputs": 3,
      "x": 350,
      "y": 150,
      "z": "switch-flow-1",
      "wires": [["func-create"], ["func-update"], ["func-delete"]]
    }
  ]
}
```

---

## 11. ใช้ Token Authentication

```bash
# Step 1: Login
TOKEN=$(curl -s -X POST http://localhost:1880/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "node-red-admin",
    "grant_type": "password",
    "username": "admin",
    "password": "password"
  }' | jq -r '.access_token')

# Step 2: ใช้ Token
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:1880/flows | jq .
```

---

## 12. Backup Flow

```bash
#!/bin/bash
# backup-flows.sh

USERNAME="admin"
PASSWORD="password"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

curl -u $USERNAME:$PASSWORD \
  http://localhost:1880/flows \
  -o "$BACKUP_DIR/flows_$DATE.json"

echo "Backup saved to $BACKUP_DIR/flows_$DATE.json"
```

---

## 13. Restore Flow

```bash
#!/bin/bash
# restore-flows.sh

USERNAME="admin"
PASSWORD="password"
BACKUP_FILE=$1

curl -X POST http://localhost:1880/flows \
  -u $USERNAME:$PASSWORD \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d @"$BACKUP_FILE"
```

---

## 14. Monitor Flows

```bash
# ดู flows ทุก 5 วินาที
watch -n 5 'curl -s -u admin:password http://localhost:1880/flows | jq ".[].label"'
```

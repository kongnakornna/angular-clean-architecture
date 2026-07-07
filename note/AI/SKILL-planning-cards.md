---
name: planning-cards
description: "Generate Miro-style implementation plan cards and Mermaid flowcharts from user requirements. Use when users ask for plan cards, implementation plans, system flowcharts, or structured task/objective breakdowns. Output must be written to both docs/planning/{card-number}/rtrpms-{card-number}.html and docs/planning/{card-number}/rtrpms-{card-number}.md."
argument-hint: "Describe scope, modules, and expected output format (e.g. 'plan matrix manager validation with backend/frontend cards + mermaid html')."
user-invocable: true
---

# Planning Cards

Create a clear implementation plan in Miro-card style using paired Task Card and Objective Card sections, plus a Mermaid flowchart that reflects the real system path.

## Purpose

This skill converts requirement text into a structured plan document for review and implementation alignment.

Primary output targets:

- docs/planning/{card-number}/rtrpms-{card-number}.html
- docs/planning/{card-number}/rtrpms-{card-number}.md

Output file naming rule:

- Extract card number from input such as RTRPMS-2553, RTRED-2612, or plain numeric card id
- Create subfolder by card number: docs/planning/{number}/
- Write HTML as docs/planning/{number}/rtrpms-{number}.html (example: docs/planning/2553/rtrpms-2553.html)
- Write Markdown as docs/planning/{number}/rtrpms-{number}.md (example: docs/planning/2553/rtrpms-2553.md)
- If card number is missing, ask user for card number before finalizing output

---

## When To Use

Use this skill when the user asks for:

- Plan cards
- Implementation plan
- System flowchart
- Task and objective breakdown
- Miro-style project plan in html

Typical triggers:

- "แผนงาน"
- "Plan การ์ด"
- "Flowchart"
- "สรุปเป็น implementation plan"
- "/planning-cards"

---

## When Not To Use

Do not use this skill when the user asks to:

- Implement production code directly
- Debug runtime errors or stack traces
- Create release notes, RCA reports, or test execution reports
- Modify existing business logic without planning output

If the user asks for coding immediately, switch to the relevant implementation skill.

---

## Output Contract

The generated outputs must include two files:

- docs/planning/{card-number}/rtrpms-{card-number}.html
- docs/planning/{card-number}/rtrpms-{card-number}.md

Both files must include sections in this exact order:

1. Title and scope summary
2. Developer / Function Flowchart (Mermaid)
3. Shared logic section (if applicable)
4. Per-menu or per-module plan tables
5. Error codes and i18n mapping (if applicable)
6. Open questions and assumptions
7. Manual test scenarios

If required information is missing, ask concise clarification questions before generating the final plan.

The generator must ensure folders docs/planning and docs/planning/{card-number} exist before writing output.
The markdown file content must be semantically aligned with the HTML file.

---

## Card Design Rules

Use paired-card table format in HTML:

<table>
  <thead>
    <tr>
      <th>การ์ดหลัก (Task Card)</th>
      <th>การ์ดเป้าหมาย (Objective Card)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Task details</td>
      <td>Objective steps</td>
    </tr>
  </tbody>
</table>

Card color markers:

- 🔵 Backend cards: Repository, Service, Handler, Engine, DB-related logic
  - `[handler]`: ทำหน้าที่รับข้อมูลนำเข้าและส่งผลลัพธ์ออก (Input/Output) ของ API และส่งต่อให้ Service เท่านั้น
  - `[service]`: ทำหน้าที่จัดการตรรกะทางธุรกิจและการประมวลผลเงื่อนไขต่างๆ (Business Logic & Validation) ห้ามสั่ง SQL/DB Query โดยตรง
  - `[repo]`: ทำหน้าที่เชื่อมต่อและคิวรีดึงข้อมูลดิบจากตารางฐานข้อมูลเท่านั้น (DB Query/CRUD) ห้ามใส่ Business Logic หรือประมวลผลตรรกะเชิงเงื่อนไขอื่นๆ
- 🟢 Frontend cards: Component, View, UI state, client-side service calls

Required fields in every Task Card:

- Task ID in this format: RTRPMS{card-number}-{priority-order}
- Layer label in bracket: [repo|service|handler|component|html|engine|other]
- Short title of the change
- file path (workspace-relative path only)
- Input
- Output
- Flow
- Unit test requirement (must explicitly state to write unit tests)

Required fields in every Objective Card:

- Ordered implementation details
- Explicit success condition
- Explicit error path (if any)

Task Card text template (must follow):

- การ์ดหลัก (Task Card)
- RTRPMS{card-number}-{priority-order}: [{{layer}}] {{title}}
- 📁 file: {{impacted path}}
- 📥 Input: {{layer inputs}}
- 📤 Output: {{layer outputs}}
- 🔁 Flow: {{processing flow}}
- 🧪 Unit: ระบุให้เขียน unit test

Objective Card text template (must follow):

- การ์ดเป้าหมาย (Objective Card)
- 🎯 Objective
- ระบุ detail แบบเรียงลำดับให้ทำงานได้จริง

Do not use machine-specific file URI formats.
Do not invent file paths that are not provided by the user or repository context.

HTML font rule (mandatory):

- HTML export must set font-family to Tahoma.
- Add this in CSS for body or root container: font-family: Tahoma, sans-serif;

---

## Manual Test Rules

Every plan must include a Manual Test section in HTML table format.

Required columns:

- Test ID
- Scenario
- Steps
- Expected Result

Required coverage:

- Negative case (does not pass condition)
- Positive case (passes condition)
- Primary user flow and admin flow (if both exist in scope)

Manual Test template (must follow):

- Test ID: MT-{card-number}-{two-digit-sequence}
- Steps: ordered steps that can be executed by tester
- Expected Result: explicit UI/API outcomes and state-reset behavior

---

## Mermaid Rules

At the top of the plan, include one Mermaid flowchart that traces the end-to-end call path in HTML using a mermaid container.

Requirements:

- Show entry from frontend or API caller
- Show handler, service, repository, and shared engine nodes where relevant
- Label API methods and routes on edges when available
- Keep node naming consistent with real function names
- Reflect backend/frontend color semantics using classDef
- Include Mermaid runtime script so the diagram can render when opening the HTML file

If uncertain about a function path, mark it as assumption in the Open questions and assumptions section.

---

## Validation Checklist (Must Pass Before Finalizing)

- Every task has both Task Card and Objective Card
- Every Task Card includes all required fields
- Every Task Card follows the required text template and ID format RTRPMS{card-number}-{priority-order}
- Mermaid flow matches table content and call sequence
- No fake file paths or fake function names
- Error code mapping is linked to the correct menu/module
- i18n keys include both Thai and English when requested
- Plan wording is concise and implementation-ready
- HTML opens directly in browser without syntax issues
- HTML uses Tahoma font-family
- Output file paths follow:
  - docs/planning/{card-number}/rtrpms-{card-number}.html
  - docs/planning/{card-number}/rtrpms-{card-number}.md
- Markdown output exists and matches HTML structure/sections
- Manual Test section exists with required columns and both positive/negative coverage

If any checklist item fails, revise the output before returning it.

---

## Response Style

- Keep language clear and review-friendly
- Prefer concise technical Thai, with English terms for code artifacts
- Use semantic HTML structure (section, table, heading, list)
- Avoid unnecessary narrative text

---

## Example Skeleton

Use this skeleton as the baseline structure for docs/planning/{card-number}/rtrpms-{card-number}.html:

<!doctype html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>แผนการดำเนินงาน - หัวข้อ</title>
  <style>
    body {
      font-family: Tahoma, sans-serif;
    }
  </style>
</head>
<body>
  <main>
    <section>
      <h1>แผนการดำเนินงาน - หัวข้อ</h1>
      <p>Title and scope summary</p>
    </section>

    <section>
      <h2>Developer / Function Flowchart</h2>
      <div class="mermaid">

graph TD
classDef be fill:#1d4ed8,stroke:#3b82f6,color:#fff;
classDef fe fill:#047857,stroke:#10b981,color:#fff;

</div>
</section>

    <section>
      <h2>Shared logic section</h2>
      <table>
        <thead>
          <tr>
            <th>การ์ดหลัก (Task Card)</th>
            <th>การ์ดเป้าหมาย (Objective Card)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🔵 TASK-ID ...</td>
            <td>🎯 Objective ...</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Per-menu or per-module plan tables</h2>
      <table>
        <thead>
          <tr>
            <th>การ์ดหลัก (Task Card)</th>
            <th>การ์ดเป้าหมาย (Objective Card)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Error Codes และ i18n Keys</h2>
      <ul>
        <li>Error code mapping</li>
        <li>Translation key mapping</li>
      </ul>
    </section>

    <section>
      <h2>Open Questions and Assumptions</h2>
      <ul>
        <li>Q1...</li>
        <li>Assumption 1...</li>
      </ul>
    </section>

    <section>
      <h2>Manual Test</h2>
      <table>
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Scenario</th>
            <th>Steps</th>
            <th>Expected Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MT-{card-number}-01</td>
            <td>Negative case</td>
            <td><ol><li>Step 1...</li><li>Step 2...</li></ol></td>
            <td><ul><li>Expected 1...</li><li>Expected 2...</li></ul></td>
          </tr>
          <tr>
            <td>MT-{card-number}-02</td>
            <td>Positive case</td>
            <td><ol><li>Step 1...</li><li>Step 2...</li></ol></td>
            <td><ul><li>Expected 1...</li><li>Expected 2...</li></ul></td>
          </tr>
        </tbody>
      </table>
    </section>

  </main>

  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    mermaid.initialize({ startOnLoad: true, securityLevel: "loose" });
  </script>
</body>
</html>

Markdown export rule:

- Also generate docs/planning/{card-number}/rtrpms-{card-number}.md
- Keep the same section order as HTML
- Include Mermaid block in markdown format using fenced code block

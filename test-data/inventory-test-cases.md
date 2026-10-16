# Inventory Module - Test Cases

**Project:** Inventory Application  
**Module:** Technical Assets, Software Licenses, Infrastructure Assets  
**Test Type:** Functional, Validation, Boundary, Smoke  
**Priority:** P0 = Critical, P1 = High, P2 = Medium, P3 = Low

---

## Module 1: Technical Assets

### TC-TA-001: Display Technical Assets Table
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-001 |
| **Title** | Display Technical Assets Table |
| **Priority** | P0 |
| **Type** | Smoke |
| **Module** | Technical Assets |

**Preconditions:**
- User is logged in
- User has access to Inventory module

**Test Steps:**
1. Navigate to Inventory module
2. Click on "Technical Assets" tab

**Expected Results:**
- Technical Assets tab is selected (aria-selected="true")
- Table is displayed with columns: Asset Code, Asset Type, Location, Status, Actions
- Pagination indicator shows "Page X of Y"
- Search input field is visible
- Filter dropdowns are available (Asset Type, Status, Location)

---

### TC-TA-002: Search for Existing Technical Asset
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-002 |
| **Title** | Search for Existing Technical Asset |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- At least one asset exists in the system

**Test Steps:**
1. Enter a valid asset code in the search input
2. Wait for search results

**Expected Results:**
- Search results display matching asset
- Asset row shows View, Edit, History action buttons
- Only one row is displayed when exact match is found

---

### TC-TA-003: Search for Non-Existent Technical Asset
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-003 |
| **Title** | Search for Non-Existent Technical Asset |
| **Priority** | P1 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Enter a non-existent asset code (e.g., "NON_EXISTING_ASSET_99999")
2. Wait for search results

**Expected Results:**
- "No records found." message is displayed
- Table shows no data rows

---

### TC-TA-004: Clear Search and Restore Table
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-004 |
| **Title** | Clear Search and Restore Table |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- A search has been performed

**Test Steps:**
1. Perform a search
2. Click the Reset/Clear search button
3. Wait for table to restore

**Expected Results:**
- Search input is cleared
- Original table data is restored
- Page indicator shows "Page 1"
- Rows per page matches initial setting

---

### TC-TA-005: Filter by Asset Type
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-005 |
| **Title** | Filter Technical Assets by Asset Type |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Assets with different types exist

**Test Steps:**
1. Click on Asset Type filter dropdown
2. Select "Desktop" option

**Expected Results:**
- Filter chip/label shows "Selected Asset Type: Desktop"
- Only assets with Asset Type "Desktop" are displayed
- Other asset types are excluded from results

---

### TC-TA-006: Filter by Status
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-006 |
| **Title** | Filter Technical Assets by Status |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Assets with different statuses exist

**Test Steps:**
1. Click on Status filter dropdown
2. Select "Active" option

**Expected Results:**
- Filter label shows "Selected Status: Active"
- Only assets with status "Active" are displayed

---

### TC-TA-007: Filter by Location
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-007 |
| **Title** | Filter Technical Assets by Location |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Assets in different locations exist

**Test Steps:**
1. Click on Location filter dropdown
2. Select "Chennai" option

**Expected Results:**
- Filter label shows "Selected Location: Chennai"
- Only assets located in Chennai are displayed

---

### TC-TA-008: Apply Multiple Filters Simultaneously
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-008 |
| **Title** | Apply Multiple Filters Simultaneously |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Assets matching combined criteria exist

**Test Steps:**
1. Select Asset Type filter as "Desktop"
2. Select Status filter as "Available"
3. Select Location filter as "Kochi"

**Expected Results:**
- All three filter selections are preserved
- Filter labels show all selected filters
- Only assets matching ALL three criteria are displayed
- Each result row contains "Desktop", "Available", and "Kochi"

---

### TC-TA-009: Change Rows Per Page
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-009 |
| **Title** | Change Rows Per Page |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Locate the rows per page dropdown
2. Change the value to a different option

**Expected Results:**
- Dropdown shows new selected value
- Table displays the new number of rows
- Row count is less than or equal to selected value

---

### TC-TA-010: Navigate to Next Page
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-010 |
| **Title** | Navigate to Next Page |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple pages of data exist

**Test Steps:**
1. Click the "Next" button
2. Observe page indicator

**Expected Results:**
- Page indicator changes from "Page 1" to "Page 2"
- Previous button becomes enabled
- Table shows data from page 2

---

### TC-TA-011: Navigate to Previous Page
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-011 |
| **Title** | Navigate to Previous Page |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on page 2 or higher

**Test Steps:**
1. Click the "Previous" button
2. Observe page indicator

**Expected Results:**
- Page indicator changes to "Page 1"
- Previous button becomes disabled
- Table shows data from page 1

---

### TC-TA-012: View Asset Details
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-012 |
| **Title** | View Asset Details |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- At least one asset exists

**Test Steps:**
1. Search for a specific asset code
2. Click "View" button on the asset row

**Expected Results:**
- Dialog opens displaying asset details
- Asset Code, Asset Type, Location, Status, Model, OS, RAM, Processor, Storage, Purchase Date are visible

---

### TC-TA-013: Edit Asset - Open Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-013 |
| **Title** | Edit Asset - Open Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- At least one asset exists

**Test Steps:**
1. Search for a specific asset code
2. Click "Edit" button on the asset row

**Expected Results:**
- Edit dialog opens
- "Save" button is visible (not "Add")
- All editable fields are pre-populated with existing data

---

### TC-TA-014: Edit Asset - Cancel Without Saving
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-014 |
| **Title** | Edit Asset - Cancel Without Saving |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Search for a specific asset code
2. Click "Edit" button
3. Modify a field value
4. Click "Cancel" button

**Expected Results:**
- Dialog closes
- Original asset data is unchanged
- No changes are persisted

---

### TC-TA-015: View Asset History
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-015 |
| **Title** | View Asset History |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- At least one asset exists

**Test Steps:**
1. Search for a specific asset code
2. Click "History" button on the asset row

**Expected Results:**
- History dialog opens
- "Asset added to inventory" event is shown
- Timestamps are displayed

---

### TC-TA-016: Open Add Asset Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-016 |
| **Title** | Open Add Asset Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click "Add New Asset" button

**Expected Results:**
- Add Asset dialog opens
- Form contains all required fields
- Asset Code field shows "Auto-generated" placeholder
- "Add" button is visible (not "Save")

---

### TC-TA-017: Add Valid Technical Asset
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-017 |
| **Title** | Add Valid Technical Asset |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- All form fields are accessible

**Test Steps:**
1. Click "Add New Asset" button
2. Fill required fields:
   - Asset Type: Desktop
   - Model: Test Desktop Model
   - Storage: 512GB
   - OS: Windows 11
   - RAM: 16GB
   - Processor: Intel Core i5
   - Purchase Amount: 50000
   - Purchase Date: 2026-09-01
   - Location: Chennai
   - Status: Available
3. Click "Add" button

**Expected Results:**
- Dialog closes
- Asset is added to the table
- Asset Code is auto-generated
- New asset is searchable by generated code

---

### TC-TA-018: Add Asset - Required Field Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-018 |
| **Title** | Add Asset - Required Field Validation |
| **Priority** | P0 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click "Add New Asset" button
2. Clear all required fields
3. Click "Add" button

**Expected Results:**
- Dialog remains open
- Validation error messages are displayed
- Required fields are highlighted

---

### TC-TA-019: Add Asset - Negative Purchase Amount Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-019 |
| **Title** | Add Asset - Negative Purchase Amount Validation |
| **Priority** | P1 |
| **Type** | Validation |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click "Add New Asset" button
2. Fill valid data for all fields
3. Enter negative value for Purchase Amount
4. Click "Add" button

**Expected Results:**
- Dialog remains open
- Validation error for purchase amount is displayed
- Asset is not created

---

### TC-TA-020: Add Asset - Future Purchase Date Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-020 |
| **Title** | Add Asset - Future Purchase Date Validation |
| **Priority** | P1 |
| **Type** | Validation |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click "Add New Asset" button
2. Fill valid data for all fields
3. Enter a future date for Purchase Date
4. Click "Add" button

**Expected Results:**
- Dialog remains open
- Validation error for purchase date is displayed
- Asset is not created

---

### TC-TA-021: Add Asset - Cancel Without Saving
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-021 |
| **Title** | Add Asset - Cancel Without Saving |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click "Add New Asset" button
2. Fill in asset data
3. Click "Cancel" button

**Expected Results:**
- Dialog closes
- No new asset is created
- Asset with entered data does not appear in table

---

### TC-TA-022: Bulk Upload - Download Template
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-022 |
| **Title** | Bulk Upload - Download Template |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Locate bulk upload option
2. Click download sample template link

**Expected Results:**
- Download link is visible
- Link points to "addAssets.xlsx"
- File downloads successfully

---

### TC-TA-023: Bulk Upload - Accept Excel File
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-023 |
| **Title** | Bulk Upload - Accept Excel File |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Open bulk upload form
2. Select a valid Excel file
3. Verify Upload button is enabled

**Expected Results:**
- File selection is accepted
- Upload button becomes enabled
- Selected file name is displayed

---

### TC-TA-024: Pagination - First Page Previous Button Disabled
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-024 |
| **Title** | Pagination - First Page Previous Button Disabled |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple pages exist

**Test Steps:**
1. Ensure on Page 1
2. Check Previous button state

**Expected Results:**
- Previous button is disabled
- Next button is enabled (if more than 1 page exists)

---

## Module 2: Software Licenses

### TC-SL-001: Display Software Licenses Table
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-001 |
| **Title** | Display Software Licenses Table |
| **Priority** | P0 |
| **Type** | Smoke |

**Preconditions:**
- User is logged in
- User has access to Inventory module

**Test Steps:**
1. Navigate to Inventory module
2. Click on "Software Licenses" tab

**Expected Results:**
- Software Licenses tab is selected
- Table displays with columns: Software Name, Software Code, Expiration Date, Actions
- Total rows indicator is visible
- Filter options are available (Select Software, Select Status)

---

### TC-SL-002: Filter by Software Type
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-002 |
| **Title** | Filter by Software Type |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click on Software filter dropdown
2. Select "Operating System" checkbox

**Expected Results:**
- Filter is applied
- Table shows only Operating System licenses

---

### TC-SL-003: Filter by License Status
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-003 |
| **Title** | Filter by License Status |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click on Status filter dropdown
2. Select "In Use" checkbox

**Expected Results:**
- Filter is applied
- Table shows only "In Use" licenses

---

### TC-SL-004: Search Valid Software License
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-004 |
| **Title** | Search Valid Software License |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab
- At least one license exists

**Test Steps:**
1. Enter a valid software code in search
2. Observe results

**Expected Results:**
- Only matching license is displayed
- Row count is 1

---

### TC-SL-005: Search Non-Existent Software License
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-005 |
| **Title** | Search Non-Existent Software License |
| **Priority** | P1 |
| **Type** | Negative |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Enter "NON_EXISTENT_LICENSE_999999" in search
2. Observe results

**Expected Results:**
- "No records found" or equivalent message is displayed
- Table shows empty state

---

### TC-SL-006: Sort Table by Software Name (Ascending)
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-006 |
| **Title** | Sort Table by Software Name (Ascending) |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click on "Software Name" column header

**Expected Results:**
- Table is sorted alphabetically by Software Name (A-Z)
- First row contains software starting with earliest letter

---

### TC-SL-007: Sort Table by Software Name (Descending)
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-007 |
| **Title** | Sort Table by Software Name (Descending) |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click on "Software Name" column header (first click)
2. Click on "Software Name" column header (second click)

**Expected Results:**
- Table is sorted alphabetically by Software Name (Z-A)
- First row contains software starting with latest letter

---

### TC-SL-008: Change Rows Per Page
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-008 |
| **Title** | Change Rows Per Page |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Select 50 rows per page from dropdown
2. Observe Total Rows indicator

**Expected Results:**
- Total rows count matches displayed row count
- Previous and Next buttons are disabled

---

### TC-SL-009: View License Details
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-009 |
| **Title** | View License Details |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab
- At least one license exists

**Test Steps:**
1. Click "View" button on first license row

**Expected Results:**
- Dialog opens with license details
- Fields shown: Software Name, Software Code, Software License Key, Max Devices, Purchase Date, Expiration Date, Remarks, Admin Email

---

### TC-SL-010: Edit License - Open Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-010 |
| **Title** | Edit License - Open Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click "Edit" button on first license row

**Expected Results:**
- Edit dialog opens
- Title shows "Edit Software"
- "Update" or "Save" button is visible
- All fields are pre-populated

---

### TC-SL-011: Edit License - Update and Verify
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-011 |
| **Title** | Edit License - Update and Verify |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click "Edit" on first license
2. Modify the Remarks field
3. Click "Update" button

**Expected Results:**
- Dialog closes
- Changes are persisted
- Updated data is visible in table

---

### TC-SL-012: Open Add License Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-012 |
| **Title** | Open Add License Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Click "+ Add Asset" button
2. Click "Add License" button

**Expected Results:**
- Dialog opens
- Title shows "Add Software"
- Form fields are empty
- "Add" button is visible

---

### TC-SL-013: Add Valid Software License
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-013 |
| **Title** | Add Valid Software License |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Select Software from dropdown
3. Enter License Key
4. Enter Max Devices: 10
5. Enter Purchase Date: 2026-09-18
6. Enter Expiration Date: 2027-09-18
7. Enter Admin Email: admin@example.com
8. Click "Add" button

**Expected Results:**
- Dialog closes
- License appears in table
- Software Code is auto-generated

---

### TC-SL-014: Add License - Empty Form Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-014 |
| **Title** | Add License - Empty Form Validation |
| **Priority** | P0 |
| **Type** | Negative |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Clear all fields
3. Click "Add" button

**Expected Results:**
- Dialog remains open
- Validation errors are displayed
- Required fields are highlighted

---

### TC-SL-015: Add License - Invalid Email Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-015 |
| **Title** | Add License - Invalid Email Validation |
| **Priority** | P1 |
| **Type** | Validation |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Fill valid data with invalid email: "invalid-email"
3. Click "Add" button

**Expected Results:**
- Dialog remains open
- Email validation error is displayed

---

### TC-SL-016: Add License - Negative Max Devices Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-016 |
| **Title** | Add License - Negative Max Devices Validation |
| **Priority** | P1 |
| **Type** | Validation |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Enter Max Devices as -1
3. Click "Add" button

**Expected Results:**
- Dialog remains open
- Validation error is displayed

---

### TC-SL-017: Add License - Expiration Before Purchase Date
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-017 |
| **Title** | Add License - Expiration Before Purchase Date |
| **Priority** | P1 |
| **Type** | Validation |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Enter Purchase Date: 2027-09-18
3. Enter Expiration Date: 2026-09-18
4. Click "Add" button

**Expected Results:**
- Dialog remains open
- Date validation error is displayed

---

### TC-SL-018: Verify Active License Records
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-018 |
| **Title** | Verify Active License Records |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Filter by "In Use" status
2. Observe results

**Expected Results:**
- Table displays licenses with "In Use" status
- First row is visible

---

### TC-SL-019: Verify Expired License Records
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-019 |
| **Title** | Verify Expired License Records |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Observe table for expired licenses
2. Filter by Expired status if available

**Expected Results:**
- Expired licenses show "Expired" indicator
- Or "No records found" if no expired licenses exist

---

### TC-SL-020: Keyboard Tab Navigation in Add Dialog
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-020 |
| **Title** | Keyboard Tab Navigation in Add Dialog |
| **Priority** | P2 |
| **Type** | Accessibility |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Open Add License form
2. Press Tab repeatedly
3. Observe focus movement

**Expected Results:**
- Focus moves through form fields
- At least 5 form elements receive focus
- Focus stays within dialog

---

### TC-SL-021: Responsive Layout - Mobile Viewport
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-021 |
| **Title** | Responsive Layout - Mobile Viewport (375x667) |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Set viewport to 375x667 (mobile)
2. Observe table visibility

**Expected Results:**
- Table is visible
- Rows are visible
- Add form opens correctly

---

### TC-SL-022: Responsive Layout - Tablet Viewport
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-022 |
| **Title** | Responsive Layout - Tablet Viewport (768x1024) |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Set viewport to 768x1024 (tablet)
2. Observe table visibility

**Expected Results:**
- Table is visible
- All columns are accessible

---

### TC-SL-023: Responsive Layout - Desktop Viewport
| Field | Value |
|-------|-------|
| **Test ID** | TC-SL-023 |
| **Title** | Responsive Layout - Desktop Viewport (1440x900) |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Software Licenses tab

**Test Steps:**
1. Set viewport to 1440x900 (desktop)
2. Observe table visibility

**Expected Results:**
- Table is visible
- All columns are visible

---

## Module 3: Infrastructure Assets

### TC-IA-001: Display Infrastructure Assets Table
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-001 |
| **Title** | Display Infrastructure Assets Table |
| **Priority** | P0 |
| **Type** | Smoke |

**Preconditions:**
- User is logged in
- User has access to Inventory module

**Test Steps:**
1. Navigate to Inventory module
2. Click on "Infrastructure Assets" tab

**Expected Results:**
- Infrastructure Assets tab is selected
- Table is displayed
- "Total Rows" indicator is visible
- Pagination shows "Page X of Y"

---

### TC-IA-002: View Infrastructure Asset Details
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-002 |
| **Title** | View Infrastructure Asset Details |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab
- At least one asset exists

**Test Steps:**
1. Click "View" button on first asset row

**Expected Results:**
- Dialog opens
- Title shows "Infrastructure Assets Details"
- Fields visible: Asset Code, Asset Type, Location, Status

---

### TC-IA-003: Edit Infrastructure Asset - Open Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-003 |
| **Title** | Edit Infrastructure Asset - Open Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Click "Edit" button on first asset row

**Expected Results:**
- Dialog opens
- "Update" button is visible
- Asset Code field shows "Auto-generated" placeholder
- All fields are pre-populated

---

### TC-IA-004: Open Add Infrastructure Asset Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-004 |
| **Title** | Open Add Infrastructure Asset Form |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Click "+ Add Asset" button
2. Click "Add Infrastructure Assets" button

**Expected Results:**
- Dialog opens
- Title shows "Add Company Asset"
- "Create" button is visible
- All form fields are empty

---

### TC-IA-005: Add Valid Infrastructure Asset
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-005 |
| **Title** | Add Valid Infrastructure Asset |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Open Add Infrastructure Asset form
2. Fill required fields:
   - Asset Type: Laptop
   - Location: Chennai
   - Status: Deployed
   - Purchase Amount: 50000
   - Purchase Date: 2026-09-18
   - Model: Dell Latitude 5550
   - Processor: Intel Core i7
   - RAM: 32 GB
   - Storage: 1 TB SSD
   - Operating System: Windows 11 Pro
3. Click "Create" button

**Expected Results:**
- Dialog closes
- Asset Code is auto-generated
- New asset appears in table with correct values

---

### TC-IA-006: Infrastructure Asset Form Fields Validation
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-006 |
| **Title** | Infrastructure Asset Form Fields Validation |
| **Priority** | P0 |
| **Type** | Negative |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Open Add Infrastructure Asset form
2. Leave all fields empty
3. Click "Create" button

**Expected Results:**
- Dialog remains open
- Validation errors are displayed for required fields

---

### TC-IA-007: Close Dialog with Close Button
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-007 |
| **Title** | Close Dialog with Close Button |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab
- A dialog is open

**Test Steps:**
1. Click "Close" button on dialog

**Expected Results:**
- Dialog closes
- No changes are made

---

### TC-IA-008: Cancel Add Asset Form
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-008 |
| **Title** | Cancel Add Asset Form |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Open Add Infrastructure Asset form
2. Fill some fields
3. Click "Cancel" button

**Expected Results:**
- Dialog closes
- No asset is created
- Table remains unchanged

---

### TC-IA-009: Change Infrastructure Rows Per Page
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-009 |
| **Title** | Change Infrastructure Rows Per Page |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab

**Test Steps:**
1. Select "50 Rows" from dropdown
2. Observe row count

**Expected Results:**
- Row count remains the same (no additional data)
- Page indicator stays at "Page 1 of 1"

---

### TC-IA-010: Verify Asset in Table After Creation
| Field | Value |
|-------|-------|
| **Test ID** | TC-IA-010 |
| **Title** | Verify Asset in Table After Creation |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Infrastructure Assets tab
- A new asset has just been created

**Test Steps:**
1. Create a new infrastructure asset
2. Search for the new asset by Asset Code

**Expected Results:**
- Asset appears in table
- Row contains correct values (Laptop, Chennai, Deployed)

---

## Summary Statistics

| Module | Total Test Cases | P0 (Smoke) | P1 | P2 | P3 |
|--------|-----------------|------------|-----|-----|-----|
| Technical Assets | 24 | 6 | 10 | 8 | 0 |
| Software Licenses | 23 | 5 | 9 | 9 | 0 |
| Infrastructure Assets | 10 | 5 | 3 | 2 | 0 |
| **Total** | **57** | **16** | **22** | **19** | **0** |

---

## Notes for Review

1. **Unclear Requirements Identified:**
   - Bulk upload file format validation (what constitutes a valid Excel file?)
   - Maximum character limits for text fields
   - Auto-renewal checkbox behavior on edit
   - History retention period for assets

2. **Known Test Limitations:**
   - Duplicate license key validation test is skipped (application does not expose existing license keys)
   - Software license creation verification is skipped (generated license key not reliably searchable)

3. **Suggested Test Data Locations:**
   - Asset types: Laptop, Desktop, Monitor (from test-data/inventoryData.json)
   - Status values: Active, Inactive, Available, Deployed
   - Locations: Chennai, Bangalore, Kochi

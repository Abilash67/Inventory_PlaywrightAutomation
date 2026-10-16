# Technical Assets - Search & Filter Test Cases

**Module:** Technical Assets  
**Focus Area:** Search and Filter Functionality  
**Test Type:** Positive, Negative, Boundary, Validation  
**Priority:** P0 = Critical, P1 = High, P2 = Medium  

---

## Test Data Reference

| Filter | Available Values |
|--------|-----------------|
| Asset Type | Laptop, Desktop, Monitor |
| Status | Active, Inactive |
| Location | Chennai, Bangalore |

---

## 1. SEARCH FUNCTIONALITY

### TC-TA-SRCH-001: Search with Valid Asset Code
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-001 |
| **Title** | Search with Valid Asset Code |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Asset with known code exists in system

**Test Steps:**
1. Locate the search input field (placeholder: "Search Inventory")
2. Enter a valid, existing asset code (e.g., "TV-DT-6863")
3. Submit the search

**Expected Results:**
- Search input displays the entered value
- Only 1 row is displayed in the table
- The displayed row contains the exact asset code
- Row action buttons (View, Edit, History) are visible

---

### TC-TA-SRCH-002: Search with Partial Asset Code
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-002 |
| **Title** | Search with Partial Asset Code |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple assets with similar codes exist

**Test Steps:**
1. Enter a partial asset code (e.g., "TV-" or just the prefix)
2. Submit the search

**Expected Results:**
- Multiple matching rows are displayed
- Each row contains the partial search term
- All matching assets are shown (up to pagination limit)

---

### TC-TA-SRCH-003: Search with Non-Existent Asset Code
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-003 |
| **Title** | Search with Non-Existent Asset Code |
| **Priority** | P0 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Enter a non-existent asset code: "NON_EXISTING_ASSET_99999"
2. Submit the search

**Expected Results:**
- "No records found." message is displayed
- Table shows no data rows
- Page indicator remains visible

---

### TC-TA-SRCH-004: Search with Special Characters
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-004 |
| **Title** | Search with Special Characters |
| **Priority** | P2 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Enter special characters: `!@#$%^&*()`
2. Submit the search

**Expected Results:**
- System handles input gracefully
- "No records found." message displayed
- No application errors occur

---

### TC-TA-SRCH-005: Search with SQL Injection Pattern
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-005 |
| **Title** | Search with SQL Injection Pattern |
| **Priority** | P1 |
| **Type** | Security/Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Enter SQL injection pattern: `' OR '1'='1`
2. Submit the search

**Expected Results:**
- System treats input as literal text
- "No records found." or filtered results displayed
- No database error messages exposed to user
- No unauthorized data access occurs

---

### TC-TA-SRCH-006: Search with Maximum Length Input
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-006 |
| **Title** | Search with Maximum Length Input |
| **Priority** | P2 |
| **Type** | Boundary |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Enter a very long string (255+ characters) in search field
2. Submit the search

**Expected Results:**
- System accepts or truncates input gracefully
- No UI breakage or errors
- "No records found." or valid results shown

---

### TC-TA-SRCH-007: Case-Insensitive Search
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-007 |
| **Title** | Case-Insensitive Search |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Asset with known code exists (e.g., "TV-DT-6863")

**Test Steps:**
1. Search with uppercase: "TV-DT-6863"
2. Clear and search with lowercase: "tv-dt-6863"
3. Clear and search with mixed case: "Tv-Dt-6863"

**Expected Results:**
- All case variations return the same result
- Matching asset is found in all cases

---

### TC-TA-SRCH-008: Search Leading/Trailing Spaces
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-008 |
| **Title** | Search with Leading and Trailing Spaces |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Asset with known code exists

**Test Steps:**
1. Search with leading spaces: "   TV-DT-6863"
2. Clear and search with trailing spaces: "TV-DT-6863   "
3. Clear and search with both: "   TV-DT-6863   "

**Expected Results:**
- System trims whitespace or treats it correctly
- Matching asset is found
- Search works as expected

---

### TC-TA-SRCH-009: Clear Search Restores Full Table
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-009 |
| **Title** | Clear Search Restores Full Table |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- A search has been performed
- Search results are displayed

**Test Steps:**
1. Perform a search to get filtered results
2. Click the Reset/Clear search button
3. Observe the table

**Expected Results:**
- Search input is cleared
- All original table data is restored
- Page indicator shows "Page 1"
- Row count matches initial table (before search)
- Pagination controls function correctly

---

### TC-TA-SRCH-010: Empty Search Field
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-SRCH-010 |
| **Title** | Submit Empty Search Field |
| **Priority** | P2 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Ensure search field is empty
2. Submit without entering any text
3. Observe behavior

**Expected Results:**
- Full table is displayed
- No "No records found" shown unnecessarily
- Or system shows appropriate message

---

## 2. FILTER FUNCTIONALITY

### TC-TA-FLT-001: Filter by Asset Type - Laptop
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-001 |
| **Title** | Filter by Asset Type - Laptop |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Assets with different types exist

**Test Steps:**
1. Click the Asset Type filter dropdown
2. Select "Laptop" option

**Expected Results:**
- Filter is applied
- Selected filter label shows "Selected Asset Type: Laptop"
- All displayed rows have Asset Type = "Laptop"
- Only Laptop assets are visible

---

### TC-TA-FLT-002: Filter by Asset Type - Desktop
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-002 |
| **Title** | Filter by Asset Type - Desktop |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Asset Type filter dropdown
2. Select "Desktop" option

**Expected Results:**
- Filter is applied
- All displayed rows have Asset Type = "Desktop"

---

### TC-TA-FLT-003: Filter by Asset Type - Monitor
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-003 |
| **Title** | Filter by Asset Type - Monitor |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Asset Type filter dropdown
2. Select "Monitor" option

**Expected Results:**
- Filter is applied
- All displayed rows have Asset Type = "Monitor"

---

### TC-TA-FLT-004: Filter by Status - Active
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-004 |
| **Title** | Filter by Status - Active |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Status filter dropdown
2. Select "Active" option

**Expected Results:**
- Filter is applied
- Selected filter label shows "Selected Status: Active"
- All displayed rows have Status = "Active"

---

### TC-TA-FLT-005: Filter by Status - Inactive
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-005 |
| **Title** | Filter by Status - Inactive |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Status filter dropdown
2. Select "Inactive" option

**Expected Results:**
- Filter is applied
- All displayed rows have Status = "Inactive"

---

### TC-TA-FLT-006: Filter by Location - Chennai
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-006 |
| **Title** | Filter by Location - Chennai |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Location filter dropdown
2. Select "Chennai" option

**Expected Results:**
- Filter is applied
- Selected filter label shows "Selected Location: Chennai"
- All displayed rows have Location = "Chennai"

---

### TC-TA-FLT-007: Filter by Location - Bangalore
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-007 |
| **Title** | Filter by Location - Bangalore |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Click the Location filter dropdown
2. Select "Bangalore" option

**Expected Results:**
- Filter is applied
- All displayed rows have Location = "Bangalore"

---

### TC-TA-FLT-008: Combined Filters - Asset Type + Status
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-008 |
| **Title** | Combined Filters - Asset Type and Status |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Apply Asset Type filter = "Desktop"
2. Apply Status filter = "Active"

**Expected Results:**
- Both filters are applied
- Filter labels show both selections
- All rows match BOTH criteria (Desktop AND Active)
- Each result row contains "Desktop" and "Active"

---

### TC-TA-FLT-009: Combined Filters - Asset Type + Location
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-009 |
| **Title** | Combined Filters - Asset Type and Location |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Apply Asset Type filter = "Laptop"
2. Apply Location filter = "Chennai"

**Expected Results:**
- Both filters are applied
- All rows match BOTH criteria (Laptop AND Chennai)

---

### TC-TA-FLT-010: Combined Filters - Status + Location
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-010 |
| **Title** | Combined Filters - Status and Location |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Apply Status filter = "Active"
2. Apply Location filter = "Bangalore"

**Expected Results:**
- Both filters are applied
- All rows match BOTH criteria (Active AND Bangalore)

---

### TC-TA-FLT-011: Combined Filters - All Three
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-011 |
| **Title** | Combined Filters - Asset Type, Status, and Location |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Apply Asset Type filter = "Desktop"
2. Apply Status filter = "Available"
3. Apply Location filter = "Kochi"

**Expected Results:**
- All three filters are applied
- Filter labels show all three selections
- All rows match ALL three criteria (AND logic)
- Each result row contains "Desktop", "Available", and "Kochi"

---

### TC-TA-FLT-012: Filter with No Matching Results
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-012 |
| **Title** | Filter with No Matching Results |
| **Priority** | P1 |
| **Type** | Negative |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Apply filter combination unlikely to have data (e.g., Laptop + Inactive + Bangalore if no such combination exists)

**Expected Results:**
- "No records found." message displayed
- No table rows shown
- Appropriate user feedback displayed

---

### TC-TA-FLT-013: Clear Single Filter
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-013 |
| **Title** | Clear Single Filter from Multiple |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple filters are applied

**Test Steps:**
1. Apply Asset Type = "Desktop" and Status = "Active"
2. Clear only the Status filter
3. Observe results

**Expected Results:**
- Status filter is cleared
- Asset Type filter remains active
- Results show only Desktop assets (all statuses)

---

### TC-TA-FLT-014: Clear All Filters
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-014 |
| **Title** | Clear All Filters |
| **Priority** | P0 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple filters are applied

**Test Steps:**
1. Apply multiple filters
2. Clear/reset all filters
3. Observe table

**Expected Results:**
- All filters are cleared
- Filter labels no longer show selections
- Full table is restored
- All assets are visible (paginated)

---

### TC-TA-FLT-015: Filter Persistence on Page Navigation
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-FLT-015 |
| **Title** | Filter Persistence on Page Navigation |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Filtered results span multiple pages

**Test Steps:**
1. Apply a filter
2. Navigate to Page 2 using Next button
3. Observe filter state

**Expected Results:**
- Filter remains applied on new page
- Page indicator updates correctly
- Results on page 2 match filter criteria

---

## 3. SEARCH + FILTER COMBINATION

### TC-TA-COMB-001: Search Within Applied Filter
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-COMB-001 |
| **Title** | Search Within Applied Filter |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Multiple assets match filter criteria

**Test Steps:**
1. Apply Asset Type filter = "Desktop"
2. Search for a specific asset code within filtered results

**Expected Results:**
- Both search and filter are applied
- Results match BOTH criteria
- Only matching asset within Desktop category is shown

---

### TC-TA-COMB-002: Filter Within Search Results
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-COMB-002 |
| **Title** | Filter Within Search Results |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Search returns multiple results

**Test Steps:**
1. Perform a broad search (partial code)
2. Apply a filter to narrow results

**Expected Results:**
- Both search and filter are applied
- Results match BOTH criteria
- Row count is less than or equal to search-only results

---

### TC-TA-COMB-003: Clear Search but Keep Filter
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-COMB-003 |
| **Title** | Clear Search but Keep Filter |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Both search and filter are applied

**Test Steps:**
1. Apply filter and search
2. Clear only the search field
3. Observe filter state

**Expected Results:**
- Search is cleared
- Filter remains active
- Full filtered table is displayed

---

## 4. PAGINATION WITH SEARCH/FILTER

### TC-TA-PAGE-001: Pagination Maintains Search
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-PAGE-001 |
| **Title** | Pagination Maintains Search |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Search/filter results span multiple pages

**Test Steps:**
1. Perform search that returns multiple pages of results
2. Click Next to go to Page 2
3. Observe search state

**Expected Results:**
- Search remains active
- Page 2 shows filtered results
- Same search criteria applies

---

### TC-TA-PAGE-002: Pagination Maintains Filter
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-PAGE-002 |
| **Title** | Pagination Maintains Filter |
| **Priority** | P1 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab
- Filter results span multiple pages

**Test Steps:**
1. Apply filter that returns multiple pages
2. Click Next to go to Page 2
3. Observe filter state

**Expected Results:**
- Filter remains active
- Page 2 shows filtered results

---

### TC-TA-PAGE-003: Rows Per Page with Search
| Field | Value |
|-------|-------|
| **Test ID** | TC-TA-PAGE-003 |
| **Title** | Rows Per Page Setting with Search |
| **Priority** | P2 |
| **Type** | Positive |

**Preconditions:**
- User is on Technical Assets tab

**Test Steps:**
1. Perform a search
2. Change rows per page to a different value
3. Observe results

**Expected Results:**
- Search remains active
- New row count is applied
- Displayed rows match search criteria

---

## Summary

| Category | Test Cases |
|----------|------------|
| **Search Functionality** | 10 tests |
| **Filter Functionality** | 15 tests |
| **Search + Filter Combination** | 3 tests |
| **Pagination with Search/Filter** | 3 tests |
| **Total** | **31 test cases** |

### Priority Breakdown

| Priority | Count | Description |
|----------|-------|-------------|
| P0 | 9 | Critical - core functionality |
| P1 | 13 | High - important features |
| P2 | 9 | Medium - edge cases |

### Smoke Test Subset

For quick validation, execute these critical tests first:
1. TC-TA-SRCH-001: Valid asset code search
2. TC-TA-SRCH-003: Non-existent asset search
3. TC-TA-SRCH-009: Clear search restores table
4. TC-TA-FLT-001: Filter by Asset Type
5. TC-TA-FLT-004: Filter by Status
6. TC-TA-FLT-006: Filter by Location
7. TC-TA-FLT-011: All three filters combined
8. TC-TA-FLT-014: Clear all filters
9. TC-TA-COMB-001: Search within filter

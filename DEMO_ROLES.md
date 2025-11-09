# Demo Role System

This document describes the role-based demo system implemented in Convergent.

## Overview

The application now includes a role selector in the navigation bar that allows users to switch between different user personas to showcase different features and content access levels.

## Available Roles

### 1. Company Role (Default)
**Icon:** Building/Office  
**Color:** Blue

**Description:** View the platform as a company seeking to collaborate with researchers.

**Available Tabs:**
- **Authors** - Search for researchers by name, expertise, or research area
- **Institutions** - Search for academic institutions by name, location, or type
- **My Proposals** - View only your company's research proposals (BioTech Innovations Inc.)

**Access Restrictions:**
- Cannot see proposals from other companies
- Only sees proposals posted by BioTech Innovations Inc. (demo company)

**Use Cases:**
- Find researchers with specific expertise
- Discover institutions for potential partnerships
- Manage your own company's research proposals

### 2. Faculty Role
**Icon:** User/Person  
**Color:** Purple

**Description:** View the platform as a faculty member seeking research opportunities.

**Available Tabs:**
- **All Proposals** - Browse all research proposals from various companies

**Access Restrictions:**
- Can see all proposals from all companies
- Cannot post proposals (company feature only)

**Use Cases:**
- Discover research opportunities from companies
- Find partnerships that match your research interests
- Explore funding opportunities across different industries

### 3. Admin Role
**Icon:** Shield Check  
**Color:** Green

**Description:** View the platform with full access to all features and content.

**Available Tabs:**
- **Authors** - Search for researchers by name, expertise, or research area
- **Institutions** - Search for academic institutions by name, location, or type
- **All Proposals** - Browse all research proposals from all companies

**Access Restrictions:**
- None - full access to all content

**Use Cases:**
- Platform demonstration with full feature access
- Overview of all platform capabilities
- Testing and quality assurance

## Technical Implementation

### Key Components

1. **DemoRoleContext** (`/contexts/DemoRoleContext.tsx`)
   - React Context for managing the current demo role
   - Persists role selection in localStorage
   - Provides `useDemoRole()` hook for accessing role state

2. **Navigation Component** (`/components/Navigation.tsx`)
   - Displays role selector dropdown in the navigation bar
   - Shows current role with colored badge
   - Allows switching between Company and Faculty roles

3. **SearchBar Component** (`/components/SearchBar.tsx`)
   - Dynamically shows tabs based on selected role
   - Automatically switches to available tab when role changes
   - Updates placeholder text based on role and category

4. **Proposals API** (`/app/api/proposals/route.ts`)
   - Accepts `role` parameter to filter proposals
   - For company role: filters to only show BioTech Innovations Inc. proposals
   - For faculty role: shows all proposals

5. **Search Page** (`/app/search/page.tsx`)
   - Displays role-specific banner when viewing proposals
   - Passes role to API requests
   - Refetches data when role changes

## Demo Company

For demonstration purposes, we use **BioTech Innovations Inc.** as the demo company. When in Company role:
- The "My Proposals" tab shows only proposals from BioTech Innovations Inc.
- Currently, this company has 1 proposal: "AI-Powered Drug Discovery Platform"

## How to Use

1. **Switch Roles**: Click the role selector dropdown in the top-right of the navigation bar
2. **Select Role**: Choose between "Company", "Faculty", or "Admin"
3. **Explore Features**: Navigate to the Search page to see role-specific tabs and content
4. **Notice Differences**: 
   - Company role shows 3 tabs (Authors, Institutions, My Proposals)
   - Faculty role shows 1 tab (All Proposals)
   - Admin role shows 3 tabs (Authors, Institutions, All Proposals)

## Role-Based UI Indicators

- **Role Badge**: Top-right of navigation shows current role with icon and color
- **Tab Labels**: 
  - Company: "My Proposals" (with briefcase icon)
  - Faculty: "All Proposals" (with document icon)
  - Admin: "All Proposals" (with document icon)
- **Info Banner**: On search results page, shows which proposals are displayed
- **Color Coding**:
  - Company: Blue (#3B82F6)
  - Faculty: Purple (#9333EA)
  - Admin: Green (#16A34A)

## Future Enhancements

Potential improvements to the role system:
1. Add "Researcher" role distinct from Faculty
2. Support multiple companies (not just demo company)
3. Add role-specific dashboards
4. Implement proposal creation UI for companies
5. Add application/response system for faculty
6. Track user interactions per role
7. Role-based analytics and insights
8. Admin content management features

## Testing the Demo

### As Company:
1. Switch to Company role
2. Search for authors (e.g., "artificial intelligence")
3. Search for institutions (e.g., "MIT")
4. Click "My Proposals" tab - should see only 1 proposal from BioTech Innovations Inc.

### As Faculty:
1. Switch to Faculty role
2. Notice only "All Proposals" tab is available
3. Search proposals (e.g., "machine learning")
4. Should see all 8 proposals from various companies

### As Admin:
1. Switch to Admin role
2. Notice all 3 tabs are available (Authors, Institutions, All Proposals)
3. Search in any category
4. Proposals tab shows all 8 proposals (same as Faculty view)

### Role Switching:
1. Start in Company role viewing Authors
2. Switch to Faculty role
3. Should automatically redirect to Proposals tab (only available tab for Faculty)
4. Switch to Admin role
5. All 3 tabs become available
6. Switch back to Company role
7. Should default to first available tab (Authors)

## Implementation Notes

- Role state persists across page refreshes using localStorage
- Role changes trigger automatic refetch of search results
- SearchBar automatically adjusts available categories based on role
- All role logic is client-side for demo purposes
- Production version would authenticate users and determine role from backend


# User Stories with Acceptance Criteria

**Project:** Code Journal
**Version:** 1.0
**Last Updated:** 2025-11-13

---

## Overview

This document contains detailed user stories with specific, testable acceptance criteria for the Code Journal application. Each user story follows the format:

```
As a [user type]
I want to [action]
So that [benefit]

Acceptance Criteria (Gherkin format):
Given [context]
When [action]
Then [expected outcome]
```

User stories are organized by development phase.

---

## Phase 1: MVP - Core CRUD Functionality

### US-1: Create First Entry

**User Story:**
As a busy professional new to the app
I want to create my first journal entry within 2 minutes
So that I can quickly start building my technical knowledge base without a steep learning curve

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: First-time user sees empty state**
```gherkin
Given I am a new user with no entries
When I land on the app homepage
Then I see the message "Start your learning journey - Create your first entry"
And I see a prominently displayed "New Entry" button
```

**Scenario 2: User navigates to entry creation form**
```gherkin
Given I am on the entry list page
When I click the "New Entry" button
Then I am navigated to the entry creation form
And I see a "Title" text input field with placeholder "e.g., My first Python script"
And I see a "Content" textarea field with placeholder "What did you learn today?"
And I see a "Save Entry" button
And I see a "Cancel" button
```

**Scenario 3: User successfully creates first entry**
```gherkin
Given I am on the entry creation form
When I enter "My first Python script" in the Title field
And I enter "Learned how to use print() function" in the Content field
And I click "Save Entry"
Then the entry is created with an automatic timestamp
And I am redirected to the entry detail view
And I see a success message "Entry created successfully!"
And the entry displays my title and content
```

**Scenario 4: User returns to entry list after creating entry**
```gherkin
Given I just created my first entry
And I am viewing the entry detail page
When I click "Back to All Entries"
Then I see the entry list page
And my new entry appears in the list with title and creation date
```

**Scenario 5: User attempts to save entry without title**
```gherkin
Given I am on the entry creation form
When I leave the Title field empty
And I enter content in the Content field
And I click "Save Entry"
Then the form does not submit
And the Title field shows a red border
And I see the error message "Please add a title to your entry"
```

**Scenario 6: User attempts to save entry without content**
```gherkin
Given I am on the entry creation form
When I enter a title in the Title field
And I leave the Content field empty
And I click "Save Entry"
Then the form does not submit
And the Content field shows a red border
And I see the error message "Please add some content to your entry"
```

**Scenario 7: User cancels entry creation**
```gherkin
Given I am on the entry creation form
And I have entered some text in the Title or Content fields
When I click "Cancel"
Then I am returned to the entry list page
And no new entry is created
And no partial data is saved
```

**Scenario 8: Entry persists after page refresh**
```gherkin
Given I have created an entry
When I refresh the browser page
Then my entry still exists
And all entry data (title, content, timestamp) is preserved
```

**Definition of Done:**
- [ ] New user can create their first entry in under 2 minutes without instructions
- [ ] All Gherkin scenarios pass manual testing
- [ ] Form validation prevents empty entries
- [ ] Entry persists after page refresh

---

### US-2: Quick Entry Creation

**User Story:**
As a professional learning during limited evening time
I want to quickly capture an automation script or AI prompt that worked
So that I can reference it when facing similar work tasks tomorrow

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: Experienced user accesses new entry form quickly**
```gherkin
Given I am on the entry list page with existing entries
When I click the "New Entry" button
Then I am immediately taken to the entry creation form
And the form loads in less than 1 second
And the Title field is automatically focused for immediate typing
```

**Scenario 2: User creates entry with code snippet**
```gherkin
Given I am on the entry creation form
When I enter "Excel API authentication fix" in the Title field
And I paste a code snippet in the Content field
And I click "Save Entry"
Then the entry is created successfully
And I am redirected to view the new entry
And the code snippet is preserved with all formatting (line breaks, indentation)
```

**Scenario 3: User creates entry and returns to learning quickly**
```gherkin
Given I am on the entry creation form
When I enter a title and content
And I click "Save Entry"
Then the entire save process completes in less than 2 seconds
And I see a brief success confirmation
And I can immediately navigate away or close the app
```

**Scenario 4: User creates multiple entries in succession**
```gherkin
Given I just saved an entry
And I am viewing the entry detail page
When I click "New Entry" again
Then I am taken to a fresh entry creation form
And the previous entry's data is not pre-filled
And I can create another entry immediately
```

**Scenario 5: User creates entry with special characters**
```gherkin
Given I am on the entry creation form
When I enter a title with special characters (e.g., "Using <script> tags")
And I enter content with code containing <, >, &, quotes
And I click "Save Entry"
Then the entry is created successfully
And all special characters are properly escaped and displayed
And no HTML is broken or executed
```

**Scenario 6: User creates entry with very long content**
```gherkin
Given I am on the entry creation form
When I paste a very long code file (2000+ characters)
And I click "Save Entry"
Then the entry is created successfully
And all content is saved
And I can view the full content in the entry detail view with scrolling
```

**Scenario 7: Keyboard navigation for power users**
```gherkin
Given I am on the entry creation form
When I use Tab to navigate between Title and Content fields
And I press Ctrl+Enter (or Cmd+Enter on Mac)
Then the entry is saved (keyboard shortcut works)
And I am redirected to the entry detail view
```

**Definition of Done:**
- [ ] Entry creation takes less than 30 seconds total
- [ ] All Gherkin scenarios pass manual testing
- [ ] Code snippets preserve formatting (line breaks, indentation, special characters)
- [ ] Entry creation form loads in <1 second
- [ ] Save process completes in <2 seconds

---

### US-3: View All Entries

**User Story:**
As a user building technical skills over months
I want to see a chronological list of all my journal entries
So that I can see my learning progression and growing technical capability

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: User with entries views the entry list**
```gherkin
Given I have created 5 journal entries
When I navigate to the entry list page
Then I see all 5 entries displayed in a list
And entries are ordered by creation date (newest first)
And each entry shows its title and creation date
And the creation date is formatted as a human-readable date (e.g., "Nov 13, 2025")
```

**Scenario 2: User views entry list on initial load**
```gherkin
Given I have 50 journal entries
When I open the app
Then the entry list page is the default landing page
And the list loads in less than 1 second
And I see the most recent entries at the top
```

**Scenario 3: User navigates to entry detail from list**
```gherkin
Given I am viewing the entry list
When I click on an entry title
Then I am navigated to that entry's detail view
And I see the full content of the entry
```

**Scenario 4: User sees visual indication of entry count**
```gherkin
Given I have 25 journal entries
When I view the entry list page
Then I see a count showing "25 entries" or similar
And I can scroll through all entries
```

**Scenario 5: Entry list is scannable at a glance**
```gherkin
Given I am viewing the entry list with 50+ entries
When I scan the list
Then each entry is visually separated (spacing or borders)
And titles are prominently displayed in larger/bold text
And dates are displayed in smaller, subtle text
And there is no content preview shown (keeps list clean)
```

**Scenario 6: User with zero entries sees empty state**
```gherkin
Given I am a new user with no entries
When I view the entry list page
Then I see an empty state message
And the message reads "Start your learning journey - Create your first entry"
And I see a "New Entry" button prominently displayed
And no empty list or placeholder entries are shown
```

**Scenario 7: List updates after creating new entry**
```gherkin
Given I am viewing the entry list with 10 entries
When I create a new entry
And I navigate back to the entry list
Then I see 11 entries total
And my new entry appears at the top of the list
And the entry count updates to show "11 entries"
```

**Scenario 8: Entry list handles large number of entries**
```gherkin
Given I have 1000 journal entries
When I load the entry list page
Then the page loads in less than 2 seconds
And I can scroll smoothly through the list
And all entries remain accessible
```

**Scenario 9: User sees "New Entry" button always available**
```gherkin
Given I am on the entry list page
When I scroll to any position in the list
Then the "New Entry" button remains visible or easily accessible
And I can create a new entry without scrolling back to the top
```

**Definition of Done:**
- [ ] All Gherkin scenarios pass manual testing
- [ ] Entry list loads in <1 second with up to 100 entries
- [ ] Entries are ordered newest to oldest
- [ ] List is visually scannable (clear hierarchy, good spacing)
- [ ] Empty state provides clear guidance for new users
- [ ] Entry count is visible

----
TEST CODE
TEST CODE
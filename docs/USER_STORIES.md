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

---

### US-4: View Single Entry

**User Story:**
As a user facing a work automation challenge
I want to see the full details of a past solution I documented
So that I can apply the same approach to my current task

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: User navigates to entry detail view**
```gherkin
Given I am on the entry list page with multiple entries
When I click on an entry title
Then I am navigated to the entry detail view for that specific entry
And the page loads in less than 1 second
And I see the entry's complete information
```

**Scenario 2: Entry detail displays all information correctly**
```gherkin
Given I have navigated to an entry detail view
When the page loads
Then I see the entry title displayed prominently
And I see the entry content with all formatting preserved
And I see the creation date in human-readable format (e.g., "Created on Nov 13, 2025")
And I see an "Edit" button
And I see a "Delete" button
And I see a "Back to All Entries" button or link
```

**Scenario 3: User views entry with long content**
```gherkin
Given I have an entry with very long content (2000+ characters)
When I view that entry's detail page
Then all content is displayed
And I can scroll to read the entire content
And text remains readable without horizontal scrolling
And line breaks and formatting are preserved
```

**Scenario 4: User views entry with special characters in content**
```gherkin
Given I have an entry containing code with special characters (<, >, &, quotes)
When I view the entry detail page
Then all special characters display correctly
And code formatting is preserved
And no HTML is broken or unexpectedly rendered
```

**Scenario 5: User navigates back to entry list**
```gherkin
Given I am viewing an entry detail page
When I click "Back to All Entries"
Then I am returned to the entry list page
And I see all my entries in the list
And the list maintains its previous state (scroll position if possible)
```

**Scenario 6: User accesses Edit from entry detail**
```gherkin
Given I am viewing an entry detail page
When I click the "Edit" button
Then I am navigated to the edit form
And the form is pre-populated with the current entry data
```

**Scenario 7: User accesses Delete from entry detail**
```gherkin
Given I am viewing an entry detail page
When I click the "Delete" button
Then I see a confirmation dialog asking if I'm sure
And I have options to confirm or cancel the deletion
```

**Scenario 8: Entry detail view is mobile-responsive**
```gherkin
Given I am viewing an entry detail page on a mobile device
When the page renders
Then the layout adapts to the smaller screen
And all text remains readable without zooming
And all buttons are easily tappable
```

**Scenario 9: User can copy content from entry**
```gherkin
Given I am viewing an entry with code snippets
When I select and copy text from the content area
Then the text is copied to my clipboard with formatting preserved
And I can paste it into another application
```

**Definition of Done:**
- [ ] All Gherkin scenarios pass manual testing
- [ ] Entry detail page loads in <1 second
- [ ] All entry data (title, content, date) displays correctly
- [ ] Navigation to/from entry list works smoothly
- [ ] Edit and Delete actions are accessible
- [ ] Long content and special characters handled properly
- [ ] Mobile-responsive design

---

### US-5: Edit Existing Entry

**User Story:**
As a user who refined a solution or learned more context
I want to edit a previously created entry
So that I can update it with improved approaches or additional notes from real-world application

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: User navigates to edit form from entry detail**
```gherkin
Given I am viewing an entry detail page
When I click the "Edit" button
Then I am navigated to the edit entry form
And the form loads in less than 1 second
And the Title field is pre-populated with the current title
And the Content field is pre-populated with the current content
```

**Scenario 2: User successfully edits entry title**
```gherkin
Given I am on the edit entry form
When I change the title from "Old Title" to "Updated Title"
And I click "Save Changes"
Then the entry is updated successfully
And I am redirected to the entry detail view
And I see a success message "Entry updated successfully!"
And the entry displays the new title "Updated Title"
```

**Scenario 3: User successfully edits entry content**
```gherkin
Given I am on the edit entry form
When I modify the content by adding new information
And I click "Save Changes"
Then the entry is updated successfully
And I see the updated content in the entry detail view
And all formatting (line breaks, indentation) is preserved
```

**Scenario 4: User edits both title and content**
```gherkin
Given I am on the edit entry form
When I change both the title and content
And I click "Save Changes"
Then both the title and content are updated
And I see the entry detail view with both changes reflected
```

**Scenario 5: User attempts to save with empty title**
```gherkin
Given I am on the edit entry form
When I delete all text from the Title field
And I click "Save Changes"
Then the form does not submit
And the Title field shows a red border
And I see the error message "Please add a title to your entry"
And the entry remains unchanged
```

**Scenario 6: User attempts to save with empty content**
```gherkin
Given I am on the edit entry form
When I delete all text from the Content field
And I click "Save Changes"
Then the form does not submit
And the Content field shows a red border
And I see the error message "Please add some content to your entry"
And the entry remains unchanged
```

**Scenario 7: User cancels editing without saving**
```gherkin
Given I am on the edit entry form
And I have made changes to the title or content
When I click "Cancel"
Then I am returned to the entry detail view
And the entry displays the original, unchanged data
And my edits are discarded
```

**Scenario 8: Browser warns about unsaved changes**
```gherkin
Given I am on the edit entry form
And I have made changes to the title or content
When I attempt to navigate away (browser back button, close tab)
Then the browser shows a warning "You have unsaved changes. Leave page?"
And I can choose to stay on the page or discard changes
```

**Scenario 9: Edit form handles special characters**
```gherkin
Given I am on the edit entry form
When I add content with special characters (<, >, &, quotes)
And I click "Save Changes"
Then the entry is saved successfully
And all special characters are properly escaped and displayed
And no HTML is broken or executed
```

**Scenario 10: User can edit entry multiple times**
```gherkin
Given I have edited an entry and saved changes
When I click "Edit" again to make additional changes
Then the edit form shows the most recently saved version
And I can save additional changes successfully
```

**Scenario 11: Edit preserves creation timestamp**
```gherkin
Given I have an entry created on "Nov 10, 2025"
When I edit that entry on "Nov 15, 2025"
And I save my changes
Then the creation date still shows "Nov 10, 2025"
And the entry appears in the list based on its original creation date (not edit date)
```

**Scenario 12: Edit form is accessible via keyboard shortcuts**
```gherkin
Given I am on the edit entry form
When I use Tab to navigate between fields
And I press Ctrl+Enter (or Cmd+Enter on Mac)
Then the entry is saved (keyboard shortcut works)
And I am redirected to the entry detail view
```

**Definition of Done:**
- [ ] All Gherkin scenarios pass manual testing
- [ ] Edit form loads in <1 second with pre-populated data
- [ ] Changes save in <2 seconds
- [ ] Form validation prevents empty title or content
- [ ] Cancel functionality discards changes
- [ ] Browser warns about unsaved changes when navigating away
- [ ] Creation timestamp is preserved (not overwritten by edit)
- [ ] Multiple edits to the same entry work correctly

---

### US-6: Delete Unwanted Entry

**User Story:**
As a user who documented something that turned out irrelevant to my work
I want to delete an entry
So that my journal focuses only on practically useful learnings

**Priority:** Must-have

**Acceptance Criteria:**

**Scenario 1: User initiates delete from entry detail view**
```gherkin
Given I am viewing an entry detail page
When I click the "Delete" button
Then I see a confirmation dialog
And the dialog asks "Are you sure you want to delete this entry? This cannot be undone."
And I see a "Confirm Delete" button
And I see a "Cancel" button
```

**Scenario 2: User confirms deletion**
```gherkin
Given I am viewing an entry detail page
And I have clicked the "Delete" button
And I see the confirmation dialog
When I click "Confirm Delete"
Then the entry is permanently deleted
And I am redirected to the entry list page
And I see a success message "Entry deleted successfully"
And the deleted entry no longer appears in the list
```

**Scenario 3: User cancels deletion**
```gherkin
Given I am viewing an entry detail page
And I have clicked the "Delete" button
And I see the confirmation dialog
When I click "Cancel"
Then the confirmation dialog closes
And I remain on the entry detail page
And the entry is not deleted
And the entry data is unchanged
```

**Scenario 4: Deleted entry cannot be recovered**
```gherkin
Given I have deleted an entry
When I navigate through the app or refresh the page
Then the deleted entry does not appear anywhere
And there is no "undo" or "restore" option (for MVP)
And the entry is permanently removed from storage
```

**Scenario 5: Entry count updates after deletion**
```gherkin
Given I have 10 entries total
When I delete one entry
And I navigate to the entry list page
Then I see "9 entries" in the count
And only 9 entries are displayed in the list
```

**Scenario 6: Deleting entry updates list order**
```gherkin
Given I have entries created on Nov 10, Nov 12, and Nov 14
And I am viewing the entry from Nov 12
When I delete the Nov 12 entry
And I navigate to the entry list
Then I see only the Nov 14 and Nov 10 entries
And they remain ordered by creation date (Nov 14 first, then Nov 10)
```

**Scenario 7: User cannot delete nonexistent entry**
```gherkin
Given I have an entry ID for a previously deleted entry
When I attempt to navigate directly to that entry's detail page (e.g., via URL)
Then I see an error message "Entry not found"
And I see a link to return to the entry list
And no delete action is available
```

**Scenario 8: Delete button is clearly identified**
```gherkin
Given I am viewing an entry detail page
When I look for the Delete button
Then the button is clearly labeled "Delete" or "Delete Entry"
And the button has visual styling indicating a destructive action (e.g., red color)
And the button is positioned to prevent accidental clicks (not adjacent to frequently-used buttons)
```

**Scenario 9: Confirmation dialog prevents accidental deletion**
```gherkin
Given I am viewing an entry detail page
When I accidentally click the "Delete" button
Then the confirmation dialog appears before any deletion occurs
And I can safely click "Cancel" to avoid losing data
And the entry remains intact
```

**Scenario 10: User deletes last remaining entry**
```gherkin
Given I have only 1 entry in my journal
When I delete that entry
Then I am redirected to the entry list page
And I see the empty state message "Start your learning journey - Create your first entry"
And the entry count shows "0 entries" or is hidden
And I see the "New Entry" button prominently displayed
```

**Scenario 11: Multiple deletions work correctly**
```gherkin
Given I have 5 entries in my journal
When I delete 3 entries one after another
Then I am left with 2 entries
And the entry list shows only the 2 remaining entries
And all deleted entries are permanently removed
```

**Scenario 12: Delete persists after page refresh**
```gherkin
Given I have deleted an entry
When I refresh the browser page
Then the entry remains deleted
And does not reappear in the entry list
And the deletion is permanent
```

**Definition of Done:**
- [ ] All Gherkin scenarios pass manual testing
- [ ] Confirmation dialog prevents accidental deletions
- [ ] Deletion completes in <2 seconds
- [ ] User is redirected to entry list after deletion
- [ ] Deleted entries are permanently removed (no recovery in MVP)
- [ ] Entry count and list update correctly after deletion
- [ ] Empty state displays when last entry is deleted
- [ ] Delete action is clearly destructive (red button, clear warning)

---

## Summary: Phase 1 Completion Checklist

All Phase 1 (MVP) user stories are now documented with acceptance criteria:

- [x] **US-1:** Create First Entry (8 scenarios)
- [x] **US-2:** Quick Entry Creation (7 scenarios)
- [x] **US-3:** View All Entries (9 scenarios)
- [x] **US-4:** View Single Entry (9 scenarios)
- [x] **US-5:** Edit Existing Entry (12 scenarios)
- [x] **US-6:** Delete Unwanted Entry (12 scenarios)

**Total:** 6 user stories, 57 test scenarios

**Next Steps:**
1. Technical Design Document (TDD) creation
2. Implementation of Phase 1 MVP
3. Manual testing against all acceptance criteria
4. Beta user testing and feedback collection

---

**Document History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-13 | Product Team | Initial user stories (US-1 through US-3) |
| 1.1 | 2025-11-19 | Product Team | Added US-4, US-5, US-6 to complete Phase 1 |

---
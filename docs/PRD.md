# Product Requirements Document: Code Journal

**Version:** 1.0
**Status:** Draft
**Last Updated:** 2025-11-13
**Owner:** Product Team

---

## 1. Executive Summary

### Problem Statement
Beginner developers struggle to retain and organize what they learn as they start their coding journey. Learning resources are scattered across browser bookmarks, text files, and handwritten notes, making it difficult to:
- Reference previously learned concepts when needed
- Track progress over time
- Build a searchable knowledge base
- Reinforce learning through documentation

This fragmentation leads to re-learning the same concepts, wasted time searching for information, and difficulty seeing concrete progress - all of which can discourage beginners from continuing their learning journey.

### Solution Overview
Code Journal is a web-based learning management app specifically designed for beginner developers. It provides a centralized, organized space to capture code snippets, notes, and resources as they learn. The app makes it easy to add new learnings quickly, find them later through search and tags, and visualize progress over time - creating a personalized reference library that grows with the developer.

### Success Metrics
- **Daily Active Usage:** User creates at least one journal entry per day
- **Retention Rate:** User returns to reference old entries (measured by view count on entries >7 days old)
- **Time to Find:** User can locate a specific past learning in <10 seconds using search/tags
- **Onboarding Success:** New user creates their first entry within 2 minutes of landing on the app

### Target Timeline
- **Phase 1 (MVP):** Core CRUD functionality - To be determined
- **Phase 2:** Organization features (tags, search)
- **Phase 3:** Enhanced content (code syntax highlighting, rich text)
- **Phase 4:** Advanced features (filtering, export, multi-device sync)

---

## 2. Context & Background

### Why Now?
The landscape of developer education has exploded with coding bootcamps, online courses, and self-taught developers entering the field. However, most learning platforms focus on delivering content rather than helping learners retain and organize what they've learned. Existing note-taking apps (Notion, Evernote, OneNote) are too generic and lack features specifically useful for code learners like syntax highlighting and code snippet management.

Recent trends show:
- **Rising self-taught developers:** 40% of developers are now self-taught (Stack Overflow Survey 2024)
- **Information overload:** Learners consume content from multiple sources simultaneously
- **Need for applied learning:** Developers learn best by doing and documenting their work

### User Research Insights
Based on common beginner developer experiences:

**Pain Points Identified:**
1. "I keep forgetting how I solved a problem last week" - Lack of searchable reference
2. "My notes are scattered everywhere" - No central organization system
3. "I can't see how much I've actually learned" - No progress visibility
4. "Taking notes slows me down while coding" - Friction in documentation process
5. "Generic note apps don't format code well" - Tools not built for developers

**Key Needs:**
- Quick entry creation (must not interrupt flow state)
- Easy retrieval through search and tags
- Proper code formatting and syntax highlighting
- Visual sense of progress and growth
- Works offline (learning happens anywhere)

### Business/Strategic Rationale
**Primary Goal:** Create an educational tool that helps beginner developers succeed in their learning journey and builds good documentation habits early.

**Secondary Goals:**
- Demonstrate modern full-stack development practices (serves as learning project itself)
- Build a portfolio-worthy application showcasing real-world software development
- Create open-source contribution opportunities for other learners

**Market Opportunity:**
- Target audience: Aspiring developers in first 6-12 months of learning
- Use case: Daily learning companion and reference library
- Differentiation: Simplicity and focus on beginner needs vs. complex note-taking systems

---

## 3. User Stories & Jobs-to-be-Done

### Primary User Persona
**"Upskilling Uma" - The Mid-Career Professional**
- Age: 30-50
- Background: Established career in non-technical field (finance, marketing, operations, etc.)
- Experience: 0-6 months of coding experience; strong domain expertise in their field
- Goal: Develop technical skills to automate tasks, work effectively with AI tools, and stay relevant in an AI-driven workplace
- Challenges: Limited time due to full-time job, need to learn efficiently, wants practical applications over theory
- Tech comfort: Proficient with business software (Excel, CRM systems); new to programming
- Motivation: Career security, efficiency gains, desire to understand how AI/automation works "under the hood"

### Jobs-to-be-Done
When I'm learning to automate my work tasks, I want to **capture code solutions and learnings** so that I can **reuse them in similar work situations**.

When I encounter a technical problem related to my work, I want to **quickly find how I solved it before** so that I can **apply it immediately without re-learning**.

When I feel overwhelmed by new technology, I want to **see concrete evidence of my technical growth** so that I can **stay confident and motivated to continue upskilling**.

### User Journey: Current vs. Proposed

| Stage | Current State (Without Code Journal) | Proposed State (With Code Journal) |
|-------|--------------------------------------|-------------------------------------|
| **Learning** | Watches tutorial after work; takes notes in Word/email to self; hard to find later | Quick capture during/after tutorial; all learnings in one searchable place |
| **Documenting** | Screenshots or copy-paste into random files; loses context over time | Structured entries with context, dates, tags for work-related topics |
| **Organizing** | Notes scattered across apps (Notes, email, Slack saved messages) | Centralized by topic (e.g., "Python automation", "Excel API", "ChatGPT integration") |
| **Applying** | Wastes 30+ minutes searching old notes when facing similar work problem | Searches "Excel automation" and finds solution in seconds; applies to current task |
| **Reflecting** | Can't see progress; feels like "still a beginner" | Visual evidence of 50+ learnings; confidence in technical capability |

### Key User Stories

**Phase 1 (MVP) - Core CRUD:**

**US-1: Create First Entry**
- As a busy professional new to the app
- I want to create my first journal entry within 2 minutes
- So that I can quickly start building my technical knowledge base without a steep learning curve

**US-2: Quick Entry Creation**
- As a professional learning during limited evening time
- I want to quickly capture an automation script or AI prompt that worked
- So that I can reference it when facing similar work tasks tomorrow

**US-3: View All Entries**
- As a user building technical skills over months
- I want to see a chronological list of all my journal entries
- So that I can see my learning progression and growing technical capability

**US-4: View Single Entry**
- As a user facing a work automation challenge
- I want to see the full details of a past solution I documented
- So that I can apply the same approach to my current task

**US-5: Edit Existing Entry**
- As a user who refined a solution or learned more context
- I want to edit a previously created entry
- So that I can update it with improved approaches or additional notes from real-world application

**US-6: Delete Unwanted Entry**
- As a user who documented something that turned out irrelevant to my work
- I want to delete an entry
- So that my journal focuses only on practically useful learnings

**Phase 2 - Organization:**

**US-7: Tag Entries**
- As a user learning multiple automation tools
- I want to add tags to categorize my learnings (e.g., "Python", "Excel automation", "ChatGPT", "data cleaning")
- So that I can organize entries by work-relevant topics and find them by project type

**US-8: Search Entries**
- As a user needing to solve a time-sensitive work problem
- I want to search my entries by keyword (e.g., "API authentication" or "email automation")
- So that I can find the relevant solution immediately and apply it to my work

**Phase 3 - Enhanced Content:**

**US-9: Syntax Highlighted Code**
- As a user saving automation scripts and code snippets
- I want to see proper syntax highlighting for Python, JavaScript, SQL, etc.
- So that I can quickly understand and reuse the code in my work projects

**US-10: Rich Text Notes**
- As a user documenting context around technical solutions
- I want basic text formatting (bold, italic, links, bullet points)
- So that I can clearly explain when/why to use each solution and link to relevant work examples

**Phase 4 - Advanced Features:**

**US-11: Filter by Tags**
- As a user working on a specific work project
- I want to filter my entries to show only those tagged with relevant topics (e.g., "Excel" + "reporting")
- So that I can quickly review all applicable solutions for my current project

**US-12: Multi-Device Access**
- As a professional who learns at home but applies at work
- I want to access my journal from my work laptop, home computer, and phone
- So that my technical solutions are available wherever and whenever I need them

---

## 4. Detailed Requirements

### Functional Requirements

#### Phase 1 (MVP) - Core CRUD Functionality

**FR-1: Create New Entry**
- **Description:** User can create a new journal entry with a title and content
- **Rationale:** Essential for capturing learnings as they happen; must be fast to not interrupt learning flow
- **Acceptance Criteria:**
  - User can click "New Entry" button from any view
  - User can enter a title (required)
  - User can enter content (required, supports plain text)
  - Entry saves with automatic timestamp
  - User redirected to view the new entry after creation
- **Priority:** Must-have

**FR-2: View Entry List**
- **Description:** User can see all their journal entries in reverse chronological order (newest first)
- **Rationale:** Provides overview of learning journey and easy access to recent entries
- **Acceptance Criteria:**
  - List shows entry title and creation date
  - Entries ordered newest to oldest
  - User can click any entry to view full details
  - Empty state shown when no entries exist with prompt to create first entry
- **Priority:** Must-have

**FR-3: View Single Entry**
- **Description:** User can view the complete details of a specific entry
- **Rationale:** Allows user to read and reference past learnings in full
- **Acceptance Criteria:**
  - Shows entry title, content, and creation date
  - Content displays with preserved formatting
  - User can navigate back to entry list
  - User can access edit and delete options from this view
- **Priority:** Must-have

**FR-4: Edit Existing Entry**
- **Description:** User can modify the title and content of any existing entry
- **Rationale:** Learnings evolve; users need to update entries with new insights or corrections
- **Acceptance Criteria:**
  - User can click "Edit" button from entry view
  - Form pre-populates with existing title and content
  - User can modify title and/or content
  - Changes save and user sees updated entry
  - Option to cancel editing without saving changes
- **Priority:** Must-have

**FR-5: Delete Entry**
- **Description:** User can permanently remove an entry from their journal
- **Rationale:** Users need to maintain a clean, relevant journal by removing mistakes or outdated content
- **Acceptance Criteria:**
  - User can click "Delete" button from entry view
  - System requests confirmation before deleting ("Are you sure?")
  - Upon confirmation, entry is permanently removed
  - User redirected to entry list after deletion
  - Deleted entries cannot be recovered (for MVP)
- **Priority:** Must-have

#### Phase 2 - Organization Features

**FR-6: Tag Entries**
- **Description:** User can add one or more tags to categorize each entry
- **Rationale:** As journal grows, tags help organize entries by topic for easier retrieval
- **Acceptance Criteria:**
  - User can add multiple tags when creating or editing an entry
  - Tags display on entry list and detail views
  - Common tag suggestions appear as user types (based on existing tags)
- **Priority:** Should-have

**FR-7: Search Functionality**
- **Description:** User can search entries by keyword in title or content
- **Rationale:** Critical for quickly finding specific past learnings; supports <10 second retrieval goal
- **Acceptance Criteria:**
  - Search box available on entry list view
  - Results update as user types (real-time search)
  - Matches found in title or content
  - Clear indication when no results found
- **Priority:** Should-have

#### Phase 3 - Enhanced Content

**FR-8: Code Syntax Highlighting**
- **Description:** Code snippets within entries display with language-appropriate syntax highlighting
- **Rationale:** Makes code more readable and professional; critical for developer-focused tool
- **Acceptance Criteria:**
  - User can designate sections of content as code
  - Code displays with syntax highlighting in view mode
  - Supports common languages (JavaScript, Python, HTML, CSS, SQL)
- **Priority:** Should-have

**FR-9: Rich Text Formatting**
- **Description:** User can apply basic text formatting to entry content
- **Rationale:** Improves readability and allows users to emphasize key points
- **Acceptance Criteria:**
  - Supports bold, italic, bullet points, numbered lists
  - Supports clickable hyperlinks
  - Formatting preserved when viewing entry
- **Priority:** Nice-to-have

#### Phase 4 - Advanced Features

**FR-10: Filter by Tags**
- **Description:** User can filter entry list to show only entries with selected tags
- **Rationale:** Enables focused review of specific topics when working on related projects
- **Acceptance Criteria:**
  - User can select one or more tags to filter by
  - Only entries with selected tags display
  - User can clear filters to see all entries
- **Priority:** Nice-to-have

**FR-11: Export Entries**
- **Description:** User can export their journal entries to common formats
- **Rationale:** Data portability and backup; user owns their data
- **Acceptance Criteria:**
  - User can export all or selected entries
  - Supports export to JSON, Markdown, or PDF
- **Priority:** Nice-to-have

**FR-12: Multi-Device Sync**
- **Description:** Entries automatically sync across user's devices
- **Rationale:** Learn at home, apply at work; seamless access anywhere
- **Acceptance Criteria:**
  - Changes on one device appear on other devices within 30 seconds
  - Works when device comes back online after being offline
  - No data loss during sync conflicts
- **Priority:** Nice-to-have

### Non-Functional Requirements

**NFR-1: Performance**
- Entry list loads in <1 second with up to 1000 entries
- Search returns results in <500ms
- New entry creation completes in <2 seconds
- Rationale: Speed is critical for not interrupting learning flow

**NFR-2: Usability**
- New user can create first entry within 2 minutes without instructions
- Interface uses clear, jargon-free language
- Mobile-responsive design for phone and tablet access
- Rationale: Target users are beginners; simplicity is paramount

**NFR-3: Reliability**
- Data persists reliably; no data loss on browser refresh or app restart
- Automatic save prevents loss of work in progress
- Rationale: Trust is critical; users won't adopt if they lose their work

**NFR-4: Browser Compatibility**
- Works on modern versions of Chrome, Firefox, Safari, Edge (last 2 versions)
- No support needed for Internet Explorer
- Rationale: Target users have modern browsers; focus resources on core features

**NFR-5: Data Privacy**
- All data stored locally or on user-controlled server initially
- No third-party analytics or tracking in MVP
- Clear data ownership and export capabilities
- Rationale: Builds trust with users; aligns with data ownership values

**NFR-6: Accessibility**
- Meets WCAG 2.1 Level AA standards (minimum)
- Keyboard navigation for all features
- Screen reader compatible
- Rationale: Inclusive design; some users may have accessibility needs

---

## 5. User Experience

### Key User Flows

#### Flow 1: First-Time User Creates First Entry
1. User lands on app homepage
2. Sees empty state: "Start your learning journey - Create your first entry"
3. Clicks "New Entry" button
4. Enters title: "My first Python script"
5. Enters content: Brief description of what they learned
6. Clicks "Save Entry"
7. Sees success confirmation and views their new entry
8. Clicks "Back to All Entries" and sees their entry in the list

**Success criteria:** Completed in under 2 minutes without confusion

#### Flow 2: Experienced User Quickly Captures Learning
1. User is watching a tutorial and learns something useful
2. Opens Code Journal (already has 50+ entries)
3. Clicks "New Entry" from entry list view
4. Enters title: "Excel API authentication fix"
5. Pastes code snippet and adds brief note about when to use it
6. Clicks "Save Entry"
7. Immediately returns to tutorial (app doesn't interrupt flow)

**Success criteria:** Entire process takes <30 seconds

#### Flow 3: User Retrieves Past Solution for Work Task
1. User faces work problem: "How did I authenticate with that API last month?"
2. Opens Code Journal
3. Types "API authentication" in search box (Phase 2 feature)
4. Results filter in real-time as they type
5. Clicks relevant entry from results
6. Views full entry with code snippet
7. Copies code and applies to current work task

**Success criteria:** Found solution in <10 seconds

#### Flow 4: User Edits Entry with New Insights
1. User views an old entry about a problem they solved
2. Realizes they've learned a better approach
3. Clicks "Edit" button
4. Updates content with improved solution and note: "Better approach: use async/await"
5. Clicks "Save"
6. Views updated entry with new information preserved

**Success criteria:** Edit process is obvious and straightforward

#### Flow 5: User Deletes Duplicate Entry
1. User notices they accidentally created the same entry twice
2. Opens the duplicate entry
3. Clicks "Delete" button
4. Sees confirmation: "Are you sure you want to delete this entry? This cannot be undone."
5. Confirms deletion
6. Returns to entry list; duplicate is gone

**Success criteria:** Confirmation prevents accidental deletions

### UI/UX Considerations

**Visual Design Philosophy:**
- Clean, minimal interface that doesn't overwhelm beginners
- Generous white space to reduce cognitive load
- Clear visual hierarchy: titles prominent, dates subtle
- Professional but approachable (not overly technical or gamified)

**Layout Priorities:**
- **Entry List:** Scannable at a glance; shows most recent entries first
- **Entry View:** Content is the star; actions (edit/delete) are accessible but not distracting
- **New/Edit Form:** Minimal fields; focus on getting content down quickly
- **Mobile:** Fully functional on phone for on-the-go reference (responsive design)

**Interaction Design:**
- Large, clear buttons with action-oriented labels ("Save Entry" not just "Save")
- Instant feedback on actions (success messages, loading states)
- Keyboard shortcuts for power users (e.g., Ctrl+N for new entry)
- Auto-save drafts to prevent data loss

**Empty States:**
- Encouraging message when no entries exist yet
- Clear call-to-action to create first entry
- No shame language (avoid "You have nothing" - use "Start building your knowledge base")

### Edge Cases and Error States

**Edge Case 1: User Tries to Save Entry Without Title**
- **Scenario:** User clicks "Save" but title field is empty
- **Behavior:** Form doesn't submit; title field highlighted in red; message: "Please add a title to your entry"
- **Rationale:** Title is required for identifying entries in list view

**Edge Case 2: User Tries to Save Entry Without Content**
- **Scenario:** User enters title but leaves content empty
- **Behavior:** Form doesn't submit; content field highlighted; message: "Please add some content to your entry"
- **Rationale:** Empty entries provide no value

**Edge Case 3: Entry Has Very Long Content**
- **Scenario:** User pastes an entire article or long code file
- **Behavior:** Entry saves successfully; list view shows title and date only (not truncated content); full content visible in entry view with scrolling
- **Rationale:** Users might legitimately need to save large amounts of text

**Edge Case 4: User Has Zero Entries and Searches**
- **Scenario:** New user tries search when journal is empty
- **Behavior:** Message: "No entries yet - create your first entry to start building your searchable knowledge base"
- **Rationale:** Guides user toward productive action

**Edge Case 5: Search Returns No Results**
- **Scenario:** User searches but no entries match the keyword
- **Behavior:** Message: "No entries found for '[search term]' - try a different keyword or browse all entries"
- **Rationale:** Clear feedback prevents user thinking app is broken

**Edge Case 6: User Navigates Away Mid-Edit**
- **Scenario:** User is editing an entry and accidentally clicks browser back button
- **Behavior:** Browser shows warning: "You have unsaved changes. Leave page?"
- **Rationale:** Prevents accidental data loss

**Edge Case 7: Multiple Tabs Open**
- **Scenario:** User has Code Journal open in two browser tabs
- **Behavior:** Changes in one tab don't automatically appear in other tab until refresh (MVP limitation)
- **Rationale:** Real-time sync across tabs is complex; acceptable limitation for Phase 1

**Edge Case 8: Entry Contains Special Characters**
- **Scenario:** User includes code with <, >, &, quotes in entry content
- **Behavior:** Characters display correctly (properly escaped/encoded); no broken HTML
- **Rationale:** Essential for code snippets to render properly

**Error State 1: Database/Storage Unavailable**
- **Scenario:** Local storage is full or unavailable
- **Behavior:** Clear error message: "Unable to save entry - your device storage may be full. Try freeing up space."
- **Rationale:** User understands problem and knows what to do

**Error State 2: Entry Won't Load**
- **Scenario:** Corrupted data or app error prevents entry from loading
- **Behavior:** Error message: "Unable to load this entry. Please try refreshing the page."
- **Rationale:** Graceful degradation; doesn't crash entire app

**Error State 3: Network Unavailable (Phase 4)**
- **Scenario:** User offline when multi-device sync is enabled
- **Behavior:** App continues to work; indicator shows "Offline - changes will sync when connected"
- **Rationale:** Doesn't block user from working; transparent about sync status

---

## 6. Technical Considerations

### Dependencies
**Phase 1 (MVP):**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local data storage capability (browser storage)
- No external services or APIs required for core functionality

**Phase 2-4:**
- Search functionality may require text indexing capability
- Syntax highlighting may require code formatting libraries
- Multi-device sync (Phase 4) will require backend server and user authentication

### Data Model Overview
At a high level, the app manages **Journal Entries** with the following key attributes:
- Unique identifier
- Title
- Content
- Creation timestamp
- Last modified timestamp (for future phases)
- Tags (Phase 2+)

Data must persist across browser sessions and survive page refreshes.

### Integration Points
**Phase 1 (MVP):**
- No external integrations required
- Self-contained web application

**Future Phases:**
- **Phase 3:** Potential integration with syntax highlighting service or library for code formatting
- **Phase 4:** Integration with cloud storage or sync service for multi-device access
- **Phase 4:** User authentication system (if multi-user or cloud sync)

### Migration Strategy
**Phase 1 to Phase 2:**
- Add tags field to existing entries (optional field, defaults to empty)
- Build search index from existing entry data
- No data loss; backward compatible

**Phase 2 to Phase 3:**
- Content format may need to support rich text markup
- Existing plain text entries remain valid
- Gradual enhancement: users can add formatting to new/edited entries

**Phase 3 to Phase 4:**
- Migrate from local-only storage to sync-capable storage
- Provide export/backup before migration
- User controls when/if to enable sync (opt-in)

### Rollout Plan
**Phase 1 (MVP):**
- Launch to small group of beta testers (5-10 users)
- Gather feedback on core CRUD functionality and usability
- Iterate based on feedback before wider release
- Success criteria: Beta users create entries daily for 1 week

**Phase 2:**
- Add to existing user base once Phase 1 is stable
- Introduce search and tags as enhancements to existing app
- Monitor: Are users adopting tags? Is search reducing time-to-find?

**Phase 3:**
- Optional enhancement; users can continue using plain text if preferred
- Highlight benefits through in-app messaging
- Monitor: What % of entries use code highlighting or rich text?

**Phase 4:**
- Highest risk due to data sync complexity
- Opt-in feature with clear communication about how sync works
- Phased rollout: Start with single-user multi-device before considering multi-user
- Extensive testing before release

### Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Users don't adopt the tool** | High - Product doesn't achieve goals | Start with beta users who have expressed need; gather feedback early; iterate quickly |
| **Data loss due to browser storage limitations** | High - Destroys user trust | Implement automatic export/backup; warn users when approaching storage limits; provide manual export option |
| **App is too complex for beginners** | Medium - Users abandon during onboarding | Extensive usability testing; simplify UI ruthlessly; 2-minute onboarding goal |
| **Performance degrades with many entries** | Medium - Frustration with slow app | Set performance benchmarks; test with 1000+ entries; optimize before scaling |
| **Sync conflicts in Phase 4** | High - Data corruption or loss | Delay Phase 4 until proven sync strategy; extensive testing; clear conflict resolution UX |
| **Users want features not in roadmap** | Low - Distraction from core goals | Listen to feedback but stay focused on Phase 1 success; document feature requests for later consideration |

---

## 7. Out of Scope

The following features are explicitly **not** included in the current roadmap. These may be considered for future versions based on user feedback and demand.

### Definitely Out of Scope for All Phases

**Collaboration Features:**
- Sharing entries with other users
- Team workspaces or shared journals
- Commenting on others' entries
- **Rationale:** Code Journal is designed as a personal learning tool; collaboration adds significant complexity and changes the core value proposition

**Social/Community Features:**
- Public profiles or portfolios
- Following other learners
- Leaderboards or gamification
- **Rationale:** Could create pressure or comparison; focus is on personal growth, not social validation

**AI-Powered Features:**
- AI-generated summaries of entries
- Automatic tagging suggestions via ML
- AI chat assistant for asking questions about entries
- **Rationale:** Adds complexity and cost; users should actively engage with their own learnings rather than rely on AI

**Mobile Native Apps:**
- iOS or Android native applications
- **Rationale:** Mobile-responsive web app addresses core need; native apps require significant additional development

**Advanced Content Types:**
- Video or audio recordings
- Interactive code playgrounds
- Diagrams or drawing tools
- **Rationale:** Scope creep; plain text and code snippets cover 95% of use cases

### Out of Scope for Phase 1 (May Reconsider Later)

**Import from Other Tools:**
- Import notes from Notion, Evernote, etc.
- **Rationale:** Focus on new entry creation first; can add if users request migration path

**Entry Templates:**
- Pre-defined templates for common entry types (bug fix, new concept, etc.)
- **Rationale:** Adds complexity; users can develop their own patterns organically

**Entry Linking:**
- Link between related entries
- Backlinks or knowledge graph visualization
- **Rationale:** Interesting but complex; tags provide sufficient organization for beginners

**Version History:**
- See previous versions of edited entries
- Rollback to earlier version
- **Rationale:** Nice-to-have but not critical for MVP; adds significant complexity

**Scheduled Reminders:**
- Notifications to review old entries
- Spaced repetition system
- **Rationale:** Could be valuable but requires notification infrastructure; focus on core functionality first

**Analytics Dashboard:**
- Visualize learning trends over time
- Entry count by topic/tag
- Most-viewed entries
- **Rationale:** Interesting but not essential; users can scroll their entry list to see progress

---

## 8. Open Questions

These questions need answers before or during development. Decisions will be documented as they're made.

### Business/Product Questions

**Q1: Should we build for single-user local-only first, or design for multi-device from the start?**
- **Context:** Local-only is simpler but may frustrate users who want access across devices
- **Decision needed by:** Before Phase 1 technical design
- **Current thinking:** Start local-only to prove value, add sync in Phase 4

**Q2: What is the right storage limit for MVP?**
- **Context:** Browser storage has limits; need to determine when to warn users
- **Options:** 5MB, 10MB, unlimited (with warnings)?
- **Decision needed by:** During Phase 1 implementation

**Q3: Should deleted entries be soft-deleted (recoverable) or hard-deleted (permanent)?**
- **Context:** Soft delete is safer but adds complexity
- **Current thinking:** Hard delete for MVP with clear confirmation; add trash/undo in later phase if users request

**Q4: How do we handle user authentication if we add multi-device sync (Phase 4)?**
- **Context:** Could use existing auth providers (Google, GitHub) or build custom
- **Decision needed by:** Before Phase 4 planning
- **Current thinking:** Prefer third-party OAuth to avoid password management

### Technical Questions

**Q5: What data storage approach should we use for Phase 1?**
- **Options:** Browser LocalStorage, IndexedDB, or other
- **Trade-offs:** LocalStorage is simpler but more limited; IndexedDB more powerful but complex
- **Decision needed by:** During technical design phase
- **Current thinking:** Defer to technical design document

**Q6: Do we need a backend server for Phase 1, or can it be purely client-side?**
- **Context:** Client-side is simpler but limits future scalability
- **Decision needed by:** Before Phase 1 implementation
- **Current thinking:** Build with backend from start (Node.js/Express) to make Phase 4 easier, even if Phase 1 doesn't require it

**Q7: What happens when user reaches browser storage capacity?**
- **Options:** Block new entries, allow with warning, automatically archive old entries
- **Decision needed by:** During Phase 1 implementation

### UX Questions

**Q8: Should entry list show content preview or just title + date?**
- **Context:** Preview helps identify entries but clutters list view
- **Options:** Title only, first line preview, or user preference
- **Decision needed by:** During UI design phase
- **Current thinking:** Title + date only for clean, scannable list; full content in detail view

**Q9: How should we handle very long entry titles?**
- **Options:** Truncate with ellipsis, allow wrapping, enforce character limit
- **Decision needed by:** During UI design phase

**Q10: Should "New Entry" open in same page or modal/overlay?**
- **Context:** Affects navigation flow and user experience
- **Decision needed by:** During UI design phase
- **Current thinking:** Navigate to dedicated create page for focus; consistent with edit flow

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-13 | Product Team | Initial PRD draft - all sections completed |

---

**Next Steps:**
1. Review and approve this PRD with stakeholders
2. Create detailed user stories with acceptance criteria document
3. Write Technical Design Document (TDD) based on approved PRD
4. Begin Phase 1 MVP development

---

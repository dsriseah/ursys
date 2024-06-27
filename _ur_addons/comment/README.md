## Collecting Information

Sri is refactoring...See also https://github.com/dsriseah/ursys/discussions/20

### Lifecycle Events
1. **Initial Render**
2. **User Events Routing**
3. **Reactive Rendering**
4. **Data Entry Mode**
5. **Data Editing**
6. **Data Submission**
7. **Data Update**
8. **Data Notification -> Reactive Rendering**

### Comment Management
- **Comment Transactions:**
  - Open and edit comments
  - Track active open comments as transactions (open -> close)
  - Track active edited comments as transactions (edit -> done)
  - Rules for Open and Edit states (state machine)

### Visual Components
1. **Comment Badges:**
   - Display links and info, can be open or closed.

2. **Comment Threads:**
   - List of comments that can be opened and closed.
   - Commands: "add reply" and "close" based on interaction.
   - Nested state changes on hover.

3. **Comments:**
   - Can be expanded or not.
   - Edit mode or read-only.
   - Transaction: edited -> submitted or cancelled.
   - Nested state changes on hover.

### Data Submission
- Track open/close actions via UI.
- Comment creation invokes database entry creation.
- Comment edit creates locking.
- Comment submission updates the database.

### State Hierarchy
- Hierarchy of selection < highlighted < focused affecting render display.
- Modeled in app state, not UI, through flag checking and event firing.



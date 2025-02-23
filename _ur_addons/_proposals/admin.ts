/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Admin Systems
  based on https://docs.google.com/document/d/1Arc8dXuRth6h7TaJs_fQ0RTrEHGyG21YYyMZWEfU51M/

  ROLES 
  Viewer (Non-logged-in User)
  Student / End User
  Teacher / Group Leader
  Unit Author / Template Editor
  Administrator / Researcher

  GROUP
  Default: viewer
  Classroom: students + teacher + researcher
  Organization: user + administrator

  BASIC OPERATIONS (all user roles)

    Enter a login token to login
    Log out
    Export Nodes
    Export Edges
  
  VIEW GRAPH READ ONLY - GRAPH OPERATIONS
  
    Zoom In / Out / Reset via navigation buttons
    Zoom In / Out via mouse scroll
    Pan va mouse drag
    Select Node by clicking on the Graph
    Select Edge by clicking on the Graph

  VIEW GRAPH READ ONLY - SEARCH OPERATIONS
    Search for a node by name

  VIEW GRAPH READ ONLY - NODE EDITOR OPERATIONS
  
    Show Attributes
    Show Edges
    Select Edge to open Edge Editor
    Show Provenance
    Cite Node
    Deselect Node Editor

  VIEW GRAPH READ ONLY - EDGE EDITOR OPERATIONS

    Show Attributes
    Show Edges
    Show Provenance
    Cite Edge
    Deselect Edge Editor

  VIEW GRAPH READ ONLY - NODE TABLE OPERATIONS

    Open / Close  Node Table
    Drag Node Table separator to resize table height
    Select a column to sort by
    Toggle sort order from ascending to descending to unsorted
    View a node with the Node Editor
    Click Node label to show selected node

  VIEW GRAPH READ ONLY - EDGE TABLE OPERATIONS

    Open / Close  Edge Table
    Drag Edge Table separator to resize table height
    Select a column to sort by
    Toggle sort order from ascending to descending to unsorted
    View a edge with the Edge Editor
    Click Edge label to show selected edge 

  VIEW GRAPH READ ONLY - FILTER OPERATIONS: GENERAL

    Show Filters
    Select Filter Type: Fade / Reduce / Focus
    Clear Filters

  VIEW GRAPH READ ONLY - FILTER OPERATIONS: FADE

    Set Node / Edge parameter
    Set Node / Edge transparency

  VIEW GRAPH READ ONLY - FILTER OPERATIONS: REDUCE

    Set Node / Edge parameter
    Set Node / Edge transparency

  VIEW GRAPH READ ONLY - FILTER OPERATIONS: FOCUS
    Set Range

  EDIT GRAPH LOGGED IN - SEARCH OPERATIONS
    Add a new node using the search terms

  EDIT GRAPH LOGGED IN - NODE EDITOR OPERATIONS

    Enable Edit Mode
    Save Edits
    Delete Node
    Enter Node Label

  EDIT GRAPH LOGGED IN - EDGE EDITOR OPERATIONS

    Enable Edit Mode
    Save Edits
    Delete Edge
    Reverse source and target
    Select source node
    Select target node
    Select Edge type

  EDIT GRAPH LOGGED IN - NODE TABLE OPERATIONS

    Open and Edit a node in the table row

  EDIT GRAPH LOGGED IN - EDGE TABLE OPERATIONS

    Open and Edit an edge in the table row

  COMMENT READ ONLY - USER OPERATIONS

    Comment Status Bar - Not displayed when not logged in.
    
  COMMENT READ ONLY - NODE OPS

    View Node Comment Collection from Node Editor
    View Node Comment Collection from Node Table
    Close Node Comment Collection
    Display comment count
    “Read” status is always “unread” because there is no user “marked read” tracking.

  COMMENT READ ONLY - EDGE OPS
    View Edge Comment Collection from Edge Editor
    View Edge Comment Collection from Edge Table
    Close Edge Comment Collection
    Display comment count
    “Read” status is always “unread” because there is no user “marked read” tracking.

  COMMENT LOGGED-IN USER - Comment Status Bar

    Expand comment status bar
    Minimize comment status bar – show summary info only
    Open referent (node, edge, etc)
    Open  comment
    Display comment count
    Display comment read/unread status
    Mark all comments read

  COMMENT LOGGED-IN USER - Node Comment
    Add Node Comment
    Edit Node Comment
    Delete Node Comment
    Reply to Node Comment
    Display comment read/unread status
    Close Comment and Mark All Read

  COMMENT LOGGED-IN USER - Edge Comment
    Add Edge Comment
    Edit Edge Comment
    Delete Edge Comment
    Reply to Edge Comment
    Display comment read/unread status
    Close Comment and Mark All Read

  ADMIN LOGGED-IN - Import / Export
    Import Node CSV File – Based on Project Preference
    Import Edges CSV File – Based on Project Preference
    Clear File Selections

  EDIT NODE TYPE
    Logged-In Unit Author Operations
    Add new Node Type
    Edit existing Node Type
    Remove Node Type
    Change Node Type Label
    Change Node Type Color
    Save and Apply Node Type Changes

  EDIT EDGE TYPE
    Logged-In Unit Author Operations
    Add new Edge Type
    Edit existing Edge Type

  Remove Edge Type
    Change Edge Type Label
    Change Edge Type Color
    Save and Apply Edge Type Changes

  REPLACE EXISTING TEMPLATE
    Logged-In Unit Author Operations
    Set 


  MODIFY EXISTING TEMPLATE - General Template Management
    Upload New Template
    Download Current Template
    Create a New Template

  MODIFY EXISTING TEMPLATE - Project Preferences
    Project Name
    Project Description
    Requires Login to View
    Hide Delete Node Buton
    Allow Logged In User to Import
    Node Size Default
    Node Size Max
    Edge Size Default
    Edge Size Max
    Filter Fade Label
    Filter Fade Help
    Filter Reduce Label
    Filter Reduce Help
    Filter Focus Label
    Filter Focus Help
    Duplicate Node Warning Message
    Node is Locked Message
    Edge Is Locked Message
    Template Is Locked Message
    Import Is Locked Message
    Node Default Transparency
    Edge Default Transparency
    Search Color – color of selector matching search terms
    Source Color – color of selector of current selection 
    Select Node Size numeric field – select a numeric field to use as the Node Size

  MODIFY EXISTING TEMPLATE - Field Definitions
    Node / Edge Field Definitions
    Type
    Display Label
    Export Label
    Help
    Include in Graph Tool Tip
    Hidden in node/edge editor and tables and exports – built-in fields are always exported even if they’re hidden

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

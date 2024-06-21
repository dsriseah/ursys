### Function Signatures for `m_` Prefixed Functions:
- `function m_PromiseLoadDB()`
- `function m_UpdateColorMap()`
- `function m_HandleAutoCompleteSelect(data)`
- `function m_MarkNodesThatMatch(searchString, color)`
- `function m_SetStrokeColorThatMatch(searchString, color)`
- `function m_MarkSelectedEdges(edges, node)`
- `function m_FindMatchingObjsByProp(obj_list, match_me = {})`
- `function m_SetMatchingObjsByProp(obj_list, match_me = {}, yes = {}, no = {})`
- `function m_SetAllObjs(obj_list, all = {})`
- `function m_DeleteMatchingNodesByProp(del_me = {})`
- `function m_FindMatchingNodeByProp(match_me = {})`
- `function m_FindNodeById(id)`
- `function m_FindMatchingNodesByLabel(str = '')`
- `function m_SetMatchingNodesByLabel(str = '', yes = {}, no = {})`
- `function m_SetMatchingNodesByProp(match_me = {}, yes = {}, no = {})`
- `function m_DeleteMatchingEdgeByProp(del_me = {})`
- `function m_SetMatchingEdgesByProp(match_me = {}, yes = {}, no = {})`
- `function m_MigrateData(data)`
- `function m_UnMarkAllNodes()`
- `function m_UnStrokeAllNodes()`

### Function Invocations for `UDATA.*` Declarations:
- `UDATA.SetAppState('NCDATA', data.d3data)`
- `UDATA.SetAppState('TEMPLATE', data.template)`
- `UDATA.LocalCall('LOAD_COMMENT_DATACORE', data)`
- `UDATA.OnAppStateChange('SESSION', session => { ... })`
- `UDATA.HandleMessage('RELOAD_DB', () => { ... })`
- `UDATA.OnAppStateChange('NCDATA', stateChange => { ... })`
- `UDATA.OnAppStateChange('SELECTION', stateChange => { ... })`
- `UDATA.OnAppStateChange('SEARCH', stateChange => { ... })`
- `UDATA.HandleMessage('SOURCE_SELECT', m_sourceSelect)`
- `UDATA.HandleMessage('SOURCE_SEARCH', function (data) { ... })`
- `UDATA.HandleMessage('SOURCE_SEARCH_AND_SELECT', function (data) { ... })`
- `UDATA.HandleMessage('SOURCE_UPDATE', function (data) { ... })`
- `UDATA.HandleMessage('NODE_CREATE', data => { ... })`
- `UDATA.HandleMessage('NODE_DELETE', function (data) { ... })`
- `UDATA.HandleMessage('NODE_TYPES_UPDATE', data => { ... })`
- `UDATA.HandleMessage('FIND_NODE_BY_PROP', data => { ... })`
- `UDATA.HandleMessage('FIND_MATCHING_NODES', data => { ... })`
- `UDATA.HandleMessage('EDGE_CREATE', data => { ... })`
- `UDATA.HandleMessage('EDGE_TYPES_UPDATE', data => { ... })`
- `UDATA.HandleMessage('EDGE_UPDATE', function (data) { ... })`
- `UDATA.HandleMessage('EDGE_DELETE', function (data) { ... })`
- `UDATA.HandleMessage('AUTOCOMPLETE_SELECT', function (data) { ... })`
- `UDATA.HandleMessage('NET_TEMPLATE_UPDATE', stateChange => { ... })`
- `UDATA.HandleMessage('EDIT_CURRENT_TEMPLATE', () => { ... })`
- `UDATA.Call('SRV_TEMPLATE_REGENERATE_DEFAULT')`
- `UDATA.Call('SRV_DBSET', data)`
- `UDATA.NetCall('SRV_DBUNLOCKALL', {})`
- `UDATA.NetCall('SRV_DBUNLOCKALLNODES', {})`
- `UDATA.NetCall('SRV_DBUNLOCKALLEDGES', {})`

### Function Signatures for Functions Defined on the `MOD` Object:
- `MOD.Hook('LOADASSETS', () => { ... })`
- `MOD.Hook('CONFIGURE', () => { ... })`
- `MOD.Hook('DISCONNECT', () => { ... })`
- `MOD.Hook('INITIALIZE', () => { ... })`
- `MOD.Hook('RESET', () => { ... })`
- `MOD.Hook('APP_READY', function (info) { ... })`
- `MOD.GetCurrentUserId = () => { ... }`
- `MOD.SetAllObjs = m_SetAllObjs`
- `MOD.EscapeRegexChars = u_EscapeRegexChars`

### Grouped Function Signatures and Invocations by Type of Operation:

#### Database Operations
**Function Signatures:**
- `function m_PromiseLoadDB()`
- `function m_MigrateData(data)`

**UDATA Function Invocations:**
- `UDATA.SetAppState('NCDATA', data.d3data)`
- `UDATA.SetAppState('TEMPLATE', data.template)`
- `UDATA.LocalCall('LOAD_COMMENT_DATACORE', data)`
- `UDATA.HandleMessage('RELOAD_DB', () => { ... })`

#### State Management
**Function Signatures:**
- `function m_UpdateColorMap()`
- `function m_HandleAutoCompleteSelect(data)`
- `function m_UnMarkAllNodes()`
- `function m_UnStrokeAllNodes()`
- `function m_MarkNodesThatMatch(searchString, color)`
- `function m_SetStrokeColorThatMatch(searchString, color)`
- `function m_MarkSelectedEdges(edges, node)`

**UDATA Function Invocations:**
- `UDATA.OnAppStateChange('SESSION', session => { ... })`
- `UDATA.OnAppStateChange('NCDATA', stateChange => { ... })`
- `UDATA.OnAppStateChange('SELECTION', stateChange => { ... })`
- `UDATA.OnAppStateChange('SEARCH', stateChange => { ... })`
- `UDATA.SetAppState('NCDATA', NCDATA)`
- `UDATA.SetAppState('TEMPLATE', TEMPLATE)`
- `UDATA.SetAppState('HILITE', newHilite)`
- `UDATA.SetAppState('ACTIVEAUTOCOMPLETE', { activeAutoCompleteId: data.id })`

#### Node Operations
**Function Signatures:**
- `function m_FindMatchingObjsByProp(obj_list, match_me = {})`
- `function m_SetMatchingObjsByProp(obj_list, match_me = {}, yes = {}, no = {})`
- `function m_SetAllObjs(obj_list, all = {})`
- `function m_DeleteMatchingNodesByProp(del_me = {})`
- `function m_FindMatchingNodeByProp(match_me = {})`
- `function m_FindNodeById(id)`
- `function m_FindMatchingNodesByLabel(str = '')`
- `function m_SetMatchingNodesByLabel(str = '', yes = {}, no = {})`
- `function m_SetMatchingNodesByProp(match_me = {}, yes = {}, no = {})`

**UDATA Function Invocations:**
- `UDATA.HandleMessage('SOURCE_SELECT', m_sourceSelect)`
- `UDATA.HandleMessage('SOURCE_SEARCH', function (data) { ... })`
- `UDATA.HandleMessage('SOURCE_SEARCH_AND_SELECT', function (data) { ... })`
- `UDATA.HandleMessage('SOURCE_UPDATE', function (data) { ... })`
- `UDATA.HandleMessage('NODE_CREATE', data => { ... })`
- `UDATA.HandleMessage('NODE_DELETE', function (data) { ... })`
- `UDATA.HandleMessage('NODE_TYPES_UPDATE', data => { ... })`
- `UDATA.HandleMessage('FIND_NODE_BY_PROP', data => { ... })`
- `UDATA.HandleMessage('FIND_MATCHING_NODES', data => { ... })`

#### Edge Operations
**Function Signatures:**
- `function m_DeleteMatchingEdgeByProp(del_me = {})`
- `function m_SetMatchingEdgesByProp(match_me = {}, yes = {}, no = {})`

**UDATA Function Invocations:**
- `UDATA.HandleMessage('EDGE_CREATE', data => { ... })`
- `UDATA.HandleMessage('EDGE_TYPES_UPDATE', data => { ... })`
- `UDATA.HandleMessage('EDGE_UPDATE', function (data) { ... })`
- `UDATA.HandleMessage('EDGE_DELETE', function (data) { ... })`

#### Utility Operations
**Function Signatures:**
- `function u_EscapeRegexChars(string)`
- `MOD.EscapeRegexChars = u_EscapeRegexChars`

#### Command Line Utilities
**Function Signatures:**
- `JSCLI.AddFunction(function ncRegenerateDefaultTemplate() { ... })`
- `JSCLI.AddFunction(function ncPushDatabase(jsonFile) { ... })`
- `JSCLI.AddFunction(function ncEmptyDatabase() { ... })`
- `JSCLI.AddFunction(function ncUnlockAll() { ... })`
- `JSCLI.AddFunction(function ncUnlockAllNodes() { ... })`
- `JSCLI.AddFunction(function ncUnlockAllEdges() { ... })`
- `JSCLI.AddFunction(function ncNodeColorMap() { ... })`
- `JSCLI.AddFunction(function ncDumpData() { ... })`
- `JSCLI.AddFunction(function ncMakeTokens(clsId, projId, dataset, numGroups) { ... })`

#### Module Lifecycle Hooks
**Function Signatures:**
- `MOD.Hook('LOADASSETS', () => { ... })`
- `MOD.Hook('CONFIGURE', () => { ... })`
- `MOD.Hook('DISCONNECT', () => { ... })`
- `MOD.Hook('INITIALIZE', () => { ... })`
- `MOD.Hook('RESET', () => { ... })`
- `MOD.Hook('APP_READY', function (info) { ... })`

**Additional MOD Functions:**
- `MOD.GetCurrentUserId = () => { ... }`
- `MOD.SetAllObjs = m_SetAllObjs`

### Inferred Groupings and Naming:

1. **Database Operations:**
   - `loadDatabase()`
   - `migrateData(data)`
   - `UDATA.SetAppState('NCDATA', data.d3data)`
   - `UDATA.SetAppState('TEMPLATE', data.template)`
   - `UDATA.LocalCall('LOAD_COMMENT_DATACORE', data)`
   - `UDATA.HandleMessage('RELOAD_DB', () => { ... })`

2. **State Management:**
   - `updateColorMap()`
   - `handleAutoCompleteSelect(data)`
   - `unmarkAllNodes()`
   - `unstrokeAllNodes()`
   - `markNodesThatMatch(searchString, color)`
   - `setStrokeColorThatMatch(searchString, color)`
   - `markSelectedEdges(edges, node)`
   - `UDATA.OnAppStateChange('SESSION', session => { ... })`
   - `UDATA.OnAppStateChange('NCDATA', stateChange => { ... })`
   - `UDATA.OnAppStateChange('SELECTION', stateChange => { ... })`
   - `UDATA.OnAppStateChange('SEARCH', stateChange => { ... })`
   - `UDATA.SetAppState('NCDATA', NCDATA)`
   - `UDATA.SetAppState('TEMPLATE', TEMPLATE)`
   - `UDATA.SetAppState('HILITE', newHilite)`
   - `UDATA.SetAppState('ACTIVEAUTOCOMPLETE', { activeAutoCompleteId: data.id })`

3. **Node Operations:**
   - `findMatchingObjsByProp(obj_list, match_me = {})`
   - `setMatchingObjsByProp(obj_list, match_me = {}, yes = {}, no = {})`
   - `setAllObjs(obj_list, all = {})`
   - `deleteMatchingNodesByProp(del_me = {})`
   - `findMatchingNodeByProp(match_me = {})`
   - `findNodeById(id)`
   - `findMatchingNodesByLabel(str = '')`
   - `setMatchingNodesByLabel(str = '', yes = {}, no = {})`
   - `setMatchingNodesByProp(match_me = {}, yes = {}, no = {})`
   - `UDATA.HandleMessage('SOURCE_SELECT', m_sourceSelect)`
   - `UDATA.HandleMessage('SOURCE_SEARCH', function (data) { ... })`
   - `UDATA.HandleMessage('SOURCE_SEARCH_AND_SELECT', function (data) { ... })`
   - `UDATA.HandleMessage('SOURCE_UPDATE', function (data) { ... })`
   - `UDATA.HandleMessage('NODE_CREATE', data => { ... })`
   - `UDATA.HandleMessage('NODE_DELETE', function (data) { ... })`
   - `UDATA.HandleMessage('NODE_TYPES_UPDATE', data => { ... })`
   - `UDATA.HandleMessage('FIND_NODE_BY_PROP', data => { ... })`
   - `UDATA.HandleMessage('FIND_MATCHING_NODES', data => { ... })`

4. **Edge Operations:**
   - `deleteMatchingEdgeByProp(del_me = {})`
   - `setMatchingEdgesByProp(match_me = {}, yes = {}, no = {})`
   - `UDATA.HandleMessage('EDGE_CREATE', data => { ... })`
   - `UDATA.HandleMessage('EDGE_TYPES_UPDATE', data => { ... })`
   - `UDATA.HandleMessage('EDGE_UPDATE', function (data) { ... })`
   - `UDATA.HandleMessage('EDGE_DELETE', function (data) { ... })`

5. **Utility Operations:**
   - `escapeRegexChars(string)`
   - `MOD.EscapeRegexChars = u_EscapeRegexChars`

6. **Command Line Utilities:**
   - `regenerateDefaultTemplate()`
   - `pushDatabase(jsonFile)`
   - `emptyDatabase()`
   - `unlockAll()`
   - `unlockAllNodes()`
   - `unlockAllEdges()`
   - `nodeColorMap()`
   - `dumpData()`
   - `makeTokens(clsId, projId, dataset, numGroups)`

7. **Module Lifecycle Hooks:**
   - `MOD.Hook('LOADASSETS', () => { ... })`
   - `MOD.Hook('CONFIGURE', () => { ... })`
   - `MOD.Hook('DISCONNECT', () => { ... })`
   -

 `MOD.Hook('INITIALIZE', () => { ... })`
   - `MOD.Hook('RESET', () => { ... })`
   - `MOD.Hook('APP_READY', function (info) { ... })`
   - `MOD.GetCurrentUserId = () => { ... }`
   - `MOD.SetAllObjs = m_SetAllObjs`

These groupings and inferred names should help in understanding the roles of each function and their respective operations.

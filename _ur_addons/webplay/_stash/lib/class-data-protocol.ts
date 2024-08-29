/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

// new channel SYNC // SYN:[PROTO]_REQ_[RSRC]_[ACTION] //
SYN:[PROTO]_UPDATE_[RSRC]

const protocolDef = { protocol: 'COLLECTION', description: '', resources: {
  type1: ['get','put'], type2: ['write', 'flush']
  }
};
// registerProtocol('10', protocolDef); // we will number the protocols for now
with two digits.


What that should do is automatically register a COLL protocol with a
description, but I think initially I'll implement them manually because we need
to get a sense of what they could be. The idea is that we use SYNC messages just
for synchronizing data between a host that manages the resource and clients that
access it. There's generally a source of data truth that receives requests, and
it emits updates to anyone who is implementing them.

SRV:PROTOCOL_ACTION

  These are solely for synchronizing a comment collection

  SRV:COMMENTS_GET - returns a list of all comment objects and tables
  SRV:COMMENTS_UPDATE - update the comment dataset
  SRV:COMMENTS_INSERT - insert new elements from comment dataset
  SRV:COMMENTS_DELETE - delete elements from comment dataset
  SRV:COMMENTS_LOCK - add to the lock table
  SRV:COMMENTS_UNLOCK - remove from the lock table
  SRV:COMMENTS_MARK_READ - mark a comment read

SYN:PROTOCOL_UPDATE_TYPE

  SYN:COMMENTS_UPDATED_DIFF - { added, removed, updated } 
  SYN:COMMENTS_UPDATED - { comments, readby, locked } 

The general pattern for data has to be handled for CREATE, READ, UPDATE, DELETE operations.  

  CREATE 
  const { comments } = data; // comments is an array of comment objects, returning comments with ids added

  READ
  const { comment_ids } = data // comment_ids is an array of comment ids

  UPDATE
  const { comments } = data // comments is an array of comment objects

  DELETE 
  const { comment_idss } = data // comment_ids is an array of comment ids
  In the case of CREATE, there is no idea known so we need to do some kind of transaction here.
  when UI calls CREATE, it immediatley returns a comment ID that's allocated and also locked by the UADDR
  the UI can call UPDATE at will, as it has the lock
  the UI can also DELETE if the user has decided to cancel, as it has the ID


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

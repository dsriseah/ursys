const message_graph = {
  handlers: {
    'init-appshell.jsx': ['SHELL_REDIRECT'],
    'datastore.js': [
      'DBUPDATE_ALL',
      'DB_UPDATE',
      'DB_BATCHUPDATE',
      'DB_INSERT',
      'DB_MERGE'
    ],
    'server.js': [
      'SRV_REFLECT',
      'SRV_REG_HANDLERS',
      'SRV_DBGET',
      'SRV_DBSET',
      'SRV_DBINSERT',
      'SRV_DBMERGE',
      'SRV_GET_EDIT_STATUS',
      'SRV_REQ_EDIT_LOCK',
      'SRV_RELEASE_EDIT_LOCK',
      'SRV_TEMPLATE_REGENERATE_DEFAULT',
      'SRV_TEMPLATESAVE',
      'SRV_GET_TEMPLATETOML_FILENAME',
      'SRV_DBUPDATE_ALL',
      'SRV_DBUPDATE',
      'SRV_DBBATCHUPDATE',
      'SRV_CALCULATE_MAXNODEID',
      'SRV_DBGETNODEID',
      'SRV_DBGETNODEIDS',
      'SRV_DBLOCKNODE',
      'SRV_DBUNLOCKNODE',
      'SRV_DBISNODELOCKED',
      'SRV_DBLOCKEDGE',
      'SRV_DBUNLOCKEDGE',
      'SRV_DBISEDGELOCKED',
      'SRV_DBLOCKCOMMENT',
      'SRV_DBUNLOCKCOMMENT',
      'SRV_DBISCOMMENTLOCKED',
      'SRV_DBUNLOCKALLNODES',
      'SRV_DBUNLOCKALLEDGES',
      'SRV_DBUNLOCKALLCOMMENTS',
      'SRV_DBUNLOCKALL',
      'SRV_CALCULATE_MAXEDGEID',
      'SRV_DBGETEDGEID',
      'SRV_DBGETEDGEIDS',
      'SRV_DBGETCOMMENTID',
      'SRV_LOG_EVENT'
    ],
    'comment-mgr.js': [
      'LOAD_COMMENT_DATACORE',
      'COMMENTS_UPDATE',
      'COMMENT_UPDATE',
      'READBY_UPDATE',
      'EDIT_PERMISSIONS_UPDATE'
    ],
    'filter-mgr.js': ['FILTER_DEFINE', 'FILTER_CLEAR', 'FILTERS_UPDATE'],
    'hilite-mgr.js': [
      'USER_HILITE_NODE',
      'AUTOSUGGEST_HILITE_NODE',
      'TABLE_HILITE_NODE'
    ],
    'nc-logic.js': [
      'RELOAD_DB',
      'SOURCE_SELECT',
      'SOURCE_SEARCH',
      'SOURCE_SEARCH_AND_SELECT',
      'SOURCE_UPDATE',
      'NODE_CREATE',
      'NODE_DELETE',
      'NODE_TYPES_UPDATE',
      'FIND_NODE_BY_PROP',
      'FIND_MATCHING_NODES',
      'EDGE_CREATE',
      'EDGE_TYPES_UPDATE',
      'EDGE_UPDATE',
      'EDGE_DELETE',
      'AUTOCOMPLETE_SELECT',
      'NET_TEMPLATE_UPDATE',
      'EDIT_CURRENT_TEMPLATE'
    ],
    'NetCreate.jsx': ['DISCONNECT'],
    'selection-mgr.js': [
      'SELECTMGR_SET_MODE',
      'D3_SELECT_NODE',
      'SELECTMGR_SELECT_SECONDARY',
      'SELECTMGR_DESELECT_SECONDARY'
    ],
    'ui-mgr.js': ['USER_HILITE_NODE', 'AUTOSUGGEST_HILITE_NODE', 'TABLE_HILITE_NODE'],
    'd3-simplenetgraph.js': ['ZOOM_RESET', 'ZOOM_IN', 'ZOOM_OUT', 'ZOOM_PAN_RESET'],
    'EdgeEditor.jsx': [
      'EDGE_SELECT',
      'EDGE_EDIT',
      'EDGE_CLOSE',
      'EDIT_PERMISSIONS_UPDATE'
    ],
    'EdgeTable.jsx': ['EDGE_OPEN', 'EDIT_PERMISSIONS_UPDATE'],
    'ImportExport.jsx': ['EDIT_PERMISSIONS_UPDATE'],
    'InfoPanel.jsx': ['FILTER_SUMMARY_UPDATE', 'UI_CLOSE_MORE'],
    'NCComment.jsx': ['COMMENT_UPDATE_PERMISSIONS'],
    'NCCommentBtn.jsx': ['COMMENT_UPDATE_PERMISSIONS', 'COMMENT_SELECT'],
    'NCCommentStatus.jsx': ['COMMENTS_UPDATE', 'COMMENT_UPDATE'],
    'NCCommentThread.jsx': ['COMMENT_UPDATE_PERMISSIONS'],
    'NCDialogInsertImageURL.jsx': ['IMAGE_URL_DIALOG_OPEN'],
    'NCEdge.jsx': [
      'EDGE_OPEN',
      'EDGE_DESELECT',
      'EDIT_PERMISSIONS_UPDATE',
      'EDGE_EDIT',
      'SELECT_SOURCETARGET'
    ],
    'NCGraph.jsx': ['CONSTRUCT_GRAPH'],
    'NCNode.jsx': [
      'EDIT_PERMISSIONS_UPDATE',
      'NODE_EDIT',
      'EDGE_SELECT_AND_EDIT',
      'EDGE_SELECT',
      'EDGE_DESELECT'
    ],
    'NCSearch.jsx': ['EDIT_PERMISSIONS_UPDATE'],
    'NetGraph.jsx': ['CONSTRUCT_GRAPH'],
    'NodeSelector.jsx': [
      'EDIT_PERMISSIONS_UPDATE',
      'SOURCE_UPDATE',
      'NODE_EDIT',
      'EDGE_UPDATE',
      'EDGE_NEW_CANCEL',
      'EDGEEDIT_LOCK',
      'EDGEEDIT_UNLOCK'
    ],
    'NodeTable.jsx': ['EDIT_PERMISSIONS_UPDATE'],
    'Template.jsx': ['EDIT_PERMISSIONS_UPDATE'],
    'URComment.jsx': ['COMMENT_UPDATE_PERMISSIONS'],
    'URCommentBtn.jsx': ['COMMENT_UPDATE_PERMISSIONS', 'COMMENT_SELECT'],
    'URCommentStatus.jsx': ['COMMENTS_UPDATE', 'COMMENT_UPDATE'],
    'URCommentThread.jsx': ['COMMENT_UPDATE_PERMISSIONS'],
    'NumberFilter.js': ['FILTER_CLEAR'],
    'StringFilter.jsx': ['FILTER_CLEAR']
  },
  callers: {
    'datastore.js': [
      'SRV_DBUPDATE',
      'SRV_DBBATCHUPDATE',
      'SRV_DBGET',
      'SRV_TEMPLATESAVE',
      'SRV_GET_TEMPLATETOML_FILENAME',
      'SRV_DBUPDATE_ALL',
      'SRV_DBINSERT',
      'SRV_DBMERGE',
      'SRV_DBSET',
      'SRV_CALCULATE_MAXNODEID',
      'SRV_DBGETNODEID',
      'SRV_DBGETNODEIDS',
      'SRV_CALCULATE_MAXEDGEID',
      'SRV_DBGETEDGEID',
      'SRV_DBGETEDGEIDS',
      'SRV_DBGETCOMMENTID'
    ],
    'client-messager-class.js': ['MESG_NAME'],
    'client.js': ['SRV_REG_HANDLERS'],
    'nc-logic.js': [
      'SRV_TEMPLATE_REGENERATE_DEFAULT',
      'SRV_DBSET',
      'SRV_DBUNLOCKALL',
      'SRV_DBUNLOCKALLNODES',
      'SRV_DBUNLOCKALLEDGES'
    ],
    'server.js': ['EDIT_PERMISSIONS_UPDATE', 'NET_TEMPLATE_UPDATE'],
    'comment-mgr.js': [
      'SRV_GET_EDIT_STATUS',
      'SRV_DBLOCKCOMMENT',
      'SRV_REQ_EDIT_LOCK',
      'SRV_DBUNLOCKCOMMENT',
      'SRV_RELEASE_EDIT_LOCK'
    ],
    'EdgeEditor.jsx': [
      'SRV_GET_EDIT_STATUS',
      'SRV_RELEASE_EDIT_LOCK',
      'SRV_DBUNLOCKEDGE',
      'SRV_DBLOCKEDGE',
      'SRV_REQ_EDIT_LOCK'
    ],
    'EdgeTable.jsx': ['SRV_GET_EDIT_STATUS'],
    'ImportExport.jsx': ['SRV_RELEASE_EDIT_LOCK', 'SRV_GET_EDIT_STATUS'],
    'NCEdge.jsx': [
      'SRV_DBUNLOCKEDGE',
      'SRV_RELEASE_EDIT_LOCK',
      'SRV_DBLOCKEDGE',
      'SRV_REQ_EDIT_LOCK',
      'SRV_DBISEDGELOCKED'
    ],
    'NCNode.jsx': [
      'SRV_DBUNLOCKNODE',
      'SRV_RELEASE_EDIT_LOCK',
      'SRV_GET_EDIT_STATUS',
      'SRV_DBLOCKNODE',
      'SRV_REQ_EDIT_LOCK',
      'SRV_DBISNODELOCKED'
    ],
    'NCSearch.jsx': ['SRV_GET_EDIT_STATUS'],
    'NodeSelector.jsx': [
      'SRV_GET_EDIT_STATUS',
      'SRV_RELEASE_EDIT_LOCK',
      'SRV_DBUNLOCKNODE',
      'SRV_DBLOCKNODE',
      'SRV_REQ_EDIT_LOCK'
    ],
    'NodeTable.jsx': ['SRV_GET_EDIT_STATUS'],
    'Template.jsx': [
      'SRV_REQ_EDIT_LOCK',
      'SRV_GET_EDIT_STATUS',
      'SRV_RELEASE_EDIT_LOCK'
    ]
  },
  messages: {
    'SHELL_REDIRECT': {
      'callers': [],
      'handlers': ['init-appshell.jsx']
    },
    'DBUPDATE_ALL': {
      'callers': [],
      'handlers': ['datastore.js', 'server.js']
    },
    'DB_UPDATE': {
      'callers': [],
      'handlers': ['datastore.js']
    },
    'DB_BATCHUPDATE': {
      'callers': [],
      'handlers': ['datastore.js']
    },
    'DB_INSERT': {
      'callers': [],
      'handlers': ['datastore.js']
    },
    'DB_MERGE': {
      'callers': [],
      'handlers': ['datastore.js']
    },
    'SRV_REFLECT': {
      'callers': [],
      'handlers': ['server.js']
    },
    'SRV_REG_HANDLERS': {
      'callers': ['client.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGET': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBSET': {
      'callers': ['datastore.js', 'nc-logic.js'],
      'handlers': ['server.js']
    },
    'SRV_DBINSERT': {
      'callers': [],
      'handlers': ['server.js']
    },
    'SRV_DBMERGE': {
      'callers': [],
      'handlers': ['server.js']
    },
    'SRV_GET_EDIT_STATUS': {
      'callers': [
        'comment-mgr.js',
        'EdgeEditor.jsx',
        'EdgeTable.jsx',
        'ImportExport.jsx',
        'NCNode.jsx',
        'NCSearch.jsx',
        'NodeSelector.jsx',
        'Template.jsx'
      ],
      'handlers': ['server.js']
    },
    'SRV_REQ_EDIT_LOCK': {
      'callers': [
        'comment-mgr.js',
        'EdgeEditor.jsx',
        'NCEdge.jsx',
        'NCNode.jsx',
        'NodeSelector.jsx',
        'Template.jsx'
      ],
      'handlers': ['server.js']
    },
    'SRV_RELEASE_EDIT_LOCK': {
      'callers': [
        'comment-mgr.js',
        'EdgeEditor.jsx',
        'ImportExport.jsx',
        'NCEdge.jsx',
        'NCNode.jsx',
        'NodeSelector.jsx',
        'Template.jsx'
      ],
      'handlers': ['server.js']
    },
    'SRV_TEMPLATE_REGENERATE_DEFAULT': {
      'callers': ['nc-logic.js'],
      'handlers': ['server.js']
    },
    'SRV_TEMPLATESAVE': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_GET_TEMPLATETOML_FILENAME': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBUPDATE': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBBATCHUPDATE': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_CALCULATE_MAXNODEID': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGETNODEID': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGETNODEIDS': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBLOCKNODE': {
      'callers': ['NCNode.jsx', 'NodeSelector.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKNODE': {
      'callers': ['NCNode.jsx', 'NodeSelector.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBISNODELOCKED': {
      'callers': ['NCNode.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBLOCKEDGE': {
      'callers': ['EdgeEditor.jsx', 'NCEdge.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKEDGE': {
      'callers': ['EdgeEditor.jsx', 'NCEdge.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBISEDGELOCKED': {
      'callers': ['NCEdge.jsx'],
      'handlers': ['server.js']
    },
    'SRV_DBLOCKCOMMENT': {
      'callers': ['comment-mgr.js'],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKCOMMENT': {
      'callers': ['comment-mgr.js'],
      'handlers': ['server.js']
    },
    'SRV_DBISCOMMENTLOCKED': {
      'callers': [],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKALLNODES': {
      'callers': ['nc-logic.js'],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKALLEDGES': {
      'callers': ['nc-logic.js'],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKALLCOMMENTS': {
      'callers': [],
      'handlers': ['server.js']
    },
    'SRV_DBUNLOCKALL': {
      'callers': ['nc-logic.js', 'ImportExport.jsx'],
      'handlers': ['server.js']
    },
    'SRV_CALCULATE_MAXEDGEID': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGETEDGEID': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGETEDGEIDS': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_DBGETCOMMENTID': {
      'callers': ['datastore.js'],
      'handlers': ['server.js']
    },
    'SRV_LOG_EVENT': {
      'callers': [],
      'handlers': ['server.js']
    },
    'LOAD_COMMENT_DATACORE': {
      'callers': [],
      'handlers': ['comment-mgr.js']
    },
    'COMMENTS_UPDATE': {
      'callers': [],
      'handlers': ['comment-mgr.js', 'NCCommentStatus.jsx', 'URCommentStatus.jsx']
    },
    'COMMENT_UPDATE': {
      'callers': [],
      'handlers': ['comment-mgr.js', 'NCCommentStatus.jsx', 'URCommentStatus.jsx']
    },
    'READBY_UPDATE': {
      'callers': [],
      'handlers': ['comment-mgr.js']
    },
    'EDIT_PERMISSIONS_UPDATE': {
      'callers': [
        'comment-mgr.js',
        'EdgeEditor.jsx',
        'EdgeTable.jsx',
        'ImportExport.jsx',
        'NCEdge.jsx',
        'NCNode.jsx',
        'NCSearch.jsx',
        'NodeSelector.jsx',
        'NodeTable.jsx',
        'Template.jsx',
        'URComment.jsx',
        'URCommentBtn.jsx'
      ],
      'handlers': ['comment-mgr.js', 'server.js']
    },
    'FILTER_DEFINE': {
      'callers': [],
      'handlers': ['filter-mgr.js']
    },
    'FILTER_CLEAR': {
      'callers': [],
      'handlers': ['filter-mgr.js', 'NumberFilter.js', 'StringFilter.jsx']
    },
    'FILTERS_UPDATE': {
      'callers': [],
      'handlers': ['filter-mgr.js']
    },
    'USER_HILITE_NODE': {
      'callers': [],
      'handlers': ['hilite-mgr.js', 'ui-mgr.js']
    },
    'AUTOSUGGEST_HILITE_NODE': {
      'callers': [],
      'handlers': ['hilite-mgr.js', 'ui-mgr.js']
    },
    'TABLE_HILITE_NODE': {
      'callers': [],
      'handlers': ['hilite-mgr.js', 'ui-mgr.js']
    },
    'RELOAD_DB': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'SOURCE_SELECT': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'SOURCE_SEARCH': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'SOURCE_SEARCH_AND_SELECT': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'SOURCE_UPDATE': {
      'callers': [],
      'handlers': ['nc-logic.js', 'NodeSelector.jsx']
    },
    'NODE_CREATE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'NODE_DELETE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'NODE_TYPES_UPDATE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'FIND_NODE_BY_PROP': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'FIND_MATCHING_NODES': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'EDGE_CREATE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'EDGE_TYPES_UPDATE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'EDGE_UPDATE': {
      'callers': [],
      'handlers': ['nc-logic.js', 'NodeSelector.jsx']
    },
    'EDGE_DELETE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'AUTOCOMPLETE_SELECT': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'NET_TEMPLATE_UPDATE': {
      'callers': [],
      'handlers': ['nc-logic.js', 'server.js']
    },
    'EDIT_CURRENT_TEMPLATE': {
      'callers': [],
      'handlers': ['nc-logic.js']
    },
    'DISCONNECT': {
      'callers': [],
      'handlers': ['NetCreate.jsx']
    },
    'SELECTMGR_SET_MODE': {
      'callers': ['comment-mgr.js', 'NCEdge.jsx'],
      'handlers': ['selection-mgr.js']
    },
    'D3_SELECT_NODE': {
      'callers': [],
      'handlers': ['selection-mgr.js']
    },
    'SELECTMGR_SELECT_SECONDARY': {
      'callers': [],
      'handlers': ['selection-mgr.js']
    },
    'SELECTMGR_DESELECT_SECONDARY': {
      'callers': [],
      'handlers': ['selection-mgr.js']
    },
    'ZOOM_RESET': {
      'callers': [],
      'handlers': ['d3-simplenetgraph.js']
    },
    'ZOOM_IN': {
      'callers': [],
      'handlers': ['d3-simplenetgraph.js']
    },
    'ZOOM_OUT': {
      'callers': [],
      'handlers': ['d3-simplenetgraph.js']
    },
    'ZOOM_PAN_RESET': {
      'callers': [],
      'handlers': ['d3-simplenetgraph.js']
    },
    'EDGE_SELECT': {
      'callers': [],
      'handlers': ['EdgeEditor.jsx', 'NCNode.jsx']
    },
    'EDGE_EDIT': {
      'callers': [],
      'handlers': ['EdgeEditor.jsx', 'NCEdge.jsx', 'NCNode.jsx']
    },
    'EDGE_CLOSE': {
      'callers': [],
      'handlers': ['EdgeEditor.jsx']
    },
    'EDGE_OPEN': {
      'callers': [],
      'handlers': ['EdgeTable.jsx', 'NCEdge.jsx']
    },
    'FILTER_SUMMARY_UPDATE': {
      'callers': [],
      'handlers': ['InfoPanel.jsx']
    },
    'UI_CLOSE_MORE': {
      'callers': [],
      'handlers': ['InfoPanel.jsx']
    },
    'COMMENT_UPDATE_PERMISSIONS': {
      'callers': [
        'NCComment.jsx',
        'NCCommentBtn.jsx',
        'NCCommentThread.jsx',
        'URComment.jsx',
        'URCommentBtn.jsx',
        'URCommentThread.jsx'
      ],
      'handlers': [
        'NCComment.jsx',
        'URComment.jsx',
        'NCCommentBtn.jsx',
        'NCCommentThread.jsx',
        'URCommentBtn.jsx',
        'URCommentStatus.jsx',
        'URCommentThread.jsx'
      ]
    },
    'COMMENT_SELECT': {
      'callers': [],
      'handlers': ['NCCommentBtn.jsx', 'URCommentBtn.jsx']
    },
    'IMAGE_URL_DIALOG_OPEN': {
      'callers': [],
      'handlers': ['NCDialogInsertImageURL.jsx']
    },
    'EDGE_DESELECT': {
      'callers': [],
      'handlers': ['NCEdge.jsx', 'NCNode.jsx']
    },
    'SELECT_SOURCETARGET': {
      'callers': [],
      'handlers': ['NCEdge.jsx']
    },
    'CONSTRUCT_GRAPH': {
      'callers': [],
      'handlers': ['NCGraph.jsx', 'NetGraph.jsx']
    },
    'NODE_EDIT': {
      'callers': [],
      'handlers': ['NCNode.jsx', 'NodeSelector.jsx']
    },
    'EDGE_SELECT_AND_EDIT': {
      'callers': [],
      'handlers': ['NCNode.jsx']
    },
    'EDGE_NEW_CANCEL': {
      'callers': [],
      'handlers': ['NodeSelector.jsx']
    },
    'EDGEEDIT_LOCK': {
      'callers': [],
      'handlers': ['NodeSelector.jsx']
    },
    'EDGEEDIT_UNLOCK': {
      'callers': [],
      'handlers': ['NodeSelector.jsx']
    }
  }
};

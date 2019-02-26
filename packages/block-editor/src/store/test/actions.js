/**
 * Internal dependencies
 */
import {
	replaceBlocks,
	startTyping,
	stopTyping,
	enterFormattedText,
	exitFormattedText,
	toggleSelection,
	resetBlocks,
	updateBlockAttributes,
	updateBlock,
	selectBlock,
	selectPreviousBlock,
	startMultiSelect,
	stopMultiSelect,
	multiSelect,
	clearSelectedBlock,
	replaceBlock,
	insertBlock,
	insertBlocks,
	showInsertionPoint,
	hideInsertionPoint,
	mergeBlocks,
	removeBlocks,
	removeBlock,
	toggleBlockMode,
	updateBlockListSettings,
} from '../actions';

describe( 'actions', () => {
	describe( 'resetBlocks', () => {
		it( 'should return the RESET_BLOCKS actions', () => {
			const blocks = [];
			const result = resetBlocks( blocks );
			expect( result ).toEqual( {
				type: 'RESET_BLOCKS',
				blocks,
			} );
		} );
	} );

	describe( 'updateBlockAttributes', () => {
		it( 'should return the UPDATE_BLOCK_ATTRIBUTES action', () => {
			const clientId = 'myclientid';
			const attributes = {};
			const result = updateBlockAttributes( clientId, attributes );
			expect( result ).toEqual( {
				type: 'UPDATE_BLOCK_ATTRIBUTES',
				clientId,
				attributes,
			} );
		} );
	} );

	describe( 'updateBlock', () => {
		it( 'should return the UPDATE_BLOCK action', () => {
			const clientId = 'myclientid';
			const updates = {};
			const result = updateBlock( clientId, updates );
			expect( result ).toEqual( {
				type: 'UPDATE_BLOCK',
				clientId,
				updates,
			} );
		} );
	} );

	describe( 'selectBlock', () => {
		it( 'should return the SELECT_BLOCK action', () => {
			const clientId = 'myclientid';
			const result = selectBlock( clientId, -1 );
			expect( result ).toEqual( {
				type: 'SELECT_BLOCK',
				initialPosition: -1,
				clientId,
			} );
		} );
	} );

	describe( 'startMultiSelect', () => {
		it( 'should return the START_MULTI_SELECT', () => {
			expect( startMultiSelect() ).toEqual( {
				type: 'START_MULTI_SELECT',
			} );
		} );
	} );

	describe( 'stopMultiSelect', () => {
		it( 'should return the Stop_MULTI_SELECT', () => {
			expect( stopMultiSelect() ).toEqual( {
				type: 'STOP_MULTI_SELECT',
			} );
		} );
	} );
	describe( 'multiSelect', () => {
		it( 'should return MULTI_SELECT action', () => {
			const start = 'start';
			const end = 'end';
			expect( multiSelect( start, end ) ).toEqual( {
				type: 'MULTI_SELECT',
				start,
				end,
			} );
		} );
	} );

	describe( 'clearSelectedBlock', () => {
		it( 'should return CLEAR_SELECTED_BLOCK action', () => {
			expect( clearSelectedBlock() ).toEqual( {
				type: 'CLEAR_SELECTED_BLOCK',
			} );
		} );
	} );

	describe( 'replaceBlock', () => {
		it( 'should return the REPLACE_BLOCKS action', () => {
			const block = {
				clientId: 'ribs',
			};

			expect(
				Array.from( replaceBlock( [ 'chicken' ], block, true ) )
			).toEqual( [ {
				type: 'REPLACE_BLOCKS',
				clientIds: [ 'chicken' ],
				blocks: [ block ],
				time: expect.any( Number ),
			} ] );
		} );
	} );

	describe( 'replaceBlocks', () => {
		it( 'should return the REPLACE_BLOCKS action', () => {
			const blocks = [ {
				clientId: 'ribs',
			} ];

			expect(
				Array.from( replaceBlocks( [ 'chicken' ], blocks, true ) )
			).toEqual( [ {
				type: 'REPLACE_BLOCKS',
				clientIds: [ 'chicken' ],
				blocks,
				time: expect.any( Number ),
			} ] );
		} );
	} );

	describe( 'insertBlock', () => {
		it( 'should return the INSERT_BLOCKS action', () => {
			const block = {
				clientId: 'ribs',
			};
			const index = 5;
			expect(
				Array.from( insertBlock( block, index, 'testclientid', true, true ) )
			).toEqual( [ {
				type: 'INSERT_BLOCKS',
				blocks: [ block ],
				index,
				rootClientId: 'testclientid',
				time: expect.any( Number ),
				updateSelection: true,
			} ] );
		} );
	} );

	describe( 'insertBlocks', () => {
		it( 'should return the INSERT_BLOCKS action', () => {
			const blocks = [ {
				clientId: 'ribs',
			} ];
			const index = 3;
			expect(
				Array.from( insertBlocks( blocks, index, 'testclientid', true, true ) )
			).toEqual( [ {
				type: 'INSERT_BLOCKS',
				blocks,
				index,
				rootClientId: 'testclientid',
				time: expect.any( Number ),
				updateSelection: true,
			} ] );
		} );
	} );

	describe( 'showInsertionPoint', () => {
		it( 'should return the SHOW_INSERTION_POINT action', () => {
			expect( showInsertionPoint() ).toEqual( {
				type: 'SHOW_INSERTION_POINT',
			} );
		} );
	} );

	describe( 'hideInsertionPoint', () => {
		it( 'should return the HIDE_INSERTION_POINT action', () => {
			expect( hideInsertionPoint() ).toEqual( {
				type: 'HIDE_INSERTION_POINT',
			} );
		} );
	} );

	describe( 'mergeBlocks', () => {
		it( 'should return MERGE_BLOCKS action', () => {
			const firstBlockClientId = 'blockA';
			const secondBlockClientId = 'blockB';
			expect( mergeBlocks( firstBlockClientId, secondBlockClientId ) ).toEqual( {
				type: 'MERGE_BLOCKS',
				blocks: [ firstBlockClientId, secondBlockClientId ],
			} );
		} );
	} );

	describe( 'removeBlocks', () => {
		it( 'should return REMOVE_BLOCKS action', () => {
			const clientId = 'clientId';
			const clientIds = [ clientId ];

			const actions = Array.from( removeBlocks( clientIds ) );

			expect( actions ).toEqual( [
				selectPreviousBlock( clientId ),
				{
					type: 'REMOVE_BLOCKS',
					clientIds,
				},
			] );
		} );
	} );

	describe( 'removeBlock', () => {
		it( 'should return REMOVE_BLOCKS action', () => {
			const clientId = 'myclientid';

			const actions = Array.from( removeBlock( clientId ) );

			expect( actions ).toEqual( [
				selectPreviousBlock( clientId ),
				{
					type: 'REMOVE_BLOCKS',
					clientIds: [ clientId ],
				},
			] );
		} );

		it( 'should return REMOVE_BLOCKS action, opting out of remove previous', () => {
			const clientId = 'myclientid';

			const actions = Array.from( removeBlock( clientId, false ) );

			expect( actions ).toEqual( [
				{
					type: 'REMOVE_BLOCKS',
					clientIds: [ clientId ],
				},
			] );
		} );
	} );

	describe( 'toggleBlockMode', () => {
		it( 'should return TOGGLE_BLOCK_MODE action', () => {
			const clientId = 'myclientid';
			expect( toggleBlockMode( clientId ) ).toEqual( {
				type: 'TOGGLE_BLOCK_MODE',
				clientId,
			} );
		} );
	} );

	describe( 'startTyping', () => {
		it( 'should return the START_TYPING action', () => {
			expect( startTyping() ).toEqual( {
				type: 'START_TYPING',
			} );
		} );
	} );

	describe( 'stopTyping', () => {
		it( 'should return the STOP_TYPING action', () => {
			expect( stopTyping() ).toEqual( {
				type: 'STOP_TYPING',
			} );
		} );
	} );

	describe( 'enterFormattedText', () => {
		it( 'should return the ENTER_FORMATTED_TEXT action', () => {
			expect( enterFormattedText() ).toEqual( {
				type: 'ENTER_FORMATTED_TEXT',
			} );
		} );
	} );

	describe( 'exitFormattedText', () => {
		it( 'should return the EXIT_FORMATTED_TEXT action', () => {
			expect( exitFormattedText() ).toEqual( {
				type: 'EXIT_FORMATTED_TEXT',
			} );
		} );
	} );

	describe( 'toggleSelection', () => {
		it( 'should return the TOGGLE_SELECTION action with default value for isSelectionEnabled = true', () => {
			expect( toggleSelection() ).toEqual( {
				type: 'TOGGLE_SELECTION',
				isSelectionEnabled: true,
			} );
		} );

		it( 'should return the TOGGLE_SELECTION action with isSelectionEnabled = true as passed in the argument', () => {
			expect( toggleSelection( true ) ).toEqual( {
				type: 'TOGGLE_SELECTION',
				isSelectionEnabled: true,
			} );
		} );

		it( 'should return the TOGGLE_SELECTION action with isSelectionEnabled = false as passed in the argument', () => {
			expect( toggleSelection( false ) ).toEqual( {
				type: 'TOGGLE_SELECTION',
				isSelectionEnabled: false,
			} );
		} );
	} );

	describe( 'updateBlockListSettings', () => {
		it( 'should return the UPDATE_BLOCK_LIST_SETTINGS with undefined settings', () => {
			expect( updateBlockListSettings( 'chicken' ) ).toEqual( {
				type: 'UPDATE_BLOCK_LIST_SETTINGS',
				clientId: 'chicken',
				settings: undefined,
			} );
		} );

		it( 'should return the UPDATE_BLOCK_LIST_SETTINGS action with the passed settings', () => {
			expect( updateBlockListSettings( 'chicken', { chicken: 'ribs' } ) ).toEqual( {
				type: 'UPDATE_BLOCK_LIST_SETTINGS',
				clientId: 'chicken',
				settings: { chicken: 'ribs' },
			} );
		} );
	} );
} );

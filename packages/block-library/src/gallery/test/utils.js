import { describe, expect, it } from 'vitest';
import { getHrefAndDestination } from '../utils';

const IMAGE = {
	source_url: 'https://example.com/image.jpg',
	link: 'https://example.com/?attachment_id=1',
};

const LIGHTBOX_ENABLED = { enabled: true, allowEditing: true };

describe( 'getHrefAndDestination', () => {
	describe( 'linking to nothing', () => {
		it( 'turns off an inherited lightbox when the lightbox is enabled globally', () => {
			expect(
				getHrefAndDestination(
					IMAGE,
					'none',
					undefined,
					{ lightbox: { enabled: true } },
					LIGHTBOX_ENABLED
				)
			).toEqual( {
				href: undefined,
				linkDestination: 'none',
				lightbox: { enabled: false },
			} );
		} );

		it( 'leaves the lightbox unset when it is not enabled globally', () => {
			expect(
				getHrefAndDestination(
					IMAGE,
					'none',
					undefined,
					{},
					{
						enabled: false,
						allowEditing: true,
					}
				).lightbox
			).toBeUndefined();
		} );

		it( 'leaves the global lightbox in charge when it cannot be edited', () => {
			expect(
				getHrefAndDestination(
					IMAGE,
					'none',
					undefined,
					{},
					{
						enabled: true,
						allowEditing: false,
					}
				).lightbox
			).toBeUndefined();
		} );

		it( 'leaves the lightbox unset without lightbox settings', () => {
			expect(
				getHrefAndDestination( IMAGE, 'none' ).lightbox
			).toBeUndefined();
		} );
	} );

	it( 'turns on the lightbox when linking to the lightbox', () => {
		expect( getHrefAndDestination( IMAGE, 'lightbox' ) ).toEqual( {
			href: undefined,
			linkDestination: 'none',
			lightbox: { enabled: true },
		} );
	} );

	it( 'turns off an inherited lightbox when linking to the media file', () => {
		expect(
			getHrefAndDestination(
				IMAGE,
				'media',
				undefined,
				{},
				LIGHTBOX_ENABLED
			)
		).toEqual( {
			href: IMAGE.source_url,
			linkDestination: 'media',
			lightbox: { enabled: false },
		} );
	} );
} );

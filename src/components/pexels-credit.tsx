import React from 'react';
export const PexelsCredit: React.FC = () => (
	<div
		className="pexels-credit"
		style={{
			// hardcoding the style as its for credits and
			// creating a separate css file for this is not necessary
			position: 'absolute',
			bottom: 10,
			width: '100%',
			textAlign: 'center',
		}}
	>
		Photos provided by &nbsp;
		<a href="https://www.pexels.com/api/documentation/" target="blank">
			Pexels
		</a>
	</div>
);

UserInterface.model({
	name: "suraidaa.slider",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		id: "slider",
		children: [
			{
				tagName: "div",
				className: "display-grid template-slider-container",
				children: [
					{
						tagName: "a",
						href: "javascript:;",
						className: "slider-navigation-button slider-previous margin-left-small z-index-2"
					},
					{
						tagName: "a",
						href: "javascript:;",
						className: "slider-navigation-button slider-next margin-right-small z-index-2 justify-self-end"
					}
				]
				},
				{
					tagName: "div",
					className: "display-grid template-slider-bullets margin-top"
				}
		]
	}
})

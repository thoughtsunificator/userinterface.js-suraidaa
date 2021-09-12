UserInterface.model({
	name: "suraidaa.image",
	method: UserInterface.appendChild,
	callback: image => ({
		tagName: "figure",
		className: "display-grid template-slider-image",
		children: [
			{
				tagName: "picture",
				children: [
					{
						tagName: "source",
						media: image.getMedia("low"),
						srcset: image.getSrc("low")
					},
					{
						tagName: "source",
						media: image.getMedia("medium"),
						srcset: image.getSrc("medium")
					},
					{
						tagName: "img",
						className: "display-block width-100 height-100", // FIXME wont not work with a bigger wrapper
						srcset: image.getSrc("default"),
						alt: image.getText()
					}
				]
			},
			{
				tagName: "figcaption",
				className: "padding-vertical width-100 text-indent background-color-seethrough",
				children: [{
					tagName: "a",
					className: "color-white hover-text-decoration-underline",
					href: image.getLink(),
					textContent: image.getText()
				}]
			}
		]
	})
})

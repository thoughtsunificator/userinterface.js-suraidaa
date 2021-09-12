UserInterface.bind("suraidaa.image", function(element, slider, image) {

	UserInterface.listen(image, "set_image_state", function(state) {
		if (state === Suraidaa.Image.STATE_ACTIVE)
			element.classList.add("z-index-1")
		else if (state === Suraidaa.Image.STATE_INACTIVE)
			element.classList.remove("z-index-1")
	})

})

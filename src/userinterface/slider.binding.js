UserInterface.bind("suraidaa.slider", async function(element, images) {

	const slider = new Suraidaa.Slider()

	const imagesNode = element.querySelector(".template-slider-container")
	const bulletsNode = element.querySelector(".template-slider-bullets")
	const previousButtonNode = element.querySelector(".slider-previous")
	const nextButtonNode = element.querySelector(".slider-next")

	UserInterface.listen(slider, "previous", async function(repeat) {
		const activeImage = slider.getActiveImage()
		let previousImage = slider.getPreviousImage()
		if (repeat === true && previousImage === null)
			previousImage = slider.getImages()[slider.getImages().length - 1]
		if (previousImage !== null) {
			await UserInterface.announce(slider, "set_image_state", { image: previousImage, state: Suraidaa.Image.STATE_ACTIVE })
			await UserInterface.announce(slider, "set_image_state", { image: activeImage, state: Suraidaa.Image.STATE_INACTIVE })
		}
	})

	UserInterface.listen(slider, "next", async function(repeat) {
		const activeImage = slider.getActiveImage()
		let nextImage = slider.getNextImage()
		if (repeat === true && nextImage === null)
			nextImage = slider.getImages()[0]
		if (nextImage !== null) {
			await UserInterface.announce(slider, "set_image_state", { image: nextImage, state: Suraidaa.Image.STATE_ACTIVE })
			await UserInterface.announce(slider, "set_image_state", { image: activeImage, state: Suraidaa.Image.STATE_INACTIVE })
		}
	})

	UserInterface.listen(slider, "set_image_state", async function(data) {
		if (data.state === Suraidaa.Image.STATE_ACTIVE) {
			const activeImage = slider.getImages().find(image => image.getState() === Suraidaa.Image.STATE_ACTIVE)
			if(typeof activeImage !== "undefined") {
				await UserInterface.announce(activeImage, "set_image_state", Suraidaa.Image.STATE_INACTIVE)
			}
		}
		await UserInterface.announce(data.image, "set_image_state", data.state)
	})

	UserInterface.listen(slider, "initialize", async function(images) {
		for (const image of images) {
			slider.addImage(image)
			await UserInterface.runModel("suraidaa.image", { data: image, parentNode: imagesNode, bindingArgs: [slider, image] })
			await UserInterface.runModel("suraidaa.bullet", { data: image, parentNode: bulletsNode, bindingArgs: [slider, image] })
		}
		UserInterface.announce(slider, "set_image_state", { image: images[0], state: Suraidaa.Image.STATE_ACTIVE })
		slider.play()
	})

	imagesNode.addEventListener("mouseenter", () => slider.pause())
	imagesNode.addEventListener("mouseleave", () => slider.play())
	previousButtonNode.addEventListener("click", () => UserInterface.announce(slider, "previous", true))
	nextButtonNode.addEventListener("click", () => UserInterface.announce(slider, "next", true))

	await UserInterface.announce(slider, "initialize", images)

})

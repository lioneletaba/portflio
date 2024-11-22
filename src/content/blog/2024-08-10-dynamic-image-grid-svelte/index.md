---
title: 'How to Create an Animated Image Grid Using Svelte'
slug: 'svelte-dynamic-image-grid'
description: 'How to Create an Animated Image Grid Using Svelte'
tags: ['Javascript, SvelteJs, CSS']
pubDate: '2024-08-10'
coverImage: './placeholder.jpg'
coverVideo: '/dynamic_image_grid_svelte.mp4'
---

# Building a Dynamic Image Grid with Svelte: Creating Smooth Card Transitions

Creating engaging user interfaces often requires a delicate balance between functionality and visual appeal. In this article, we'll explore how to build a dynamic image grid component using Svelte that not only manages state efficiently but also provides smooth, eye-catching transitions as images swap in and out.

## The Vision

Imagine a grid of images that periodically refreshes itself, with individual cards smoothly flipping to reveal new images.

This creates an engaging display perfect for showcasing team members, product catalogs, or any collection of images that's larger than what can be shown at once.
I decided to build this with Svelte because, why not ?

More seriously, I find the svelte model to be simpler and more intuitive so given the choice, especially on a small project like this one, that's what I'll default to.

As you will see a little further, svelte makes dealing with a lot of small and intricate state changes really simple compared to other solutions.
There are less ways to mess things up.

## Core Components

Our implementation consists of two main Svelte components:

1. `App.svelte` - The main component that manages the grid and orchestrates image swapping
2. `MemberImageCard.svelte` - Individual cards that handle the flip animation and image display

## State Management: The Brain Behind the Grid

The heart of our widget lies in its state management. We need to track several pieces of information:

```typescript
let allImages: Image[]; // All available images
let imagesToUse: Image[] = []; // Initial grid images
let imagesInUse: Image[] = []; // Current grid state
let remainingImages: Image[] = []; // Pool of unused images
let imagesSwapMap = new Map<number, Image>(); // Tracks pending swaps
```

### Why Track Current State Separately?

You might wonder why we maintain `imagesInUse` separately from `imagesToUse`. This separation serves several crucial purposes:

1. It provides a single source of truth for the current grid state
2. It helps prevent duplicate images from appearing in the grid
3. It enables efficient updates without full grid re-renders
4. It maintains grid integrity during swapping operations

## The Swap Choreography: A Detailed Look

The image swapping process is a carefully orchestrated sequence that ensures smooth transitions while maintaining grid integrity. Let's break down the `switchImages` function step by step:

```typescript
const switchImages = () => {
  let newImagesSwapMap = new Map<number, Image>()
  let remainingImagesToUse
  let newRemainingImages: Image[]
```

### 1. Selecting Images from the Pool

First, we need to determine which images from our remaining pool will be used for swapping:

```typescript
if (remainingImages.length <= NUMBER_OF_IMAGES_TO_SWITCH) {
 // If we have fewer remaining images than needed, use all of them
 remainingImagesToUse = remainingImages.slice(0);
 newRemainingImages = [];
} else {
 // Take the last N images from the remaining pool
 remainingImagesToUse = remainingImages.slice(-NUMBER_OF_IMAGES_TO_SWITCH);
 // Keep the rest for future swaps
 newRemainingImages = remainingImages.slice(0, -NUMBER_OF_IMAGES_TO_SWITCH);
}
```

This code handles two scenarios:

- If we're running low on remaining images, we use all of them
- Otherwise, we take the last N images from our pool, where N is `NUMBER_OF_IMAGES_TO_SWITCH`

### 2. Choosing Grid Positions

Next, we randomly select positions in the grid where we'll swap images:

```typescript
indexesToSwap = Array(NUMBER_OF_IMAGES_TO_SWITCH)
 .fill(null)
 .map(() => Math.floor(Math.random() * NUMBER_OF_IMAGES_TO_USE));
```

This creates an array of random indexes within our grid size. For example, if `NUMBER_OF_IMAGES_TO_SWITCH` is 1 and `NUMBER_OF_IMAGES_TO_USE` is 16, we might get `[7]`, indicating we'll swap the image at position 7 in the grid.

### 3. Preventing Duplicates

Before performing any swap, we check if the new image is already displayed:

```typescript
const imageIsInUse = (image: Image) => {
 const inUse = imagesInUse.find((img: Image) => image.picture_url === img.picture_url);
 return inUse;
};
```

This function prevents the same image from appearing multiple times in our grid.

### 4. The Swap Operation

Now comes the core swapping logic:

```typescript
for (let i = 0; i < indexesToSwap.length; i++) {
 let index = indexesToSwap[i];
 let imageToSwap = imagesInUse[index]; // Current image in the grid
 let imageToSwapWith = remainingImagesToUse.pop(); // New image to display

 if (imageToSwapWith && !imageIsInUse(imageToSwapWith)) {
  // Record the swap in our map
  newImagesSwapMap.set(index, imageToSwapWith);
  // Update the swap map to trigger component updates
  imagesSwapMap = newImagesSwapMap;
  // Update the grid state
  imagesInUse[index] = imageToSwapWith;
  // Add the old image back to the pool
  newRemainingImages.unshift(imageToSwap);
 } else {
  return; // Skip if the image is already in use
 }
}
```

Let's break down what happens in each swap:

1. We get the randomly selected position (`index`)
2. We identify the current image at that position (`imageToSwap`)
3. We take a new image from our pool (`imageToSwapWith`)
4. If the new image is valid and not already displayed:
   - We record the swap in `imagesSwapMap`
   - We update the grid state in `imagesInUse`
   - We add the old image back to the pool at the beginning

### 5. Finalizing the State

After performing all swaps, we update our state:

```typescript
remainingImages = newRemainingImages;
imagesInUse = imagesInUse;
```

### 6. Triggering the Animation

The `imagesSwapMap` is the key to triggering animations. When it updates, the relevant `MemberImageCard` components react:

```typescript
$: {
 if (imagesSwapMap.has(index)) {
  frontImageLoaded = false;
  backImageLoaded = false;
  let currentFace = faceOnDisplay;

  // Load new image on the opposite face
  backImageUrl = currentFace === 'front' && imagesSwapMap.get(index).picture_url;
  frontImageUrl = currentFace === 'back' && imagesSwapMap.get(index).picture_url;

  // Trigger the flip
  faceOnDisplay = faceOnDisplay === 'front' ? 'back' : 'front';
 }
}
```

This reactive statement in `MemberImageCard`:

1. Detects when its position is involved in a swap
2. Loads the new image on the opposite face of the card
3. Triggers the flip animation by changing `faceOnDisplay`
4. Resets image loading states for smooth transitions

The beauty of this system is that it maintains a smooth user experience while ensuring:

- No duplicate images appear in the grid
- Images cycle through efficiently
- The grid always maintains its structure
- Animations occur smoothly and predictably
- Failed swaps (due to duplicates) are handled gracefully

## The Flip Animation: Making It Smooth

Each `MemberImageCard` component manages its own flip animation using CSS transforms and transitions. The magic happens through a combination of state tracking and CSS:

```typescript
let faceOnDisplay: 'front' | 'back' = 'front';
let backImageUrl = '';
let frontImageUrl = member.picture_url;
```

```css
.card {
 transform-style: preserve-3d;
 transition: all 0.6s ease-in-out;
}

.card[data-face='back'] {
 transform: rotateY(180deg);
}
```

When an image needs to swap, we:

1. Load the new image on the reverse side
2. Trigger the flip animation
3. Clean up the old image once the flip is complete

## Progressive Loading for Better UX

To enhance the user experience, we implemented a progressive loading effect:

```css
.image {
 filter: blur(20px);
 opacity: 0;
 transition:
  filter 0.3s ease-out,
  opacity 0.3s ease-out;
}

.front-loaded,
.back-loaded {
 filter: blur(0px);
 opacity: 1;
}
```

Images start blurred and fade in smoothly once loaded, providing a polished look and feel.

## Scheduling the Dance

The regular image swaps are scheduled using Svelte's `onMount` lifecycle function:

```typescript
onMount(() => {
 const interval = setInterval(switchImages, 3000);
 return () => clearInterval(interval);
});
```

## Conclusion

This implementation showcases the power of Svelte's reactive capabilities combined with modern CSS transforms to create a dynamic, engaging UI component. The careful separation of concerns between state management and visual presentation results in code that's both maintainable and performant.

The next time you need to showcase a large collection of images in a limited space, consider implementing a similar approach. The combination of smooth animations and dynamic content creates an engaging user experience that keeps viewers interested.

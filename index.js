document.addEventListener("DOMContentLoaded", () => {
    // ---------------- DOM Elements ----------------
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.querySelector(".search-bar input");
    const aiRecipeContainer = document.getElementById("aiRecipeCards");
    const carouselInner = document.querySelector("#recipeCarousel .carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");
    const togglePromptBtn = document.getElementById("togglePrompt");
    const promptEditor = document.getElementById("promptEditor");
    const closePrompt = document.getElementById("closePrompt");
    const applyPrompt = document.getElementById("applyPrompt");
    const promptTextArea = document.getElementById("promptText");

    let finalPrompt = ""; // Stores the final prompt from editor

    // ---------------- Utility Function ----------------
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    // ---------------- Prompt Editor ----------------
    togglePromptBtn.addEventListener("click", () => {
        promptEditor.style.display = promptEditor.style.display === "none" ? "block" : "none";
        promptTextArea.value = searchInput.value;
    });

    closePrompt.addEventListener("click", () => {
        promptEditor.style.display = "none";
    });

    applyPrompt.addEventListener("click", () => {
        finalPrompt = promptTextArea.value.trim();
        if (finalPrompt) searchInput.value = finalPrompt;
        promptEditor.style.display = "none";
    });

    // ---------------- Search / Generate Recipe ----------------
    searchBtn.addEventListener("click", () => {
        const userPrompt = searchInput.value.trim();
        if (!userPrompt) {
            alert("Please enter a recipe prompt!");
            return;
        }

        // Generate AI Recipe Card
        addRecipeCard(userPrompt);

        // Clear input
        searchInput.value = "";
    });

    // ---------------- Function to Add Recipe Card and Carousel Slide ----------------
    function addRecipeCard(prompt) {
        const capPrompt = capitalize(prompt);
        const imageKeyword = prompt.split(" ")[0];

        // --- Card for grid ---
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";
        colDiv.style.opacity = 0; // fade-in start

        const cardDiv = document.createElement("div");
        cardDiv.className = "card ai-recipe-card shadow-sm h-100";

        const img = document.createElement("img");
        img.src = `https://source.unsplash.com/400x300/?${imageKeyword},food`;
        img.alt = capPrompt;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Title
        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = capPrompt;

        // Ingredients
        const ingHeading = document.createElement("h6");
        ingHeading.textContent = "Ingredients:";
        const ingList = document.createElement("ul");
        ["Ingredient 1", "Ingredient 2", "Ingredient 3"].forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            ingList.appendChild(li);
        });

        // Instructions
        const instrHeading = document.createElement("h6");
        instrHeading.textContent = "Instructions:";
        const instrPara = document.createElement("p");
        instrPara.textContent = "Mix all ingredients and cook to taste. Enjoy your meal!";

        // Button with icon
        const viewBtn = document.createElement("a");
        viewBtn.href = "#";
        viewBtn.className = "btn btn-accent mt-2";

        // Icon using <i> element
        const icon = document.createElement("i");
        icon.className = "fas fa-eye me-1"; // FontAwesome class
        viewBtn.appendChild(icon);
        const btnText = document.createTextNode("View Recipe");
        viewBtn.appendChild(btnText);

        // Assemble card body
        cardBody.append(title, ingHeading, ingList, instrHeading, instrPara, viewBtn);

        // Assemble card
        cardDiv.append(img, cardBody);
        colDiv.appendChild(cardDiv);
        aiRecipeContainer.appendChild(colDiv);

        // Fade-in
        setTimeout(() => { colDiv.style.opacity = 1; }, 50);

        // --- Carousel Slide ---
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item active";

        const carouselImg = document.createElement("img");
        carouselImg.src = `https://source.unsplash.com/1200x600/?${imageKeyword},food`;
        carouselImg.alt = capPrompt;
        carouselImg.className = "d-block w-100 carousel-img";

        const captionDiv = document.createElement("div");
        captionDiv.className = "carousel-caption d-none d-md-block bg-light bg-opacity-75 rounded p-3";

        const captionTitle = document.createElement("h5");
        captionTitle.textContent = capPrompt;
        const captionPara = document.createElement("p");
        captionPara.textContent = "Quick recipe generated by AI based on your prompt.";

        captionDiv.append(captionTitle, captionPara);
        carouselItem.append(carouselImg, captionDiv);

        // Remove active from previous slides
        carouselInner.querySelectorAll(".carousel-item").forEach(item => item.classList.remove("active"));

        // Append new slide
        carouselInner.appendChild(carouselItem);

        // Update carousel indicators
        const indicatorBtn = document.createElement("button");
        indicatorBtn.type = "button";
        indicatorBtn.setAttribute("data-bs-target", "#recipeCarousel");
        indicatorBtn.setAttribute("data-bs-slide-to", carouselInner.children.length - 1);
        indicatorBtn.className = "rounded-circle";
        indicatorBtn.setAttribute("aria-label", `Slide ${carouselInner.children.length}`);
        carouselIndicators.appendChild(indicatorBtn);
    }
});

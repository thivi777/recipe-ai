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

    // ---------------- Utility ----------------
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    // ---------------- Prompt Editor ----------------
    togglePromptBtn?.addEventListener("click", () => {
        promptEditor.style.display = promptEditor.style.display === "none" ? "block" : "none";
        promptTextArea.value = searchInput.value;
    });

    closePrompt?.addEventListener("click", () => {
        promptEditor.style.display = "none";
    });

    applyPrompt?.addEventListener("click", () => {
        finalPrompt = promptTextArea.value.trim();
        if (finalPrompt) searchInput.value = finalPrompt;
        promptEditor.style.display = "none";
    });

    // ---------------- Search / Generate Recipe ----------------
    searchBtn.addEventListener("click", async () => {
        const userPrompt = searchInput.value.trim();
        if (!userPrompt) {
            alert("Please enter a recipe prompt!");
            return;
        }

        // Disable button to prevent multiple clicks
        searchBtn.disabled = true;
        searchBtn.textContent = "Generating...";

        try {
            const recipe = await fetchAIRecipe(userPrompt);
            addRecipeCard(recipe);
        } catch (err) {
            console.error(err);
            alert("Failed to generate recipe. Try again.");
        } finally {
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="fas fa-search me-2"></i>Generate';
            searchInput.value = "";
        }
    });

   

    // ---------------- Add Recipe Card + Carousel ----------------
    function addRecipeCard(recipe) {
        const { title, ingredients, instructions } = recipe;
        const imageKeyword = title.split(" ")[0];

        // --- Card ---
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";
        colDiv.style.opacity = 0;

        const cardDiv = document.createElement("div");
        cardDiv.className = "card ai-recipe-card shadow-sm h-100";

        const img = document.createElement("img");
        img.src = `https://source.unsplash.com/400x300/?${imageKeyword},food`;
        img.alt = title;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = title;

        const ingHeading = document.createElement("h6");
        ingHeading.textContent = "Ingredients:";
        const ingList = document.createElement("ul");
        ingredients.forEach(ing => {
            const li = document.createElement("li");
            li.textContent = ing;
            ingList.appendChild(li);
        });

        const instrHeading = document.createElement("h6");
        instrHeading.textContent = "Instructions:";
        const instrList = document.createElement("ol");
        instructions.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            instrList.appendChild(li);
        });

        const viewBtn = document.createElement("a");
        viewBtn.href = "#";
        viewBtn.className = "btn btn-accent mt-2";
        const icon = document.createElement("i");
        icon.className = "fas fa-eye me-1";
        viewBtn.appendChild(icon);
        viewBtn.appendChild(document.createTextNode("View Recipe"));

        cardBody.append(cardTitle, ingHeading, ingList, instrHeading, instrList, viewBtn);
        cardDiv.append(img, cardBody);
        colDiv.appendChild(cardDiv);
        aiRecipeContainer.appendChild(colDiv);

        // Fade-in
        setTimeout(() => { colDiv.style.opacity = 1; }, 50);

        // --- Carousel ---
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item active";

        const carouselImg = document.createElement("img");
        carouselImg.src = `https://source.unsplash.com/1200x600/?${imageKeyword},food`;
        carouselImg.alt = title;
        carouselImg.className = "d-block w-100 carousel-img";

        const captionDiv = document.createElement("div");
        captionDiv.className = "carousel-caption d-none d-md-block bg-light bg-opacity-75 rounded p-3";
        const captionTitle = document.createElement("h5");
        captionTitle.textContent = title;
        const captionPara = document.createElement("p");
        captionPara.textContent = "AI-generated recipe based on your prompt.";

        captionDiv.append(captionTitle, captionPara);
        carouselItem.append(carouselImg, captionDiv);

        // Remove active from previous slides
        carouselInner.querySelectorAll(".carousel-item").forEach(item => item.classList.remove("active"));

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

const handleFeatures = async (showAll, isClickedAsc, isClickedDec) => {
  const response = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await response.json();
  const item = data.data.tools;
  displayFeatures(item, showAll, isClickedAsc, isClickedDec);
};

const displayFeatures = (features, showAll, isClicked, isClickedDec) => {
  const featureField = document.getElementById("feature-field");
  featureField.textContent = "";

  if (isClicked) {
    features = features.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  } else if (isClickedDec) {
    features = features.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
  }

  // console.log("click", showAll);

  const showAllButton = document.getElementById("btn-showall");

  if (features.length > 9 && !showAll) {
    features = features.slice(0, 9);
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  features.forEach((feature) => {
    const div = document.createElement("div");
    div.classList = `bg-base-100 shadow-none border-2 border-gray-200 rounded-lg`;
    div.innerHTML = `
    <figure class="px-5 pt-5">
      <img src="${feature.image}" alt="${feature.name}" class="rounded-xl h-[160px] w-full" />
    </figure>
    <div class="card-body text-left">
      <h2 class="card-title">Features</h2>
      <ol class="list-decimal ml-4">
        <li>Natural language processing</li>
        <li>Contextual understanding</li>
        <li>Text generation</li>
      </ol>
      <hr class="my-2">
      <div class="flex justify-between items-center">
        <div class="w-[200%]">
          <h3 class="text-black text-xl font-semibold">${feature.name}</h3>
          <p><i class="fa-regular fa-calendar-check"><span class="text-xs pl-2">${feature.published_in}</span></i></p>
        </div>
        <div class="card-actions w-full justify-end">
          <button onclick="handleModal('${feature.id}')" class="btn btn-primary rounded-full bg-[#FEF7F7] border-none text-[#EB5757] hover:bg-[#EB5757] hover:text-white">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    `;

    featureField.appendChild(div);
  });
};

const displayShowAll = () => {
  handleFeatures(true, false, true);
};

const handleModal = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await response.json();
  const item = data.data;
  console.log(id);
  displayModal(item);
};

const displayModal = (data) => {
  console.log(data);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      
      <!-- modal card details -->

      <div class="flex flex-col-reverse md:flex-row gap-4 p-3 lg:p-8">
        <!-- text details section -->
        <div class="bg-[#EB57570A] rounded-lg border-2 border-[#EB5757] space-y-4 p-4 flex-1">
          <h3 class="font-bold">${data?.description}</h3>
          <div class="font-semibold flex flex-col md:flex-row gap-4 justify-center">
            <div class="text-[#03A30A] bg-white px-2 py-4 rounded-lg text-center">
              <p>${(data.pricing && data?.pricing[0]?.price) || "Not Available"}</p>
              <p>${(data.pricing && data?.pricing[0]?.plan) || "Not Available"}</p>
            </div>
            <div class="text-[#F28927] bg-white px-2 py-4 rounded-lg text-center">
              <p>$50/month</p>
              <p>Pro</p>
            </div>
            <div class="text-[#EB5757] bg-white px-2 py-4 rounded-lg text-center">
              <p>Contact Us</p>
              <p>Enterprise</p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div>
              <h3 class="font-bold">Features</h3>
              <ul class="pl-6 list-disc">
                  ${Object.values(data.features)
                    .map((item) => `<li>${item.feature_name}</li>`)
                    .join("")}
              </ul>
            </div>
            <div>
              <h3 class="font-bold">Integrations</h3>
              <ul class="pl-6 list-disc">
                ${
                  data.integrations
                    ? Object.values(data.integrations)
                        .map((item) => `<li>${item}</li>`)
                        .join("")
                    : "Not Available"
                }
              </ul>
            </div>
          </div>
        </div>

        <!-- image section -->
        <div class="border-2 border-gray-200 rounded-lg p-4 relative flex-1">
          <img src='${data.image_link[0]}' class="rounded-lg h-[160px] w-full" alt="image" />
          <p class="bg-[#EB5757] px-1 rounded-lg w-28 text-xs text-center text-white absolute right-7 top-5">${data.accuracy.score !== null ? `${data.accuracy.score * 100}% accuracy` : ""}</p>
          <div class="text-center py-4">
          ${
            data.input_output_examples
              ? data.input_output_examples
                  .map((item) => {
                    return `
                    <div>
                      <p class="p-2"><strong>${item.input}</strong></p>
                      <p>${item.output}</p>
                    </div>
                  `;
                  })
                  .join("")
              : ""
          }          
          </div>
        </div>
      </div>
  `;
  modal_container.showModal();
};

const sortByDateAsc = () => {
  // console.log(isClicked);
  handleFeatures(false, true, false);
};

const sortByDateDes = () => {
  handleFeatures(false, false, true);
};

handleFeatures();

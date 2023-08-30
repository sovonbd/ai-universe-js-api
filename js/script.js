const handleFeatures = async (showAll) => {
  const response = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await response.json();
  // console.log(data.data.tools);
  const item = data.data.tools;
  displayFeatures(item, showAll);
};

const displayFeatures = (features, showAll) => {
  const featureField = document.getElementById("feature-field");
  featureField.textContent = "";

  // console.log("object", showAll);

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
      <img src="${feature.image}" alt="${feature.name}" class="rounded-xl h-[220px]" />
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
        <div class="w-[70%]">
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
  handleFeatures(true);
};

const handleModal = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await response.json();
  const item = data.data;
  // console.log(id);
  displayModal(item);
};

const displayModal = (data) => {
  // console.log(data);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="modal_container" class="modal">
    <form method="dialog" class="modal-box w-11/12 max-w-6xl p-2 lg:p-6">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      
      <!-- modal card details -->

      <div class="flex flex-col-reverse md:flex-row gap-4 p-3 lg:p-8">
        <!-- text details section -->
        <div class="bg-[#EB57570A] rounded-lg border-2 border-[#EB5757] space-y-4 p-4">
          <h3 class="font-bold">${data.description}</h3>
          <div class="font-semibold flex flex-col md:flex-row gap-4 justify-center">
            <div class="text-[#03A30A] bg-white px-2 py-4 rounded-lg text-center">
              <p>${data.pricing[0]?.price}</p>
              <p>${data.pricing[0]?.plan}</p>
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
              <ul class="pl-6">
                <li class="list-disc">${data.features["1"]?.feature_name}</li>
                <li class="list-disc">${data.features["2"]?.feature_name}</li>
                <li class="list-disc">${data.features["3"]?.feature_name}</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold">Integrations</h3>
              <ul class="pl-6">
                <li class="list-disc">${data.integrations[0] || "Not Available"}</li>
                <li class="list-disc">${data.integrations[1] || "Not Available"}</li>
                <li class="list-disc">${data.integrations[1] || "Not Available"}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- image section -->
        <div class="border-2 border-gray-200 rounded-lg p-4 relative">
          <img src='${data.image_link[0]}' class="rounded-lg" alt="image" />
          <p class="bg-[#EB5757] px-2 rounded-lg w-28 text-white absolute right-7 top-5">${data.accuracy.score * 100}% accuracy</p>
          <div class="text-center py-4">
            <h3 class="font-bold">${data.input_output_examples[0]?.input}</h3>
            <p class="text-center">${data.input_output_examples[0]?.output}</p>
          </div>
        </div>
      </div>
    </form>
  </dialog>
  `;

  const modal_container = document.getElementById("modal_container");
  modal_container.showModal();
};

handleFeatures();

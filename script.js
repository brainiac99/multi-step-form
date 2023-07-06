"use strict";

const stepNumber = Array.from(document.querySelectorAll(".step-number"));
const btnNext = document.querySelector(".btn-next");
const btnConfirm = document.querySelector(".btn-confirm");
const btnBack = document.querySelector(".btn-back");
const btnChange = document.querySelector(".change-plan");
const activeStep = document.querySelector(".active-number");
const grid = document.querySelector(".main-steps");
const form = document.querySelector(".form-info");
const inputs = Array.from(form.querySelectorAll("input"));
const labels = Array.from(form.querySelectorAll("label"));
const plans = document.querySelector(".plan-select");
let activePlan = document.querySelector(".active-plan");
const options = Array.from(document.querySelectorAll(".add-on-options>div"));
const monthly = document.querySelector(".toggle-monthly");
const yearly = document.querySelector(".toggle-yearly");
const monthlyEl = document.querySelectorAll(".monthly");
const yearlyEl = document.querySelectorAll(".yearly");
const toggleBtn = document.querySelector(".toggle-btn");
let planName = plans.querySelector(".active-plan .plan-name");
let planPrice = plans.querySelector(".active-plan .plan-price:not(.hidden)");
const selectedPlanName = document.querySelector(".selected-plan-name");
const selectedPlanPrice = document.querySelector(".selected-plan-price");
const selectedOptions = Array.from(
  document.querySelectorAll(".selected-options>div")
);
const total = document.querySelector(".total-price");

let sum = 0;
let stepIndex = stepNumber.indexOf(activeStep);
let monthlySub = true;

const slideTo = function () {
  stepNumber.forEach((el) => {
    el.classList.remove("active-number");
  });
  stepNumber[stepIndex].classList.add("active-number");
  grid.style.transform = `translateX(-${stepIndex * 20}%)`;
};

const summarize = function () {
  selectedPlanName.textContent = `${planName.textContent} (${
    monthlySub ? "Monthly" : "Yearly"
  })`;
  selectedPlanPrice.textContent = planPrice.textContent;

  const optionSum = selectedOptions
    .filter((e) => {
      if (!e.classList.contains("hidden")) return e;
    })
    .reduce(
      (sum, el) =>
        sum +
        parseInt(
          el.querySelector(".selected-option-price>p:not(.hidden)").textContent
        ),
      0
    );

  sum = optionSum + parseInt(planPrice.textContent.slice(1));
  total.textContent = `$${sum}/${monthlySub ? "mo" : "yr"}`;
};

const validator = function () {
  inputs.forEach((input, i) => {
    const valid = input.checkValidity();
    if (valid) return;
    else {
      input.classList.add("error");
      labels[i].classList.add("error");
    }
  });
};

plans.addEventListener("click", (el) => {
  const plan = el.target.closest(".plan");
  if (plan) {
    activePlan.classList.remove("active-plan");
    plan.classList.add("active-plan");
    activePlan = plan;
    planName = activePlan.querySelector(".plan-name");
    planPrice = activePlan.querySelector(".plan-price:not(.hidden)");
  }
});

options.forEach((e, i) => {
  e.addEventListener("click", () => {
    e.querySelector(".check").classList.toggle("checked");
    e.classList.toggle("active-plan");
    selectedOptions[i].classList.toggle("hidden");
  });
});

toggleBtn.addEventListener("click", () => {
  monthlySub = !monthlySub;
  monthly.classList.toggle("activated");
  yearly.classList.toggle("activated");
  monthlyEl.forEach((el) => {
    el.classList.toggle("hidden");
  });
  yearlyEl.forEach((el) => {
    el.classList.toggle("hidden");
  });
  planPrice = activePlan.querySelector(".plan-price:not(.hidden)");
});

btnNext.addEventListener("click", (e) => {
  validator();
  const allValid = inputs.every((input) => input.checkValidity());
  if (allValid) {
    if (stepIndex < stepNumber.length - 1) {
      stepIndex++;
      slideTo();
      if (stepIndex === stepNumber.length - 1) {
        btnNext.classList.add("hidden");
        btnConfirm.classList.remove("hidden");
        summarize();
      }
      if (stepIndex > 0 && stepIndex < stepNumber.length - 1)
        btnBack.classList.remove("hidden");
    }
  }
});

btnBack.addEventListener("click", () => {
  if (stepIndex <= 1) btnBack.classList.add("hidden");
  stepIndex--;
  slideTo();
  if (stepIndex > 0 && stepIndex < stepNumber.length - 1)
    btnConfirm.classList.add("hidden");
  btnNext.classList.remove("hidden");
});

btnChange.addEventListener("click", () => {
  stepIndex = 1;
  slideTo();
  btnConfirm.classList.add("hidden");
  btnNext.classList.remove("hidden");
});

btnConfirm.addEventListener("click", () => {
  console.log(grid.length);
  grid.style.transform = `translateX(-${stepNumber.length * 20}%)`;
  btnBack.classList.add("hidden");
  btnConfirm.classList.add("hidden");
  btnNext.classList.add("hidden");
});

inputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    input.classList.remove("error");
    labels[i].classList.remove("error");
  });
});
